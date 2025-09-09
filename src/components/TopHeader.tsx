import { Clock, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LocationCard } from "./LocationCard";
import { LocationEditModal } from "./LocationEditModal";
import { useState } from "react";

interface TopHeaderProps {
  currentTime: string;
  currentDate: string;
  islamicDate: string;
  nextPrayer: string;
  timeToNext: string;
  jamaatCountdown: string;
  onOpenSettings: () => void;
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
  onOpenSettings,
  isDarkMode,
  onToggleDarkMode,
}: TopHeaderProps) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const handleLocationEdit = () => {
    setIsLocationModalOpen(true);
  };

  const handleLocationSave = (location: any) => {
    // Yahan backend API call hogi
    console.log('Saving location:', location);
  };

  return (
    <div className="space-y-3">
      {/* Top Action Bar */}
      <div className="flex justify-between items-center mb-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleDarkMode}
          className="h-8 w-8 rounded-lg border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenSettings}
          className="h-8 w-8 rounded-lg border hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Settings className="h-3 w-3" />
        </Button>
      </div>

      {/* Islamic Calligraphy Header */}
      <div className="text-center py-4 bg-gradient-to-r from-islamic-gold/10 via-islamic-crescent/15 to-islamic-gold/10 rounded-xl border border-islamic-gold/30">
        <div className="text-xl md:text-2xl font-arabic text-islamic-crescent leading-relaxed" style={{fontFamily: 'Amiri, serif'}}>
          لَآ إِلَهَ إِلَّا ٱللَّهُ مُحَمَّدٌ رَسُولُ ٱللَّهِ
        </div>
      </div>

      {/* Location Card */}
      <LocationCard onEditLocation={handleLocationEdit} />

      {/* Location Edit Modal */}
      <LocationEditModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSave={handleLocationSave}
      />
    </div>
  );
};