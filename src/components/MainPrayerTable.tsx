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
    <Card className="flex-1 p-2 bg-gradient-to-br from-card via-background to-secondary/30 border border-primary/30 rounded-xl shadow-xl backdrop-blur-sm">
      <div className="grid grid-cols-4 gap-2 h-full">
        {/* Date Section - Takes 1 column on left */}
        <div className="space-y-1">
          {/* Prayer Status Card */}
          <div className="p-2 bg-gradient-to-br from-prayer-next/20 via-prayer-active/10 to-accent/5 border border-prayer-next/40 rounded-lg shadow-md">
            <div className="text-center space-y-0.5">
              <div className="w-5 h-5 mx-auto bg-gradient-to-br from-prayer-next to-prayer-active rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⏰</span>
              </div>
              <p className="text-[8px] text-prayer-next font-bold">Next: Maghrib</p>
              <p className="text-[7px] text-muted-foreground">in 2h 15m</p>
            </div>
          </div>

          {/* Combined Date Card */}
          <div className="p-2 bg-gradient-to-br from-primary/10 via-islamic-gold/10 to-accent/5 border border-primary/30 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="text-center space-y-1">
              <div className="flex justify-center space-x-1">
                <div className="w-4 h-4 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs">📅</span>
                </div>
                <div className="w-4 h-4 bg-gradient-to-br from-islamic-gold to-islamic-crescent rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs">🌙</span>
                </div>
              </div>
              <div className="space-y-0.5">
                <div>
                  <p className="text-[7px] text-muted-foreground font-medium">English</p>
                  <p className="text-[8px] font-bold text-foreground leading-tight">
                    {new Date().toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[7px] text-muted-foreground font-medium">Islamic</p>
                  <p className="text-[8px] font-bold text-islamic-crescent leading-tight">
                    15 Shaban 1446 AH
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Clock Card */}
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 border border-accent/30 rounded-lg shadow-lg">
            <div className="text-center space-y-0.5">
              <div className="w-4 h-4 mx-auto text-primary">
                <span className="text-xs">🕐</span>
              </div>
              <div className="text-[8px] font-bold font-mono text-primary">
                {new Date().toLocaleTimeString('en-US', { 
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <p className="text-[7px] text-muted-foreground">Live Time</p>
            </div>
          </div>

          {/* Jamaat Countdown Card */}
          <div className="p-2 bg-gradient-to-br from-islamic-gold/20 to-islamic-crescent/20 border border-islamic-gold/40 rounded-lg shadow-lg">
            <div className="text-center space-y-0.5">
              <div className="w-4 h-4 mx-auto bg-gradient-to-br from-islamic-gold to-islamic-crescent rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⏱️</span>
              </div>
              <p className="text-[7px] text-islamic-crescent font-bold">Jamaat</p>
              <div className="text-[8px] font-bold font-mono text-islamic-crescent">
                15:30
              </div>
              <p className="text-[7px] text-muted-foreground">Time</p>
            </div>
          </div>
        </div>

        {/* Prayer Times - Takes 3 columns on right */}
        <div className="col-span-3 flex flex-col">
          <div className="space-y-1">
            {/* Table Header with decorative elements */}
            <div className="text-center">
              <h2 className="text-xs font-bold text-primary py-1">
                🕌 Prayer Times 🕌
              </h2>
            </div>

            {/* Prayer Times Grid Header */}
            <div className="grid grid-cols-3 gap-1 pb-1 border-b border-primary/30 text-[9px]">
              <div className="text-center font-bold text-primary bg-primary/10 rounded py-0.5">Prayer</div>
              <div className="text-center font-bold text-primary bg-primary/10 rounded py-0.5">Azan</div>
              <div className="text-center font-bold text-primary bg-primary/10 rounded py-0.5">Jamaat</div>
            </div>

            {/* Prayer Rows with enhanced styling */}
            <div className="space-y-0.5">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-1 p-1 rounded-lg transition-all duration-300 border ${
                    prayer.isActive
                      ? "bg-gradient-to-r from-prayer-active via-prayer-next to-prayer-active text-white border-prayer-active/50"
                      : prayer.isNext
                      ? "bg-gradient-to-r from-prayer-next/20 via-accent/15 to-prayer-next/20 border-prayer-next/50"
                      : prayer.isCompleted
                      ? "bg-gradient-to-r from-prayer-completed/15 via-muted/10 to-prayer-completed/15 text-muted-foreground border-prayer-completed/40"
                      : "bg-gradient-to-r from-background via-card to-background border-muted/30"
                  }`}
                >
                  <div className="text-center text-[9px] font-medium">{prayer.name}</div>
                  <div className="text-center text-[9px] font-mono font-bold">{prayer.azanTime}</div>
                  <div className="text-center text-[9px] font-mono font-bold">{prayer.jamaatTime}</div>
                </div>
              ))}
            </div>

            {/* Friday Prayer Section with enhanced styling */}
            <div className="pt-1 border-t border-islamic-gold/30 space-y-0.5">
              <div className="text-center">
                <h3 className="text-[9px] font-bold text-islamic-gold py-0.5">
                  🕌 Friday Prayer
                </h3>
              </div>

              <div className="space-y-0.5">
                <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-gradient-to-r from-islamic-gold/20 via-islamic-crescent/15 to-islamic-gold/20 border border-islamic-gold/40">
                  <div className="text-center text-[9px] font-medium">Jumah</div>
                  <div className="text-center text-[9px] font-mono font-bold">{jumahTime.azanTime}</div>
                  <div className="text-center text-[9px] font-mono font-bold">{jumahTime.jamaatTime}</div>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-gradient-to-r from-islamic-crescent/20 via-islamic-gold/15 to-islamic-crescent/20 border border-islamic-crescent/40">
                  <div className="text-center text-[9px] font-medium">Khutbah</div>
                  <div className="text-center text-[9px] font-mono font-bold">{khutbahTime}</div>
                  <div className="text-center text-[9px] text-muted-foreground">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};