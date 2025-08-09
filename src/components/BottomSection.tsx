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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Side - Date Information */}
      <div className="space-y-6">
        {/* English Date Card */}
        <Card className="p-6 bg-gradient-to-br from-card via-secondary/50 to-accent/20 border-2 border-accent/30 shadow-[var(--material-elevation-2)] rounded-3xl">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-bold text-accent">English Date</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {englishDate}
              </div>
              <div className="px-4 py-2 bg-accent/10 rounded-xl border border-accent/20">
                <span className="text-sm font-medium text-accent">Gregorian Calendar</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Islamic Date Card */}
        <Card className="p-6 bg-gradient-to-br from-islamic-gold/15 via-islamic-crescent/10 to-countdown-bg border-2 border-islamic-gold/40 shadow-[var(--material-elevation-2)] rounded-3xl">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MoonIcon className="w-6 h-6 text-islamic-crescent" />
              <h3 className="text-xl font-bold text-islamic-crescent">Islamic Date</h3>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-islamic-crescent">
                {islamicDate}
              </div>
              <div className="px-4 py-2 bg-islamic-gold/20 rounded-xl border border-islamic-gold/30">
                <span className="text-sm font-medium text-countdown-text">Hijri Calendar - 1446</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Side - Other Times */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-prayer-surface border-2 border-primary/20 shadow-[var(--material-elevation-2)] rounded-3xl">
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <SunIcon className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-primary">Other Important Times</h3>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
          </div>

          <div className="space-y-3">
            {otherTimes.map((time, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-background/80 to-muted/30 hover:from-primary/5 hover:to-accent/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-[var(--material-elevation-1)] hover:shadow-[var(--material-elevation-2)]"
              >
                <div className="font-semibold text-foreground">{time.name}</div>
                <div className="font-mono text-xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-xl">
                  {time.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};