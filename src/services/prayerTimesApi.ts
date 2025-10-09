/**
 * Prayer Times API Service
 * 
 * TO CONNECT YOUR BACKEND:
 * 1. Replace API_BASE_URL with your backend URL
 * 2. Uncomment the fetch calls in each function
 * 3. Remove the mock data returns
 */

const API_BASE_URL = ''; // Add your backend URL here when ready

export interface PrayerTime {
  name: string;
  time: string;
  jamaat: string;
}

export interface AdditionalTime {
  name: string;
  time: string;
}

export interface PrayerTimesResponse {
  prayerTimes: PrayerTime[];
  jumahTime: string;
  khutbahTime: string;
  otherTimes: AdditionalTime[];
  islamicDate: string;
  englishDate: string;
}

// Mock data - Replace this with API calls when backend is ready
const MOCK_DATA: PrayerTimesResponse = {
  prayerTimes: [
    { name: "Fajr", time: "05:30", jamaat: "06:00" },
    { name: "Sunrise", time: "06:45", jamaat: "-" },
    { name: "Dhuhr", time: "12:30", jamaat: "01:00" },
    { name: "Asr", time: "03:45", jamaat: "04:15" },
    { name: "Maghrib", time: "06:15", jamaat: "06:20" },
    { name: "Isha", time: "07:30", jamaat: "08:00" },
  ],
  jumahTime: "01:30",
  khutbahTime: "01:15",
  otherTimes: [
    { name: "Sehri End", time: "05:15" },
    { name: "Sunrise", time: "06:45" },
    { name: "Namaz e Ishrak", time: "07:15" },
    { name: "Zohwa e Kubra Start", time: "11:45" },
    { name: "Zohwa e Kubra End", time: "12:15" },
    { name: "Sunset", time: "06:15" },
    { name: "Iftari", time: "06:15" },
  ],
  islamicDate: "15 Rajab 1446",
  englishDate: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
};

/**
 * Fetch prayer times from backend
 * 
 * WHEN BACKEND IS READY:
 * Uncomment the fetch code and remove mock data return
 */
export const fetchPrayerTimes = async (): Promise<PrayerTimesResponse> => {
  try {
    // TODO: Uncomment when backend is ready
    // if (!API_BASE_URL) {
    //   console.warn('API_BASE_URL not configured, using mock data');
    //   return MOCK_DATA;
    // }
    
    // const response = await fetch(`${API_BASE_URL}/api/prayer-times`);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch prayer times');
    // }
    // const data = await response.json();
    // return data;

    // Using mock data for now
    return MOCK_DATA;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    // Return mock data as fallback
    return MOCK_DATA;
  }
};

/**
 * Fetch prayer times for a specific location
 * 
 * WHEN BACKEND IS READY:
 * Add location parameter to API call
 */
export const fetchPrayerTimesByLocation = async (
  latitude: number,
  longitude: number
): Promise<PrayerTimesResponse> => {
  try {
    // TODO: Uncomment when backend is ready
    // if (!API_BASE_URL) {
    //   console.warn('API_BASE_URL not configured, using mock data');
    //   return MOCK_DATA;
    // }
    
    // const response = await fetch(
    //   `${API_BASE_URL}/api/prayer-times?lat=${latitude}&lng=${longitude}`
    // );
    // if (!response.ok) {
    //   throw new Error('Failed to fetch prayer times');
    // }
    // const data = await response.json();
    // return data;

    console.log(`Location requested: ${latitude}, ${longitude}`);
    // Using mock data for now
    return MOCK_DATA;
  } catch (error) {
    console.error('Error fetching prayer times by location:', error);
    return MOCK_DATA;
  }
};
