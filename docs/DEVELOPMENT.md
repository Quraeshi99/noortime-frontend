# NoorTime Development Guide

## 🎯 Project Overview
Islamic Prayer Time Application built with React + Vite + Tailwind CSS, designed for future mobile development with Flutter/React Native.

## 🎨 Design System Documentation

### Color Palette
```css
/* Primary Colors (HSL format for future mobile mapping) */
--primary: 220 14% 12%        /* Main brand color */
--primary-foreground: 210 40% 98%
--secondary: 210 40% 96%      /* Light secondary */
--accent: 210 40% 96%         /* Accent highlights */

/* Dark Mode Colors */
--background: 222.2 84% 4.9%  /* Dark background */
--foreground: 210 40% 98%     /* Dark text */
```

### Typography System
```css
/* Font Family: Inter (Web-safe fallbacks) */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes (rem for scalability) */
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
```

### Responsive Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large Desktop */
```

### Animation Guidelines
```css
/* Smooth transitions for all interactive elements */
--transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-fast: all 0.15s ease-out;
--transition-slow: all 0.5s ease-in-out;
```

## 📦 Component Architecture

### Component Structure
```
src/components/
├── ui/           # Base UI components (shadcn)
├── auth/         # Authentication components
├── profile/      # User profile components
├── prayer/       # Prayer-related components (future)
└── layout/       # Layout components (future)
```

### Component Documentation Template
```typescript
/**
 * @component ComponentName
 * @description Brief description of component purpose
 * 
 * @props
 * - prop1: type - description
 * - prop2?: type - optional prop description
 * 
 * @variants
 * - variant1: description
 * - variant2: description
 * 
 * @example
 * <ComponentName prop1="value" />
 * 
 * @mobileMapping
 * React → Flutter: Container/Card → Container/Card
 * React → RN: View → View/Card
 */
```

## ⚙️ State Management Strategy

### Current: React Hooks + Context
```typescript
// Auth State: useAuth hook
// UI State: useState in components
// Settings: localStorage + useState
```

### Future Mobile Mapping:
- React Context → Flutter Riverpod/Bloc
- React useState → Flutter StatefulWidget/Provider
- React useEffect → Flutter lifecycle methods

## 🗄️ Data & API Contract

### Supabase Schema
```sql
-- Users table (extends auth.users)
profiles (
  id: uuid (FK to auth.users)
  full_name: text
  avatar_url: text
  preferences: jsonb
  created_at: timestamp
  updated_at: timestamp
)

-- Prayer Settings table
prayer_settings (
  id: uuid
  user_id: uuid (FK)
  notifications_enabled: boolean
  sound_enabled: boolean
  location: jsonb
  custom_times: jsonb
)
```

### API Response Format
```typescript
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: 'success' | 'error';
}

interface PrayerTime {
  name: string;
  time: string;
  arabicName?: string;
}
```

### Offline Strategy
```typescript
// Cache Strategy
- Prayer Times: Cache for 24h (daily refresh)
- User Preferences: Immediate sync + local backup
- Auth State: Persistent session
```

## 📱 Mobile Development Preparation

### Widget Requirements (Future)
- Prayer times display
- Next prayer countdown
- Quick tasbih counter
- Daily ayah display

### Native Features Needed
- Background notifications
- Location services
- Audio playback (Azan)
- Widget updates

## 🌍 Internationalization

### Language Support
```typescript
// Current: English
// Future: Arabic, Urdu, Turkish, Malay
const languages = {
  en: 'English',
  ar: 'العربية',
  ur: 'اردو',
  tr: 'Türkçe',
  ms: 'Bahasa Melayu'
};
```

## 🔧 Development Workflow

### Before Making Changes
1. Check component documentation
2. Follow design system tokens
3. Test mobile responsiveness
4. Document new components
5. Update API contracts if needed

### Testing Checklist
- [ ] Desktop responsive (1280px+)
- [ ] Tablet responsive (768px-1024px)  
- [ ] Mobile responsive (320px-640px)
- [ ] Dark/Light mode compatibility
- [ ] Accessibility (ARIA labels)
- [ ] Performance (Lighthouse score >90)

## 📖 Future Mobile Migration

### Component Mapping Strategy
```typescript
// Web → Mobile Mapping
Button → ElevatedButton/TouchableOpacity
Card → Container/Card/View
Modal → BottomSheet/Dialog/Modal
Input → TextField/TextInput
Switch → Switch/Switch
```

### State Management Migration
```typescript
// React → Flutter
useAuth() → AuthController (Riverpod)
useState() → StateController/Provider
useContext() → ProviderScope
```

### API Integration
```typescript
// Current: Supabase JS Client
// Future: Supabase Flutter/RN Client
// Same endpoints, different client libraries
```

## 🚀 Performance Guidelines

### Bundle Size Optimization
- Tree-shaking enabled for icons
- Dynamic imports for heavy components
- Optimize images (WebP format)
- Minimize CSS-in-JS overhead

### Memory Management
- Cleanup event listeners
- Cancel async operations
- Optimize re-renders with useMemo/useCallback
- Lazy load non-critical components

---

**Last Updated**: 2025-01-10
**Next Review**: When adding new major features