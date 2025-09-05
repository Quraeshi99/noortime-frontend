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
    <div className="space-y-3">
      {/* Islamic Calligraphy Header */}
      <div className="text-center py-4 bg-gradient-to-r from-islamic-gold/10 via-islamic-crescent/15 to-islamic-gold/10 rounded-xl border border-islamic-gold/30">
        <div className="text-xl md:text-2xl font-arabic text-islamic-crescent leading-relaxed" style={{fontFamily: 'Amiri, serif'}}>
          لَآ إِلَهَ إِلَّا ٱللَّهُ مُحَمَّدٌ رَسُولُ ٱللَّهِ
        </div>
        
        {/* Settings Button - Positioned in top right */}
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenSettings}
          className="absolute top-2 right-2 h-8 w-8 rounded-lg border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Settings className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};