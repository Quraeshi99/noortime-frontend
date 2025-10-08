# Prayer Times API Integration Guide
# Backend API Integration Ki Complete Guide

## 📋 Overview (Samanya Jankari)

Ye app ab **API-ready** hai. Abhi static/mock data use ho raha hai, lekin jab aapka backend ready hoga, sirf kuch lines change karke live data aa jayega.

---

## 🏗️ Architecture (Structure)

### Modified Files (Badli Gayi Files):

1. **`src/services/prayerTimesApi.ts`** ✨ (NEW)
   - Ye file backend se data fetch karti hai
   - Abhi mock data return kar rahi hai
   - Backend ready hone par yahan API calls uncomment karni hain

2. **`src/hooks/usePrayerTimes.ts`** 🔄 (UPDATED)
   - Pehle hardcoded data tha
   - Ab API service se data fetch karta hai
   - Components ko updated data provide karta hai

3. **`src/pages/Index.tsx`** (No changes needed)
   - Already using usePrayerTimes hook
   - Automatically updated data show karega

---

## 🚀 Backend Connect Karne Ke Steps

### Step 1: API URL Add Karo

`src/services/prayerTimesApi.ts` file kholo aur:

```typescript
// Line 9: Ye line dhundo
const API_BASE_URL = ''; 

// Isko apne backend URL se replace karo
const API_BASE_URL = 'https://your-backend.com'; // ✅ Example
```

### Step 2: API Calls Uncomment Karo

Same file me, `fetchPrayerTimes` function me:

```typescript
// Ye lines (22-31) UNCOMMENT karo:
if (!API_BASE_URL) {
  console.warn('API_BASE_URL not configured, using mock data');
  return MOCK_DATA;
}

const response = await fetch(`${API_BASE_URL}/api/prayer-times`);
if (!response.ok) {
  throw new Error('Failed to fetch prayer times');
}
const data = await response.json();
return data;
```

### Step 3: Mock Data Return REMOVE Karo

```typescript
// Ye line (34) COMMENT ya DELETE karo:
// return MOCK_DATA; ❌
```

**DONE!** Bas itna hi. Ab app backend se data lega.

---

## 📡 Expected API Response Format

### Backend ko ye format me data bhejni hogi:

```json
{
  "prayerTimes": [
    {
      "name": "Fajr",
      "time": "05:30",
      "jamaat": "05:45"
    },
    {
      "name": "Sunrise",
      "time": "06:45",
      "jamaat": "-"
    },
    {
      "name": "Dhuhr",
      "time": "12:30",
      "jamaat": "12:45"
    },
    {
      "name": "Asr",
      "time": "15:45",
      "jamaat": "16:00"
    },
    {
      "name": "Maghrib",
      "time": "18:30",
      "jamaat": "18:35"
    },
    {
      "name": "Isha",
      "time": "20:15",
      "jamaat": "20:30"
    }
  ],
  "jumahTime": "12:30",
  "khutbahTime": "12:45",
  "otherTimes": [
    {
      "name": "Sahar End",
      "time": "05:15"
    },
    {
      "name": "Chasht",
      "time": "09:30"
    },
    {
      "name": "Tahajjud",
      "time": "04:00"
    }
  ],
  "islamicDate": "15 Rajab 1446",
  "englishDate": "Monday, 16 December 2024"
}
```

### Field Descriptions:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `prayerTimes` | Array | Main 6 prayer times | See above |
| `prayerTimes[].name` | String | Prayer name | "Fajr", "Dhuhr", etc. |
| `prayerTimes[].time` | String | Azan/Start time | "05:30" |
| `prayerTimes[].jamaat` | String | Jamaat time | "05:45" or "-" |
| `jumahTime` | String | Jummah prayer time | "12:30" |
| `khutbahTime` | String | Khutbah start time | "12:45" |
| `otherTimes` | Array | Additional times | See above |
| `islamicDate` | String | Hijri date | "15 Rajab 1446" |
| `englishDate` | String | English date | "Monday, 16 December 2024" |

