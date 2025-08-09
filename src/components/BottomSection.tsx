import { Card } from "@/components/ui/card";
import { Calendar, Moon as MoonIcon, Sun as SunIcon } from "lucide-react";

interface AdditionalTime {
  name: string;
  time: string;
  arabicName?: string;
}

interface BottomSectionProps {
  englishDate: string;
  islamicDate: string;
  otherTimes: AdditionalTime[];
}

export const BottomSection = ({ englishDate, islamicDate, otherTimes }: BottomSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Side - Date Information */}
      <div className="space-y-3">
        {/* English Date Card */}
        <Card className="p-4 bg-gradient-to-br from-card to-secondary border border-accent/30 rounded-2xl">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-accent" />
              <h3 className="text-sm md:text-base font-bold text-accent">English Date</h3>
            </div>
            <div className="text-lg md:text-xl font-bold text-primary">{englishDate}</div>
            <div className="text-xs text-muted-foreground">Gregorian Calendar</div>
          </div>
        </Card>

        {/* Islamic Date Card */}
        <Card className="p-4 bg-gradient-to-br from-islamic-gold/15 to-islamic-crescent/10 border border-islamic-gold/40 rounded-2xl">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MoonIcon className="w-4 h-4 text-islamic-crescent" />
              <h3 className="text-sm md:text-base font-bold text-islamic-crescent">Islamic Date</h3>
            </div>
            <div className="text-lg md:text-xl font-bold text-islamic-crescent">{islamicDate}</div>
            <div className="text-xs text-muted-foreground">Hijri Calendar - 1446</div>
          </div>
        </Card>
      </div>

      {/* Right Side - Other Times - Compact */}
      <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-2xl">
        <div className="space-y-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <SunIcon className="w-4 h-4 text-primary" />
              <h3 className="text-sm md:text-base font-bold text-primary">Other Times</h3>
            </div>
          </div>

          <div className="space-y-1">
            {otherTimes.map((time, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 rounded-lg bg-background/50 hover:bg-muted/30 transition-colors duration-200"
              >
                <div className="text-xs md:text-sm font-medium text-foreground">{time.name}</div>
                <div className="text-xs md:text-sm font-mono font-bold text-primary">{time.time}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};