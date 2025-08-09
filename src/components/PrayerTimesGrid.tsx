import { Card } from "@/components/ui/card";

interface PrayerTime {
  name: string;
  arabicName: string;
  azanTime: string;
  jamaatTime: string;
  isActive?: boolean;
  isNext?: boolean;
  isCompleted?: boolean;
}

interface PrayerTimesGridProps {
  prayerTimes: PrayerTime[];
  jumahTime: { azanTime: string; jamaatTime: string };
  khutbahTime: string;
}

export const PrayerTimesGrid = ({ prayerTimes, jumahTime, khutbahTime }: PrayerTimesGridProps) => {
  return (
    <div className="space-y-6">
      {/* Main Prayer Times */}
      <Card className="p-6 bg-gradient-to-br from-card to-secondary border-2 shadow-lg">
        <h2 className="text-xl font-bold text-center mb-6 text-foreground">Daily Prayer Times</h2>
        
        {/* Header */}
        <div className="grid grid-cols-4 gap-4 pb-3 border-b-2 border-border mb-4">
          <div className="text-center font-semibold text-muted-foreground">Prayer</div>
          <div className="text-center font-semibold text-muted-foreground">Azan</div>
          <div className="text-center font-semibold text-muted-foreground">Jamaat</div>
          <div className="text-center font-semibold text-muted-foreground">Arabic</div>
        </div>

        {/* Prayer Rows */}
        <div className="space-y-3">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-4 p-3 rounded-lg transition-all duration-300 ${
                prayer.isActive
                  ? "bg-gradient-to-r from-prayer-active to-prayer-next text-white shadow-md"
                  : prayer.isNext
                  ? "bg-gradient-to-r from-prayer-next/20 to-accent/20 border border-prayer-next"
                  : prayer.isCompleted
                  ? "bg-prayer-completed/20 text-muted-foreground"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="text-center font-medium">{prayer.name}</div>
              <div className="text-center font-mono font-semibold">{prayer.azanTime}</div>
              <div className="text-center font-mono font-semibold">{prayer.jamaatTime}</div>
              <div className="text-center font-medium" dir="rtl">{prayer.arabicName}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Jumah Prayer */}
      <Card className="p-6 bg-gradient-to-br from-islamic-gold/20 to-islamic-crescent/20 border-2 border-islamic-gold/30 shadow-lg">
        <h3 className="text-lg font-bold text-center mb-4 text-foreground">Friday Prayer</h3>
        
        <div className="grid grid-cols-4 gap-4 pb-3 border-b border-border mb-3">
          <div className="text-center font-semibold text-muted-foreground">Prayer</div>
          <div className="text-center font-semibold text-muted-foreground">Azan</div>
          <div className="text-center font-semibold text-muted-foreground">Jamaat</div>
          <div className="text-center font-semibold text-muted-foreground">Arabic</div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-4 p-3 rounded-lg bg-islamic-gold/10">
            <div className="text-center font-medium">Jumah</div>
            <div className="text-center font-mono font-semibold">{jumahTime.azanTime}</div>
            <div className="text-center font-mono font-semibold">{jumahTime.jamaatTime}</div>
            <div className="text-center font-medium" dir="rtl">الجمعة</div>
          </div>
          <div className="grid grid-cols-4 gap-4 p-3 rounded-lg bg-islamic-crescent/10">
            <div className="text-center font-medium">Khutbah</div>
            <div className="text-center font-mono font-semibold">{khutbahTime}</div>
            <div className="text-center text-muted-foreground">-</div>
            <div className="text-center font-medium" dir="rtl">خطبة</div>
          </div>
        </div>
      </Card>
    </div>
  );
};