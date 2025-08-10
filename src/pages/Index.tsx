import { useState } from "react";
import { TopHeader } from "@/components/TopHeader";
import { MainPrayerTable } from "@/components/MainPrayerTable";
import { BottomSection } from "@/components/BottomSection";
import { SettingsPanel } from "@/components/SettingsPanel";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useDarkMode } from "@/hooks/useDarkMode";

const Index = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
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

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-2 md:p-4">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {/* Top Header Section */}
          <TopHeader
            currentTime={currentTime}
            currentDate={currentDate}
            islamicDate={islamicDate}
            nextPrayer={nextPrayer}
            timeToNext={timeToNext}
            jamaatCountdown={jamaatCountdown}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          {/* Main Prayer Times Table */}
          <MainPrayerTable
            prayerTimes={prayerTimes}
            jumahTime={jumahTime}
            khutbahTime={khutbahTime}
          />

          {/* Bottom Section with Dates and Other Times */}
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
    </>
  );
};

export default Index;
