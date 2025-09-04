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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Prayer Times - Takes 3 columns on large screens */}
      <div className="lg:col-span-3">
        <Card className="p-3 md:p-4 bg-gradient-to-br from-card to-secondary border border-primary/20 rounded-xl">
          <div className="space-y-3">
            {/* Table Header - Compact */}
            <div className="text-center mb-2">
              <h2 className="text-base md:text-lg font-bold text-primary">
                Prayer Times
              </h2>
            </div>

            {/* Prayer Times Grid Header - 3 columns only */}
            <div className="grid grid-cols-3 gap-2 pb-2 border-b border-primary/20 text-xs">
              <div className="text-center font-bold text-primary">Prayer</div>
              <div className="text-center font-bold text-primary">Azan</div>
              <div className="text-center font-bold text-primary">Jamaat</div>
            </div>

            {/* Prayer Rows - Compact */}
            <div className="space-y-1">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-2 p-1.5 rounded-lg transition-all duration-300 border ${
                    prayer.isActive
                      ? "bg-gradient-to-r from-prayer-active to-prayer-next text-white border-prayer-active/30"
                      : prayer.isNext
                      ? "bg-gradient-to-r from-prayer-next/15 to-accent/15 border-prayer-next/40"
                      : prayer.isCompleted
                      ? "bg-prayer-completed/10 text-muted-foreground border-prayer-completed/30"
                      : "hover:bg-muted/30 border-transparent"
                  }`}
                >
                  <div className="text-center text-xs font-medium">{prayer.name}</div>
                  <div className="text-center text-xs font-mono font-bold">{prayer.azanTime}</div>
                  <div className="text-center text-xs font-mono font-bold">{prayer.jamaatTime}</div>
                </div>
              ))}
            </div>

            {/* Friday Prayer Section - Compact */}
            <div className="pt-2 border-t border-primary/20 space-y-1">
              <div className="text-center">
                <h3 className="text-xs font-bold text-islamic-gold">Friday Prayer</h3>
              </div>

              <div className="space-y-1">
                <div className="grid grid-cols-3 gap-2 p-1.5 rounded-lg bg-gradient-to-r from-islamic-gold/10 to-islamic-crescent/10 border border-islamic-gold/30">
                  <div className="text-center text-xs font-medium">Jumah</div>
                  <div className="text-center text-xs font-mono font-bold">{jumahTime.azanTime}</div>
                  <div className="text-center text-xs font-mono font-bold">{jumahTime.jamaatTime}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-1.5 rounded-lg bg-gradient-to-r from-islamic-crescent/10 to-islamic-gold/10 border border-islamic-crescent/30">
                  <div className="text-center text-xs font-medium">Khutbah</div>
                  <div className="text-center text-xs font-mono font-bold">{khutbahTime}</div>
                  <div className="text-center text-xs text-muted-foreground">-</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Date Section - Takes 1 column on large screens, hidden on mobile */}
      <div className="hidden lg:block">
        <div className="space-y-3">
          {/* English Date Card */}
          <Card className="p-3 bg-gradient-to-br from-card to-secondary border border-primary/20 rounded-xl">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-sm">📅</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">English Date</p>
                <p className="text-sm font-bold text-foreground">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </Card>

          {/* Islamic Date Card */}
          <Card className="p-3 bg-gradient-to-br from-card to-secondary border border-primary/20 rounded-xl">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 mx-auto bg-islamic-gold/20 rounded-full flex items-center justify-center">
                <span className="text-islamic-gold text-sm">🌙</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Islamic Date</p>
                <p className="text-sm font-bold text-foreground">
                  15 Shaban 1446
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};