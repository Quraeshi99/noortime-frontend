import { useState, useEffect } from 'react';
import { format } from 'date-fns';

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
  prayerTimes: PrayerTime[];
  jumahTime: { azanTime: string; jamaatTime: string };
  khutbahTime: string;
  otherTimes: Array<{ name: string; time: string }>;
  englishDate: string;
}

export const usePrayerTimes = (): UsePrayerTimesReturn => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

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

  // Sample prayer times data
  const prayerTimes: PrayerTime[] = [
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
  ];

  const jumahTime = {
    azanTime: '12:30',
    jamaatTime: '13:00',
  };

  const khutbahTime = '12:45';

  const otherTimes = [
    { name: 'Sahar End', time: '05:15' },
    { name: 'Chasht', time: '09:30' },
    { name: 'Zawal Start', time: '12:00' },
    { name: 'Zawal End', time: '12:15' },
    { name: 'Tulu', time: '06:45' },
    { name: 'Gurub', time: '18:30' },
    { name: 'Iftar', time: '18:30' },
  ];

  return {
    currentTime,
    currentDate,
    islamicDate: '15 Rajab 1446',
    nextPrayer: 'Asar',
    timeToNext: '2h 30m',
    prayerTimes,
    jumahTime,
    khutbahTime,
    otherTimes,
    englishDate: format(new Date(), 'dd MMMM yyyy'),
  };
};