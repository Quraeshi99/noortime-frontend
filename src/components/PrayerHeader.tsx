import { Clock, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PrayerHeaderProps {
  currentTime: string;
  currentDate: string;
  islamicDate: string;
  nextPrayer: string;
  timeToNext: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const PrayerHeader = ({
  currentTime,
  currentDate,
  islamicDate,
  nextPrayer,
  timeToNext,
  isDarkMode,
  onToggleDarkMode,
}: PrayerHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Top Header with Logo and Dark Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img 
            src="/images/39329f85-045b-48c6-88b3-a2d925d41463.png" 
            alt="Noor Time Logo" 
            className="w-12 h-12 rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Noor Time</h1>
            <p className="text-sm text-muted-foreground">Prayer Times</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleDarkMode}
          className="rounded-full border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Time Card */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-2 shadow-lg">
          <div className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-3 text-primary" />
            <div className="text-3xl font-bold text-foreground mb-1">{currentTime}</div>
            <div className="text-sm text-muted-foreground">{currentDate}</div>
          </div>
        </Card>

        {/* Next Prayer Card */}
        <Card className="p-6 bg-gradient-to-br from-prayer-active to-prayer-next text-white border-2 shadow-xl">
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">Next Prayer</div>
            <div className="text-2xl font-bold mb-1">{nextPrayer}</div>
            <div className="text-sm opacity-90">in {timeToNext}</div>
          </div>
        </Card>

        {/* Islamic Date Card */}
        <Card className="p-6 bg-gradient-to-br from-islamic-gold to-islamic-crescent text-white border-2 shadow-lg">
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">Islamic Date</div>
            <div className="text-xl font-bold">{islamicDate}</div>
            <div className="text-sm opacity-90">1446 Hijri</div>
          </div>
        </Card>
      </div>
    </div>
  );
};