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
      {/* Top Action Bar with Glassmorphism */}
      <div className="glass-light rounded-xl p-3 flex justify-between items-center shadow-md">
        <Button
          variant="neu"
          size="icon"
          onClick={onToggleDarkMode}
          className="h-9 w-9 rounded-full"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="neu"
          size="icon"
          onClick={onOpenSettings}
          className="h-9 w-9 rounded-full"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Islamic Calligraphy Header with Glassmorphism */}
      <div className="glass text-center py-4 rounded-xl border border-islamic-gold/30 shadow-lg">
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