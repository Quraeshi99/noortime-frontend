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
    <Card className="p-2 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-xl">
      <div className="space-y-2">
        <div className="text-center">
          <h3 className="text-xs font-bold text-primary">Other Times</h3>
        </div>

        <div className="grid grid-cols-2 gap-1">
          {otherTimes.map((time, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-1 rounded-md bg-background/50 hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="text-[10px] font-medium text-foreground">{time.name}</div>
              <div className="text-[10px] font-mono font-bold text-primary">{time.time}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};