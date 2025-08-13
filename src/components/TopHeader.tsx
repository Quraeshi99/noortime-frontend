import { Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TopHeaderProps {
  currentTime: string;
  currentDate: string;
  islamicDate: string;
  nextPrayer: string;
  timeToNext: string;
  jamaatCountdown: string;
  onOpenSettings: () => void;
}

export const TopHeader = ({
  currentTime,
  currentDate,
  islamicDate,
  nextPrayer,
  timeToNext,
  jamaatCountdown,
  onOpenSettings,
}: TopHeaderProps) => {
  return (
    <div className="space-y-6">
      {/* App Header - Logo Removed */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Noor Time
          </h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenSettings}
          className="h-10 w-10 rounded-xl border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Info Cards Row - Mobile Optimized */}
      <div className="grid grid-cols-3 gap-2 md:gap-4">
        {/* Salah Info Box */}
        <Card className="p-3 md:p-4 bg-gradient-to-br from-card to-secondary border border-primary/20 rounded-xl">
          <div className="text-center space-y-1">
            <h3 className="text-xs md:text-sm font-bold text-primary">Current</h3>
            <div className="text-sm md:text-lg font-bold text-foreground">{nextPrayer}</div>
            <div className="text-xs text-muted-foreground hidden md:block">Next Prayer</div>
          </div>
        </Card>

        {/* Clock */}
        <Card className="p-3 md:p-4 bg-gradient-to-br from-primary/10 to-accent/10 border border-accent/30 rounded-xl">
          <div className="text-center space-y-1">
            <Clock className="h-4 w-4 md:h-6 md:w-6 text-primary mx-auto" />
            <div className="text-sm md:text-xl font-bold font-mono text-primary">
              {currentTime}
            </div>
            <div className="text-xs text-muted-foreground hidden md:block">{currentDate}</div>
          </div>
        </Card>

        {/* Jamaat Countdown */}
        <Card className="p-3 md:p-4 bg-gradient-to-br from-islamic-gold/20 to-islamic-crescent/20 border border-islamic-gold/40 rounded-xl">
          <div className="text-center space-y-1">
            <h3 className="text-xs md:text-sm font-bold text-islamic-crescent">Jamaat</h3>
            <div className="text-sm md:text-lg font-bold font-mono text-islamic-crescent">
              {jamaatCountdown}
            </div>
            <div className="text-xs text-muted-foreground hidden md:block">Remaining</div>
          </div>
        </Card>
      </div>
    </div>
  );
};