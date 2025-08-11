import { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import { PrayerHeader } from "@/components/PrayerHeader";
import { MainPrayerTable } from "@/components/MainPrayerTable";
import { BottomSection } from "@/components/BottomSection";
import { SettingsPanel } from "@/components/SettingsPanel";
import { AuthPage } from "@/pages/AuthPage";
import { UserProfilePage } from "@/pages/UserProfilePage";
import { useDarkMode } from "@/hooks/useDarkMode";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

type AppViewType = 'main' | 'auth-login' | 'auth-signup' | 'user-profile';

const Index = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<AppViewType>('main');
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const {
    currentTime,
    currentDate,
    islamicDate,
    nextPrayer,
    timeToNext,
    jamaatCountdown,
    prayerTimes,
    jumahTime,
    khutbahTime,
    otherTimes,
    englishDate,
  } = usePrayerTimes();

  const handleOpenAuth = (type: 'login' | 'signup') => {
    setCurrentView(type === 'login' ? 'auth-login' : 'auth-signup');
    setIsSettingsOpen(false);
  };

  const handleOpenUserProfile = () => {
    setCurrentView('user-profile');
    setIsSettingsOpen(false);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'auth-login' || currentView === 'auth-signup') {
    return (
      <AuthPage 
        onBack={handleBackToMain}
        initialView={currentView === 'auth-login' ? 'login' : 'signup'}
      />
    );
  }

  if (currentView === 'user-profile') {
    return (
      <UserProfilePage onBack={handleBackToMain} />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        <TopHeader 
          currentTime={currentTime}
          currentDate={currentDate}
          islamicDate={islamicDate}
          nextPrayer={nextPrayer}
          timeToNext={timeToNext}
          jamaatCountdown={jamaatCountdown}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
        <PrayerHeader
          currentTime={currentTime}
          currentDate={currentDate}
          islamicDate={islamicDate}
          nextPrayer={nextPrayer}
          timeToNext={timeToNext}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        <MainPrayerTable
          prayerTimes={prayerTimes}
          jumahTime={jumahTime}
          khutbahTime={khutbahTime}
        />
        <BottomSection
          englishDate={englishDate}
          islamicDate={islamicDate}
          otherTimes={otherTimes}
        />
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenAuth={handleOpenAuth}
        onOpenUserProfile={handleOpenUserProfile}
      />
    </div>
  );
};

export default Index;
