import { useState, useCallback } from "react";
import { TopHeader } from "@/components/TopHeader";
import { MainPrayerTable } from "@/components/MainPrayerTable";
import { BottomSection } from "@/components/BottomSection";
import { SettingsPanel } from "@/components/SettingsPanel";
import { SplashScreen } from "@/components/SplashScreen";
import { useDarkMode } from "@/hooks/useDarkMode";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";

const Index = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  // Stable callback to prevent infinite re-renders
  const handleSplashComplete = useCallback(() => {
    console.log('Splash onComplete called');
    setShowSplash(false);
  }, []);
  
  console.log('Index component - showSplash:', showSplash);
  
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
    console.log('Showing splash screen');
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  console.log('Showing main app');
  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-300 bg-gradient-to-br relative ${
      isDarkMode ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-gray-50 via-white to-gray-100'
    }`}>
      {/* Main Content Container */}
      <div className="h-screen flex flex-col p-3 space-y-3 relative max-w-md mx-auto">
        {/* Header Section */}
        <div className="flex-shrink-0">
          <TopHeader 
            currentTime={currentTime}
            currentDate={currentDate}
            islamicDate={islamicDate}
            nextPrayer={nextPrayer}
            timeToNext={timeToNext}
            jamaatCountdown={jamaatCountdown}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        </div>
        
        {/* Main Prayer Section - Takes most space */}
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
