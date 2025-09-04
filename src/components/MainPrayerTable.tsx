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
    <Card className="p-2 md:p-3 bg-gradient-to-br from-card to-secondary border border-primary/20 rounded-xl">
      <div className="grid grid-cols-4 gap-2">
        {/* Date Section - Takes 1 column on left */}
        <div className="space-y-2">
          {/* English Date Card */}
          <div className="p-2 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg">
            <div className="text-center space-y-1">
              <div className="w-6 h-6 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xs">📅</span>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground">English</p>
                <p className="text-[10px] font-bold text-foreground leading-tight">
                  {new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Islamic Date Card */}
          <div className="p-2 bg-gradient-to-br from-islamic-gold/5 to-islamic-crescent/5 border border-islamic-gold/20 rounded-lg">
            <div className="text-center space-y-1">
              <div className="w-6 h-6 mx-auto bg-islamic-gold/20 rounded-full flex items-center justify-center">
                <span className="text-islamic-gold text-xs">🌙</span>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground">Islamic</p>
                <p className="text-[10px] font-bold text-foreground leading-tight">
                  15 Shaban
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Times - Takes 3 columns on right */}
        <div className="col-span-3">
          <div className="space-y-2">
            {/* Table Header - Very Compact */}
            <div className="text-center">
              <h2 className="text-sm font-bold text-primary">Prayer Times</h2>
            </div>

            {/* Prayer Times Grid Header - 3 columns only */}
            <div className="grid grid-cols-3 gap-1 pb-1 border-b border-primary/20 text-[10px]">
              <div className="text-center font-bold text-primary">Prayer</div>
              <div className="text-center font-bold text-primary">Azan</div>
              <div className="text-center font-bold text-primary">Jamaat</div>
            </div>

            {/* Prayer Rows - Very Compact */}
            <div className="space-y-0.5">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-1 p-1 rounded-md transition-all duration-300 border ${
                    prayer.isActive
                      ? "bg-gradient-to-r from-prayer-active to-prayer-next text-white border-prayer-active/30"
                      : prayer.isNext
                      ? "bg-gradient-to-r from-prayer-next/15 to-accent/15 border-prayer-next/40"
                      : prayer.isCompleted
                      ? "bg-prayer-completed/10 text-muted-foreground border-prayer-completed/30"
                      : "hover:bg-muted/30 border-transparent"
                  }`}
                >
                  <div className="text-center text-[10px] font-medium">{prayer.name}</div>
                  <div className="text-center text-[10px] font-mono font-bold">{prayer.azanTime}</div>
                  <div className="text-center text-[10px] font-mono font-bold">{prayer.jamaatTime}</div>
                </div>
              ))}
            </div>

            {/* Friday Prayer Section - Very Compact */}
            <div className="pt-1 border-t border-primary/20 space-y-0.5">
              <div className="text-center">
                <h3 className="text-[10px] font-bold text-islamic-gold">Friday Prayer</h3>
              </div>

              <div className="space-y-0.5">
                <div className="grid grid-cols-3 gap-1 p-1 rounded-md bg-gradient-to-r from-islamic-gold/10 to-islamic-crescent/10 border border-islamic-gold/30">
                  <div className="text-center text-[10px] font-medium">Jumah</div>
                  <div className="text-center text-[10px] font-mono font-bold">{jumahTime.azanTime}</div>
                  <div className="text-center text-[10px] font-mono font-bold">{jumahTime.jamaatTime}</div>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1 rounded-md bg-gradient-to-r from-islamic-crescent/10 to-islamic-gold/10 border border-islamic-crescent/30">
                  <div className="text-center text-[10px] font-medium">Khutbah</div>
                  <div className="text-center text-[10px] font-mono font-bold">{khutbahTime}</div>
                  <div className="text-center text-[10px] text-muted-foreground">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};