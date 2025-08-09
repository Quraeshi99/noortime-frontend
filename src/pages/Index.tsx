import { PrayerHeader } from "@/components/PrayerHeader";
import { PrayerTimesGrid } from "@/components/PrayerTimesGrid";
import { AdditionalTimes } from "@/components/AdditionalTimes";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { useDarkMode } from "@/hooks/useDarkMode";

const Index = () => {
  const {
    currentTime,
    currentDate,
    islamicDate,
    nextPrayer,
    timeToNext,
    prayerTimes,
    jumahTime,
    khutbahTime,
    otherTimes,
    englishDate,
  } = usePrayerTimes();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <PrayerHeader
          currentTime={currentTime}
          currentDate={currentDate}
          islamicDate={islamicDate}
          nextPrayer={nextPrayer}
          timeToNext={timeToNext}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        {/* Prayer Times Grid */}
        <PrayerTimesGrid
          prayerTimes={prayerTimes}
          jumahTime={jumahTime}
          khutbahTime={khutbahTime}
        />

        {/* Additional Information */}
        <AdditionalTimes
          englishDate={englishDate}
          islamicDate={islamicDate}
          otherTimes={otherTimes}
        />
      </div>
    </div>
  );
};

export default Index;
