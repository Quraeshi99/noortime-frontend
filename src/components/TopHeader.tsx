import { Clock, Moon, Sun, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TopHeaderProps {
  currentTime: string;
  currentDate: string;
  islamicDate: string;
  nextPrayer: string;
  timeToNext: string;
  jamaatCountdown: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const TopHeader = ({
  currentTime,
  currentDate,
  islamicDate,
  nextPrayer,
  timeToNext,
  jamaatCountdown,
  isDarkMode,
  onToggleDarkMode,
}: TopHeaderProps) => {
  return (
    <div className="space-y-6">
      {/* Logo Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src="/lovable-uploads/39329f85-045b-48c6-88b3-a2d925d41463.png" 
              alt="Noor Time Logo" 
              className="w-16 h-16 rounded-2xl shadow-lg border-2 border-primary/20"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-islamic-gold rounded-full border-2 border-background"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Noor Time
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Prayer Times - Karachi, Pakistan
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleDarkMode}
          className="rounded-2xl border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main Info Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Salah Info Box */}
        <Card className="p-6 bg-gradient-to-br from-card via-prayer-surface to-secondary border-2 border-primary/10 shadow-[var(--material-elevation-2)] rounded-2xl">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-primary">Current Salah</h3>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{nextPrayer}</div>
              <div className="text-sm text-muted-foreground">Next Prayer</div>
              <div className="px-3 py-1 bg-primary/10 rounded-full">
                <span className="text-sm font-medium text-primary">In Progress</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Clock */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-islamic-gold/5 border-2 border-accent/20 shadow-[var(--material-elevation-3)] rounded-2xl">
          <div className="text-center space-y-3">
            <div className="relative mx-auto w-16 h-16 border-4 border-primary/20 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="text-3xl font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {currentTime}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{currentDate}</div>
            </div>
          </div>
        </Card>

        {/* Jamaat Info with Countdown */}
        <Card className="p-6 bg-gradient-to-br from-countdown-bg via-islamic-gold/10 to-islamic-gold/5 border-2 border-islamic-gold/30 shadow-[var(--material-elevation-2)] rounded-2xl">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-bold text-countdown-text">Next Jamaat</h3>
            <div className="space-y-2">
              <div className="text-xl font-bold text-islamic-crescent">{nextPrayer}</div>
              <div className="bg-islamic-gold/20 rounded-xl p-3 border border-islamic-gold/30">
                <div className="text-sm text-countdown-text mb-1">Time Remaining</div>
                <div className="text-2xl font-mono font-bold text-islamic-crescent">
                  {jamaatCountdown}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};