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
    <Card className="p-3 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-2 border-primary/30 rounded-2xl shadow-xl backdrop-blur-sm">
      <div className="space-y-3">
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent rounded-lg"></div>
          <h3 className="text-sm font-bold text-primary relative z-10 py-2">
            ⏰ Other Important Times ⏰
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {otherTimes.map((time, index) => (
            <div
              key={index}
              className="p-2 rounded-xl bg-gradient-to-br from-background via-card to-muted/20 border-2 border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.05] hover:border-accent/50"
            >
              <div className="text-center space-y-1">
                <div className="text-[11px] font-medium text-foreground">{time.name}</div>
                <div className="text-xs font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                  {time.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative bottom border */}
        <div className="flex justify-center pt-2">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div>
      </div>
    </Card>
  );
};