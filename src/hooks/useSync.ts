import { useCallback } from 'react';
import { db } from '@/lib/db';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const useSync = () => {
  const syncDelta = useCallback(async () => {
    try {
      // 1. Get all stored masjids from IndexedDB
      const storedMasjids = await db.masjids.toArray();
      
      // Prepare queries mapping
      const syncQueries = storedMasjids.map(m => ({
        entity_type: 'masjid',
        entity_id: m.id,
        last_version: m.version || 0
      }));

      // If no masjids stored locally, we might want to fetch default or followed ones
      // Let's also fetch followed masjids if user is logged in
      const token = localStorage.getItem('access_token');
      if (token && storedMasjids.length === 0) {
        try {
          const res = await fetch(`${API_BASE_URL}/masjids/followed`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const followed = await res.json();
            // followed might be an array of masjids
            if (Array.isArray(followed)) {
              for (const fm of followed) {
                // Add to query to get latest script
                syncQueries.push({
                  entity_type: 'masjid',
                  entity_id: fm.id || fm.masjid_id,
                  last_version: 0
                });
              }
            }
          }
        } catch (e) {
          console.error("Failed to fetch followed masjids", e);
        }
      }

      // If still nothing to query, we can fallback to default masjid ID if needed
      // But let's only sync if there is something to ask
      if (syncQueries.length === 0) return;

      // 2. Call POST /api/sync/delta
      const response = await fetch(`${API_BASE_URL}/sync/delta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ sync_queries: syncQueries })
      });

      if (!response.ok) {
        throw new Error("Delta sync failed");
      }

      const responseData = await response.json();
      const updates = responseData.updates || [];

      // 3. Process updates into Dexie DB
      await db.transaction('rw', db.masjids, async () => {
        for (const item of updates) {
          if (item.entity_type === 'masjid' && item.entity_id != null) {
            if (item.action === 'DELETE') {
              await db.masjids.delete(item.entity_id);
            } else {
              // Update or Add
              const existing = await db.masjids.get(item.entity_id);
              const scriptData = item.data;
              
              await db.masjids.put({
                id: item.entity_id,
                name: scriptData.name || existing?.name || `Masjid #${item.entity_id}`,
                version: item.new_version,
                profile_picture_url: scriptData.profile_picture_url || existing?.profile_picture_url,
                address: scriptData.address_line_1 || existing?.address,
                city: scriptData.city || existing?.city,
                latitude: scriptData.latitude || existing?.latitude,
                longitude: scriptData.longitude || existing?.longitude,
                monthly_schedule: scriptData.schedule || scriptData, // Depending on backend structure
                is_default: existing ? existing.is_default : storedMasjids.length === 0 // First one becomes default
              });
            }
          }
        }
      });

      console.log("Delta sync completed successfully", updates.length, "updates");
    } catch (err) {
      console.error("Error during delta sync:", err);
    }
  }, []);

  return { syncDelta };
};
