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
        <MainPrayerTable
          prayerTimes={prayerTimes}
          jumahTime={jumahTime}
          khutbahTime={khutbahTime}
        />
        
        {/* Other Times Section - Mobile Only */}
        <div className="lg:hidden">
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
