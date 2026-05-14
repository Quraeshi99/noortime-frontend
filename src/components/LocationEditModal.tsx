import { useState, useEffect } from "react";
import { Search, MapPin, Building2, X, Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface LocationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (location: any) => void;
}

export const LocationEditModal = ({ isOpen, onClose, onSave }: LocationEditModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Search API call with debounce
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Replace with your actual search endpoint, e.g. /masjids/?search=query
        const res = await fetch(`${API_BASE_URL}/masjids/?search=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          // Adjust based on paginated response or raw array
          setResults(Array.isArray(data) ? data : data.items || data.data || []);
        } else {
          // Offline fallback sample list
          setResults([
            { id: 101, name: "Masjid Al-Noor (Demo)", city: "Karachi", address_line_1: "Sector 15", masjid_code: "DEMO1" },
            { id: 102, name: "Grand Mosque (Demo)", city: "Lahore", address_line_1: "Gulberg", masjid_code: "DEMO2" }
          ]);
        }
      } catch (e) {
        // Fallback demo data if backend unreachable during offline usage
        setResults([
          { id: 101, name: "Masjid Al-Noor (Demo)", city: "Karachi", address_line_1: "Sector 15", masjid_code: "DEMO1" },
          { id: 102, name: "Grand Mosque (Demo)", city: "Lahore", address_line_1: "Gulberg", masjid_code: "DEMO2" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSave = async () => {
    if (selectedLocation) {
      try {
        // Reset all defaults first
        await db.transaction('rw', db.masjids, async () => {
          await db.masjids.where('is_default').equals(1).modify({ is_default: false });
          
          // Insert or update chosen masjid
          await db.masjids.put({
            id: selectedLocation.id,
            name: selectedLocation.name,
            version: selectedLocation.version || 1,
            profile_picture_url: selectedLocation.profile_picture_url,
            address: selectedLocation.address_line_1 || selectedLocation.address,
            city: selectedLocation.city,
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            monthly_schedule: selectedLocation.settings?.prayer_times_script || selectedLocation.schedule,
            is_default: true
          });
        });

        toast({
          title: "Location Updated",
          description: `Successfully switched to ${selectedLocation.name}`,
        });

        onSave(selectedLocation);
        onClose();
      } catch (err: any) {
        toast({
          title: "Save Failed",
          description: err.message || "Failed to update offline database",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-islamic-crescent" />
            Change Location / Masjid
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          {/* Search Input */}
          <div className="relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by city or masjid name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="mosque" className="w-full flex-1 flex flex-col min-h-0">
            <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
              <TabsTrigger value="mosque" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>Masjids</span>
              </TabsTrigger>
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Cities</span>
              </TabsTrigger>
            </TabsList>

            {/* Mosque Tab */}
            <TabsContent value="mosque" className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[150px]">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-islamic-gold" />
                </div>
              ) : results.length > 0 ? (
                results.map((mosque) => (
                  <Card
                    key={mosque.id}
                    className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                      selectedLocation?.id === mosque.id
                        ? 'border-islamic-gold bg-islamic-gold/5'
                        : 'hover:border-islamic-gold/50'
                    }`}
                    onClick={() => setSelectedLocation(mosque)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="h-4 w-4 text-islamic-crescent flex-shrink-0" />
                          <h4 className="font-medium text-sm truncate">{mosque.name}</h4>
                          {mosque.masjid_code && (
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              {mosque.masjid_code}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {mosque.address_line_1 || mosque.address || mosque.city}
                        </p>
                      </div>
                      {selectedLocation?.id === mosque.id && (
                        <Check className="h-4 w-4 text-islamic-gold flex-shrink-0 ml-2" />
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8 text-sm">No masjids found</p>
              )}
            </TabsContent>

            {/* Individual Tab */}
            <TabsContent value="individual" className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[150px]">
              <p className="text-center text-muted-foreground py-8 text-sm">
                Type city name above to search master timing zones.
              </p>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 flex-shrink-0 border-t mt-auto">
            <Button variant="outline" onClick={onClose} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!selectedLocation}
              className="flex-1 bg-gradient-to-r from-islamic-gold to-islamic-crescent text-white"
            >
              <Check className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};