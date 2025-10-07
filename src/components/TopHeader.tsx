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
}

export const TopHeader = ({
  currentTime,
  currentDate,
  islamicDate,
  nextPrayer,
  timeToNext,
  jamaatCountdown,
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
    <div className="space-y-4">
      {/* Islamic Calligraphy Header - Refined for Mobile */}
      <div className="text-center py-6 bg-gradient-to-r from-islamic-gold/10 via-islamic-crescent/15 to-islamic-gold/10 rounded-2xl border border-islamic-gold/30 shadow-lg">
        <div className="text-2xl sm:text-3xl font-arabic text-islamic-crescent leading-relaxed px-4" style={{fontFamily: 'Amiri, serif'}}>
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