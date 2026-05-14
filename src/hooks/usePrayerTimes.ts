import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { useSync } from './useSync';

interface PrayerTime {
  name: string;
  arabicName: string;
  azanTime: string;
  jamaatTime: string;
  isActive?: boolean;
  isNext?: boolean;
  isCompleted?: boolean;
}

interface UsePrayerTimesReturn {
  currentTime: string;
  currentDate: string;
  islamicDate: string;
  nextPrayer: string;
  timeToNext: string;
  jamaatCountdown: string;
  prayerTimes: PrayerTime[];
  jumahTime: { azanTime: string; jamaatTime: string };
  khutbahTime: string;
  otherTimes: Array<{ name: string; time: string }>;
  englishDate: string;
  loading: boolean;
}

const arabicNames: Record<string, string> = {
  'Fajr': 'الفجر',
  'Sunrise': 'الشروق',
  'Dhuhr': 'الظهر',
  'Zohar': 'الظهر',
  'Asr': 'العصر',
  'Asar': 'العصر',
  'Maghrib': 'المغرب',
  'Isha': 'العشاء',
};

// Default fallback data if DB is empty
const DEFAULT_PRAYERS: PrayerTime[] = [
  { name: 'Fajr', arabicName: 'الفجر', azanTime: '05:30', jamaatTime: '05:45' },
  { name: 'Zohar', arabicName: 'الظهر', azanTime: '12:15', jamaatTime: '12:30' },
  { name: 'Asar', arabicName: 'العصر', azanTime: '15:45', jamaatTime: '16:00' },
  { name: 'Maghrib', arabicName: 'المغرب', azanTime: '18:30', jamaatTime: '18:35' },
  { name: 'Isha', arabicName: 'العشاء', azanTime: '20:15', jamaatTime: '20:30' },
];

export const usePrayerTimes = (): UsePrayerTimesReturn => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  const { syncDelta } = useSync();

  // Trigger background delta sync on mount
  useEffect(() => {
    syncDelta();
  }, [syncDelta]);

  // Query default masjid from Dexie
  const defaultMasjid = useLiveQuery(
    () => db.masjids.where('is_default').equals(1).first() ?? db.masjids.orderBy('id').first()
  );

  // Update current clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(format(now, 'HH:mm:ss'));
      setCurrentDate(format(now, 'EEEE, MMMM dd, yyyy'));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Compute live timings based on local DB schedule or fallbacks
  let prayerTimes: PrayerTime[] = [...DEFAULT_PRAYERS];
  let jumahTime = { azanTime: '12:30', jamaatTime: '13:00' };
  let khutbahTime = '12:45';
  let islamicDate = '15 Rajab 1446';
  let otherTimes = [
    { name: 'Sahar End', time: '05:15' },
    { name: 'Sunrise', time: '06:45' },
    { name: 'Zawal Start', time: '12:00' },
    { name: 'Sunset', time: '18:30' },
  ];

  if (defaultMasjid?.monthly_schedule) {
    const sched = defaultMasjid.monthly_schedule;
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    
    // Find today's schedule from object or array mapping
    let todayData: any = null;
    if (Array.isArray(sched)) {
      todayData = sched.find(d => d.date === todayStr) || sched[0];
    } else if (typeof sched === 'object') {
      todayData = sched[todayStr] || Object.values(sched)[0];
    }

    if (todayData) {
      if (todayData.islamic_date) islamicDate = todayData.islamic_date;
      
      // Map main prayers
      const mapped: PrayerTime[] = [];
      const keys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      for (const k of keys) {
        const pt = todayData.prayers?.[k] || todayData[k.toLowerCase()];
        const displayKey = k === 'Dhuhr' ? 'Zohar' : k === 'Asr' ? 'Asar' : k;
        if (pt) {
          mapped.push({
            name: displayKey,
            arabicName: arabicNames[displayKey] || displayKey,
            azanTime: pt.azan || pt.time || '—',
            jamaatTime: pt.jamaat || '—'
          });
        }
      }
      if (mapped.length > 0) prayerTimes = mapped;

      // Map Friday specifics if available
      if (todayData.jumah || todayData.prayers?.Jumah) {
        const j = todayData.jumah || todayData.prayers?.Jumah;
        jumahTime = {
          azanTime: j.azan || j.time || '12:30',
          jamaatTime: j.jamaat || '13:00'
        };
        if (j.khutbah) khutbahTime = j.khutbah;
      }
    }
  }

  // Calculate Active, Next, Completed statuses
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  let nextPrayerName = 'Fajr';
  let minDiff = Infinity;

  prayerTimes = prayerTimes.map((pt) => {
    const [h, m] = pt.azanTime.split(':').map(Number);
    const azanMins = (h || 0) * 60 + (m || 0);
    
    const [jh, jm] = pt.jamaatTime.split(':').map(Number);
    const jamaatMins = (jh || 0) * 60 + (jm || 0);

    const isCompleted = nowMinutes >= jamaatMins;
    const isActive = nowMinutes >= azanMins && nowMinutes < jamaatMins;
    
    if (!isCompleted && azanMins - nowMinutes < minDiff && azanMins > nowMinutes) {
      minDiff = azanMins - nowMinutes;
      nextPrayerName = pt.name;
    }

    return {
      ...pt,
      isCompleted,
      isActive,
      isNext: false
    };
  });

  // Mark the next prayer
  prayerTimes = prayerTimes.map(pt => ({
    ...pt,
    isNext: pt.name === nextPrayerName && !pt.isActive && !pt.isCompleted
  }));

  const hoursNext = minDiff !== Infinity ? Math.floor(minDiff / 60) : 0;
  const minsNext = minDiff !== Infinity ? minDiff % 60 : 0;
  const timeToNextStr = minDiff !== Infinity ? `${hoursNext}h ${minsNext}m` : '—';

  return {
    currentTime,
    currentDate,
    islamicDate,
    nextPrayer: nextPrayerName,
    timeToNext: timeToNextStr,
    jamaatCountdown: '—',
    prayerTimes,
    jumahTime,
    khutbahTime,
    otherTimes,
    englishDate: format(new Date(), 'dd MMMM yyyy'),
    loading: defaultMasjid === undefined,
  };
};
