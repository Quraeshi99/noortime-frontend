import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PrayerTime {
  name: string;
  arabicName: string;
  azanTime: string;
  jamaatTime: string;
  isActive?: boolean;
  isNext?: boolean;
  isCompleted?: boolean;
}

interface MainPrayerTableProps {
  prayerTimes: PrayerTime[];
  jumahTime: { azanTime: string; jamaatTime: string };
  khutbahTime: string;
}

export const MainPrayerTable = ({ prayerTimes, jumahTime, khutbahTime }: MainPrayerTableProps) => {
  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-card to-secondary border border-primary/20 rounded-2xl">
      {/* Daily Prayers Section */}
      <div className="space-y-4">
        {/* Table Header - Mobile Optimized */}
        <div className="text-center mb-4">
          <h2 className="text-lg md:text-xl font-bold text-primary mb-2">
            Prayer Times
          </h2>
        </div>

        {/* Prayer Times Grid Header - Compact */}
        <div className="grid grid-cols-4 gap-2 md:gap-4 pb-3 border-b border-primary/20 text-xs md:text-sm">
          <div className="text-center font-bold text-primary">Prayer</div>
          <div className="text-center font-bold text-primary">Azan</div>
          <div className="text-center font-bold text-primary">Jamaat</div>
          <div className="text-center font-bold text-primary">Arabic</div>
        </div>

        {/* Prayer Rows - Mobile Optimized */}
        <div className="space-y-2">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-2 md:gap-4 p-2 md:p-3 rounded-xl transition-all duration-300 border ${
                prayer.isActive
                  ? "bg-gradient-to-r from-prayer-active to-prayer-next text-white border-prayer-active/30"
                  : prayer.isNext
                  ? "bg-gradient-to-r from-prayer-next/15 to-accent/15 border-prayer-next/40"
                  : prayer.isCompleted
                  ? "bg-prayer-completed/10 text-muted-foreground border-prayer-completed/30"
                  : "hover:bg-muted/30 border-transparent"
              }`}
            >
              <div className="text-center text-xs md:text-sm font-medium">{prayer.name}</div>
              <div className="text-center text-xs md:text-sm font-mono font-bold">{prayer.azanTime}</div>
              <div className="text-center text-xs md:text-sm font-mono font-bold">{prayer.jamaatTime}</div>
              <div className="text-center text-xs md:text-sm font-medium" dir="rtl">{prayer.arabicName}</div>
            </div>
          ))}
        </div>

        {/* Friday Prayer Section - Compact */}
        <div className="pt-4 border-t border-primary/20 space-y-2">
          <div className="text-center">
            <h3 className="text-sm md:text-base font-bold text-islamic-gold">Friday Prayer</h3>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-4 gap-2 md:gap-4 p-2 md:p-3 rounded-xl bg-gradient-to-r from-islamic-gold/10 to-islamic-crescent/10 border border-islamic-gold/30">
              <div className="text-center text-xs md:text-sm font-medium">Jumah</div>
              <div className="text-center text-xs md:text-sm font-mono font-bold">{jumahTime.azanTime}</div>
              <div className="text-center text-xs md:text-sm font-mono font-bold">{jumahTime.jamaatTime}</div>
              <div className="text-center text-xs md:text-sm font-medium" dir="rtl">الجمعة</div>
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-4 p-2 md:p-3 rounded-xl bg-gradient-to-r from-islamic-crescent/10 to-islamic-gold/10 border border-islamic-crescent/30">
              <div className="text-center text-xs md:text-sm font-medium">Khutbah</div>
              <div className="text-center text-xs md:text-sm font-mono font-bold">{khutbahTime}</div>
              <div className="text-center text-xs md:text-sm text-muted-foreground">-</div>
              <div className="text-center text-xs md:text-sm font-medium" dir="rtl">خطبة</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};