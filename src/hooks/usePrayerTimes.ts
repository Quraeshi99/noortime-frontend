import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fetchPrayerTimes, PrayerTime as ApiPrayerTime } from '@/services/prayerTimesApi';

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

// Arabic names mapping
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

export const usePrayerTimes = (): UsePrayerTimesReturn => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Data from API
  const [islamicDate, setIslamicDate] = useState('15 Rajab 1446');
  const [englishDate, setEnglishDate] = useState('');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    {
      name: 'Fajr',
      arabicName: 'الفجر',
      azanTime: '05:30',
      jamaatTime: '05:45',
      isCompleted: true,
    },
    {
      name: 'Zohar',
      arabicName: 'الظهر',
      azanTime: '12:15',
      jamaatTime: '12:30',
      isActive: true,
    },
    {
      name: 'Asar',
      arabicName: 'العصر',
      azanTime: '15:45',
      jamaatTime: '16:00',
      isNext: true,
    },
    {
      name: 'Maghrib',
      arabicName: 'المغرب',
      azanTime: '18:30',
      jamaatTime: '18:35',
    },
    {
      name: 'Isha',
      arabicName: 'العشاء',
      azanTime: '20:15',
      jamaatTime: '20:30',
    },
  ]);
  const [jumahTime, setJumahTime] = useState({ azanTime: '12:30', jamaatTime: '13:00' });
  const [khutbahTime, setKhutbahTime] = useState('12:45');
  const [otherTimes, setOtherTimes] = useState([
    { name: 'Sahar End', time: '05:15' },
    { name: 'Chasht', time: '09:30' },
    { name: 'Zawal Start', time: '12:00' },
    { name: 'Zawal End', time: '12:15' },
    { name: 'Tulu', time: '06:45' },
    { name: 'Gurub', time: '18:30' },
    { name: 'Iftar', time: '18:30' },
  ]);

  // Fetch prayer times from API on mount
  useEffect(() => {
    const loadPrayerTimes = async () => {
      try {
        setLoading(true);
        const data = await fetchPrayerTimes();
        
        // Transform API data to match component structure
        const transformedPrayerTimes: PrayerTime[] = data.prayerTimes
          .filter(pt => pt.name !== 'Sunrise') // Filter out Sunrise from main table
          .map(pt => ({
            name: pt.name,
            arabicName: arabicNames[pt.name] || pt.name,
            azanTime: pt.time,
            jamaatTime: pt.jamaat,
          }));
        
        setPrayerTimes(transformedPrayerTimes);
        
        // Parse Jumah times
        const [jumahAzan, jumahJamaat] = data.jumahTime.split('/').map(t => t.trim());
        setJumahTime({
          azanTime: jumahAzan || data.jumahTime,
          jamaatTime: jumahJamaat || data.jumahTime,
        });
        
        setKhutbahTime(data.khutbahTime);
        setOtherTimes(data.otherTimes);
        setIslamicDate(data.islamicDate);
        setEnglishDate(data.englishDate);
      } catch (error) {
        console.error('Failed to load prayer times:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrayerTimes();
  }, []);

  // Update current time every second
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

  return {
    currentTime,
    currentDate,
    islamicDate,
    nextPrayer: 'Asar',
    timeToNext: '2h 30m',
    jamaatCountdown: '25:30',
    prayerTimes,
    jumahTime,
    khutbahTime,
    otherTimes,
    englishDate: englishDate || format(new Date(), 'dd MMMM yyyy'),
    loading,
  };
};
