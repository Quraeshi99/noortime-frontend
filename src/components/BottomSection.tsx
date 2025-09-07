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
    <Card className="p-2 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border border-primary/30 rounded-xl shadow-xl backdrop-blur-sm">
      <div className="space-y-1">
        <div className="text-center">
          <h3 className="text-[10px] font-bold text-primary py-0.5">
            Other Important Times
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-1">
          {otherTimes.map((time, index) => (
            <div
              key={index}
              className="p-1 rounded-lg bg-gradient-to-br from-background via-card to-muted/20 border border-accent/30 shadow-lg transition-all duration-300"
            >
              <div className="text-center space-y-0.5">
                <div className="text-[8px] font-medium text-foreground">{time.name}</div>
                <div className="text-[9px] font-mono font-bold text-primary bg-primary/10 px-1 py-0.5 rounded">
                  {time.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};