---

## 🌍 Location-Based Prayer Times (Future)

Agar location ke hisab se prayer times chahiye:

### Frontend Code (Already Ready):
```typescript
import { fetchPrayerTimesByLocation } from '@/services/prayerTimesApi';

// Usage:
const data = await fetchPrayerTimesByLocation(28.6139, 77.2090); // Delhi
```

### Backend Endpoint Banana Hoga:
```
GET /api/prayer-times?lat=28.6139&lng=77.2090
```

Response format same rahega (upar wala).

---

## 🧪 Testing (Kaise Check Karein)

### Mock Data Se (Abhi):
1. App kholo
2. Prayer times dikhengi (mock data se)
3. Console me "Using mock data" message aayega

### Backend Connect Karne Ke Baad:
1. `API_BASE_URL` add karo
2. API calls uncomment karo
3. Browser refresh karo
4. Network tab me check karo - API call dikh jayega
5. Console me errors check karo

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Error
**Error:** `Access-Control-Allow-Origin`

**Solution:** Backend me CORS enable karo:
```javascript
// Express example:
app.use(cors({
  origin: 'http://localhost:8080' // Frontend URL
}));
```

### Issue 2: 404 Not Found
**Error:** `Failed to fetch prayer times`

**Solution:** 
- Check API URL sahi hai
- Backend chal raha hai
- Endpoint `/api/prayer-times` exist karta hai

### Issue 3: Wrong Data Format
**Error:** App crash ya blank screen

**Solution:**
- Response format check karo (upar wala JSON)
- Console me error dekho
- Backend response validate karo

---

## 📝 Example Backend Implementation

### Node.js + Express Example:

```javascript
const express = require('express');
const app = express();

app.get('/api/prayer-times', (req, res) => {
  const { lat, lng } = req.query;
  
  // Calculate prayer times based on location
  // (Use library like adhan-js or call external API)
  
  const prayerData = {
    prayerTimes: [
      { name: "Fajr", time: "05:30", jamaat: "05:45" },
      { name: "Sunrise", time: "06:45", jamaat: "-" },
      { name: "Dhuhr", time: "12:30", jamaat: "12:45" },
      { name: "Asr", time: "15:45", jamaat: "16:00" },
      { name: "Maghrib", time: "18:30", jamaat: "18:35" },
      { name: "Isha", time: "20:15", jamaat: "20:30" }
    ],
    jumahTime: "12:30",
    khutbahTime: "12:45",
    otherTimes: [
      { name: "Sahar End", time: "05:15" },
      { name: "Chasht", time: "09:30" }
    ],
    islamicDate: "15 Rajab 1446",
    englishDate: new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
  
  res.json(prayerData);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

---

## 🎯 Quick Checklist

Jab backend connect karna ho:

- [ ] Backend API ready hai
- [ ] API endpoint `/api/prayer-times` exist karta hai
- [ ] Response format sahi hai (upar wala JSON dekho)
- [ ] CORS enabled hai
- [ ] `src/services/prayerTimesApi.ts` me `API_BASE_URL` add kiya
- [ ] API calls uncomment kiye
- [ ] Mock data return comment kiya
- [ ] Browser me test kiya
- [ ] Network tab me API call check kiya
- [ ] Console me errors check kiye

---

## 💡 Pro Tips

1. **Development**: Pehle mock data se test karo, phir backend connect karo
2. **Error Handling**: `try-catch` already hai, errors automatic console me aayengi
3. **Fallback**: Agar API fail ho, mock data automatically use hoga
4. **Loading State**: `loading` state already hai, loading indicator add kar sakte ho
5. **Refresh**: Prayer times daily update karne ke liye API call schedule karo

---

## 📞 Need Help?

Agar koi doubt ho:
1. Console errors check karo
2. Network tab me API response dekho
3. Backend logs check karo
4. Is document ko phir se padho

---

**Last Updated:** December 2024  
**Version:** 1.0
