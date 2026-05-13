import { useState, useCallback } from "react";
import { TopHeader } from "@/components/TopHeader";
import { MainPrayerTable } from "@/components/MainPrayerTable";
import { BottomSection } from "@/components/BottomSection";
import { AppFooter } from "@/components/AppFooter";
import { SettingsPanel } from "@/components/SettingsPanel";
import { SplashScreen } from "@/components/SplashScreen";
import { useDarkMode } from "@/hooks/useDarkMode";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

const Index = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // Only show splash screen if it hasn't been shown in this session
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown');
  });
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  }, []);
  
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

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-300 bg-gradient-to-br relative ${
      isDarkMode ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-gray-50 via-white to-gray-100'
    }`}>
      {/* Main Content Container - strict fixed height */}
      <div className="h-screen flex flex-col p-3 pb-20 space-y-3 relative max-w-md mx-auto">
        {/* Header Section */}
        <div className="flex-shrink-0">
        <TopHeader
          currentTime={currentTime}
          currentDate={currentDate}
          islamicDate={islamicDate}
          nextPrayer={nextPrayer}
          timeToNext={timeToNext}
          jamaatCountdown={jamaatCountdown}
        />
        </div>
        
        {/* Main Prayer Section - takes exact remaining space */}
        <div className="flex-1 min-h-0">
          <MainPrayerTable
            prayerTimes={prayerTimes}
            jumahTime={jumahTime}
            khutbahTime={khutbahTime}
          />
        </div>
        
        {/* Bottom Section - Additional Times */}
        <div className="flex-shrink-0">
          <BottomSection
            englishDate={englishDate}
            islamicDate={islamicDate}
            otherTimes={otherTimes}
          />
        </div>
      </div>

      {/* Footer Navigation */}
      <AppFooter
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Settings Panel */}
        <SettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
    </div>
  );
};

export default Index;
