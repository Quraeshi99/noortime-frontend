import { TopHeader } from "@/components/TopHeader";
import { MainPrayerTable } from "@/components/MainPrayerTable";
import { BottomSection } from "@/components/BottomSection";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useDarkMode } from "@/hooks/useDarkMode";

const Index = () => {
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
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
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
  );
};

export default Index;
