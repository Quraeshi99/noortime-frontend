# Component Documentation

## 🎨 UI Components (shadcn-based)

### Button Component
```typescript
/**
 * @component Button
 * @description Primary interactive element with multiple variants
 * 
 * @props
 * - variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
 * - size: 'default' | 'sm' | 'lg' | 'icon'
 * - className?: string
 * - children: ReactNode
 * 
 * @variants
 * - default: Primary brand button (bg-primary)
 * - outline: Transparent with border
 * - ghost: Transparent with hover effect
 * - destructive: For dangerous actions (red)
 * 
 * @example
 * <Button variant="outline" size="sm">Click me</Button>
 * 
 * @mobileMapping
 * React Button → Flutter ElevatedButton/OutlinedButton
 * React Button → RN TouchableOpacity with custom styling
 * 
 * @designTokens
 * Uses: --primary, --primary-foreground, --border, --background
 */
```

### Card Component
```typescript
/**
 * @component Card
 * @description Container with subtle shadow and rounded corners
 * 
 * @props
 * - className?: string
 * - children: ReactNode
 * 
 * @example
 * <Card className="p-4">Content here</Card>
 * 
 * @mobileMapping
 * React Card → Flutter Card widget
 * React Card → RN View with shadow props
 * 
 * @designTokens
 * Uses: --card, --border, --radius
 */
```

### Input Component
```typescript
/**
 * @component Input
 * @description Form input with consistent styling
 * 
 * @props
 * - type: string (default: 'text')
 * - placeholder?: string
 * - value?: string
 * - onChange?: (e: ChangeEvent) => void
 * - className?: string
 * 
 * @example
 * <Input type="email" placeholder="Enter email" />
 * 
 * @mobileMapping
 * React Input → Flutter TextField
 * React Input → RN TextInput
 * 
 * @designTokens
 * Uses: --input, --background, --foreground, --ring
 */
```

## 🔐 Authentication Components

### AuthModal
```typescript
/**
 * @component AuthModal
 * @description Full-screen modal for login/signup
 * 
 * @props
 * - isOpen: boolean
 * - onClose: () => void
 * - initialView: 'login' | 'signup'
 * 
 * @features
 * - Responsive full-screen overlay
 * - Form validation with react-hook-form
 * - Supabase integration
 * - Error handling with toast notifications
 * 
 * @example
 * <AuthModal isOpen={true} onClose={() => {}} initialView="login" />
 * 
 * @mobileMapping
 * React Modal → Flutter showDialog/BottomSheet
 * React Modal → RN Modal component
 * 
 * @stateManagement
 * - Local form state with react-hook-form
 * - Global auth state with useAuth hook
 */
```

### LoginForm / SignupForm
```typescript
/**
 * @component LoginForm / SignupForm
 * @description Form components with validation
 * 
 * @props
 * - onSuccess?: () => void
 * - switchToSignup?: () => void (LoginForm only)
 * - switchToLogin?: () => void (SignupForm only)
 * 
 * @validation
 * - Email: Required, valid email format
 * - Password: Required, min 6 characters
 * - Full Name: Required (signup only)
 * 
 * @example
 * <LoginForm onSuccess={() => closeModal()} />
 * 
 * @mobileMapping
 * Form validation logic → same in Flutter/RN
 * UI components → native form widgets
 */
```

## 👤 Profile Components

### ProfileModal
```typescript
/**
 * @component ProfileModal
 * @description User profile management modal
 * 
 * @props
 * - isOpen: boolean
 * - onClose: () => void
 * - initialView: 'profile' | 'changePassword'
 * 
 * @features
 * - Profile editing
 * - Password change
 * - Avatar upload (future)
 * 
 * @example
 * <ProfileModal isOpen={true} onClose={() => {}} initialView="profile" />
 * 
 * @mobileMapping
 * Modal navigation → Flutter Navigator.push
 * Modal navigation → RN navigation stack
 */
```

## ⚙️ Settings Components

### SettingsPanel
```typescript
/**
 * @component SettingsPanel
 * @description Side panel for app settings
 * 
 * @props
 * - isOpen: boolean
 * - onClose: () => void
 * 
 * @features
 * - User profile display
 * - Prayer time settings
 * - Notification preferences
 * - Auth integration
 * 
 * @responsive
 * - Mobile: 90% width
 * - Tablet: 60% width  
 * - Desktop: 400px fixed width
 * 
 * @example
 * <SettingsPanel isOpen={true} onClose={() => {}} />
 * 
 * @mobileMapping
 * Side panel → Flutter Drawer
 * Side panel → RN sliding drawer
 * 
 * @stateManagement
 * - Settings state: localStorage + useState
 * - Auth state: useAuth hook
 */
```

## 🕐 Prayer Time Components

### MainPrayerTable
```typescript
/**
 * @component MainPrayerTable
 * @description Main prayer times display
 * 
 * @props
 * - prayerTimes: PrayerTime[]
 * - jumahTime: string
 * - khutbahTime: string
 * 
 * @features
 * - Current prayer highlighting
 * - Next prayer indication
 * - Jamaat times display
 * 
 * @example
 * <MainPrayerTable prayerTimes={times} jumahTime="13:00" khutbahTime="12:45" />
 * 
 * @mobileMapping
 * Table layout → Flutter ListView/Column
 * Table layout → RN FlatList/View
 */
```

### TopHeader
```typescript
/**
 * @component TopHeader
 * @description App header with time and date
 * 
 * @props
 * - currentTime: string
 * - currentDate: string
 * - islamicDate: string
 * - nextPrayer: string
 * - timeToNext: string
 * - jamaatCountdown: string
 * - onOpenSettings: () => void
 * - isDarkMode: boolean
 * - onToggleDarkMode: () => void
 * 
 * @features
 * - Real-time clock
 * - Islamic calendar
 * - Next prayer countdown
 * - Settings access
 * - Dark mode toggle
 * 
 * @mobileMapping
 * Header → Flutter AppBar
 * Header → RN header component
 */
```

## 🎬 Animation Components

### SplashScreen
```typescript
/**
 * @component SplashScreen
 * @description App loading screen with logo animation
 * 
 * @props
 * - onComplete: () => void
 * 
 * @features
 * - Logo fade-in animation
 * - Auto-dismiss after 2 seconds
 * - Smooth transition to main app
 * 
 * @example
 * <SplashScreen onComplete={() => setShowSplash(false)} />
 * 
 * @mobileMapping
 * CSS animations → Flutter AnimationController
 * CSS animations → RN Animated API
 */
```

## 🔧 Component Creation Guidelines

### File Structure
```
src/components/ComponentName/
├── index.tsx           # Main component
├── ComponentName.tsx   # Implementation (if complex)
├── types.ts           # TypeScript interfaces
└── styles.css         # Component-specific styles (if needed)
```

### Component Template
```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
  // Add specific props here
}

/**
 * Component documentation here
 */
export const ComponentName = ({ 
  className,
  children,
  ...props 
}: ComponentNameProps) => {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {children}
    </div>
  );
};

export default ComponentName;
```

### Design System Usage
```typescript
// ✅ CORRECT - Use design tokens
className="bg-primary text-primary-foreground"

// ❌ WRONG - Direct colors
className="bg-blue-600 text-white"

// ✅ CORRECT - Responsive spacing
className="p-2 sm:p-4 md:p-6"

// ❌ WRONG - Fixed spacing
className="p-4"
```

---

**Last Updated**: 2025-01-10
**Component Count**: 15+ documented