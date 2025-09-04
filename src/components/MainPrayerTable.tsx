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
    <Card className="p-3 bg-gradient-to-br from-card via-background to-secondary/30 border border-primary/30 rounded-2xl shadow-xl backdrop-blur-sm">
      <div className="grid grid-cols-4 gap-3">
        {/* Date Section - Takes 1 column on left */}
        <div className="space-y-2">
          {/* English Date Card */}
          <div className="p-3 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-2 border-primary/30 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 mx-auto bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-sm">📅</span>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">English Date</p>
                <p className="text-xs font-bold text-foreground leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {new Date().toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-[8px] text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* Islamic Date Card */}
          <div className="p-3 bg-gradient-to-br from-islamic-gold/15 via-islamic-crescent/10 to-islamic-gold/5 border-2 border-islamic-gold/40 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <div className="text-center space-y-2">
              <div className="w-8 h-8 mx-auto bg-gradient-to-br from-islamic-gold to-islamic-crescent rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-sm">🌙</span>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">Islamic Date</p>
                <p className="text-xs font-bold text-islamic-crescent leading-tight">
                  15 Shaban
                </p>
                <p className="text-[8px] text-muted-foreground">1446 AH</p>
              </div>
            </div>
          </div>

          {/* Prayer Status Card */}
          <div className="p-2 bg-gradient-to-br from-prayer-next/20 via-prayer-active/10 to-accent/5 border border-prayer-next/40 rounded-xl shadow-md">
            <div className="text-center space-y-1">
              <div className="w-6 h-6 mx-auto bg-gradient-to-br from-prayer-next to-prayer-active rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⏰</span>
              </div>
              <p className="text-[9px] text-prayer-next font-bold">Next: Maghrib</p>
              <p className="text-[8px] text-muted-foreground">in 2h 15m</p>
            </div>
          </div>
        </div>

        {/* Prayer Times - Takes 3 columns on right */}
        <div className="col-span-3">
          <div className="space-y-3">
            {/* Table Header with decorative elements */}
            <div className="text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-lg"></div>
              <h2 className="text-sm font-bold text-primary relative z-10 py-2">
                🕌 Prayer Times 🕌
              </h2>
            </div>

            {/* Prayer Times Grid Header */}
            <div className="grid grid-cols-3 gap-2 pb-2 border-b-2 border-gradient-to-r from-primary/30 via-accent/30 to-primary/30 text-[11px]">
              <div className="text-center font-bold text-primary bg-primary/10 rounded-lg py-1">Prayer</div>
              <div className="text-center font-bold text-primary bg-primary/10 rounded-lg py-1">Azan</div>
              <div className="text-center font-bold text-primary bg-primary/10 rounded-lg py-1">Jamaat</div>
            </div>

            {/* Prayer Rows with enhanced styling */}
            <div className="space-y-1.5">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-2 p-2 rounded-xl transition-all duration-300 border-2 shadow-md hover:shadow-lg transform hover:scale-[1.02] ${
                    prayer.isActive
                      ? "bg-gradient-to-r from-prayer-active via-prayer-next to-prayer-active text-white border-prayer-active/50 shadow-prayer-active/30"
                      : prayer.isNext
                      ? "bg-gradient-to-r from-prayer-next/20 via-accent/15 to-prayer-next/20 border-prayer-next/50 shadow-prayer-next/20"
                      : prayer.isCompleted
                      ? "bg-gradient-to-r from-prayer-completed/15 via-muted/10 to-prayer-completed/15 text-muted-foreground border-prayer-completed/40"
                      : "bg-gradient-to-r from-background via-card to-background hover:from-muted/20 hover:via-accent/10 hover:to-muted/20 border-muted/30"
                  }`}
                >
                  <div className="text-center text-[11px] font-medium">{prayer.name}</div>
                  <div className="text-center text-[11px] font-mono font-bold">{prayer.azanTime}</div>
                  <div className="text-center text-[11px] font-mono font-bold">{prayer.jamaatTime}</div>
                </div>
              ))}
            </div>

            {/* Friday Prayer Section with enhanced styling */}
            <div className="pt-3 border-t-2 border-gradient-to-r from-islamic-gold/30 via-islamic-crescent/30 to-islamic-gold/30 space-y-2">
              <div className="text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-islamic-gold/20 to-transparent rounded-lg"></div>
                <h3 className="text-xs font-bold text-islamic-gold relative z-10 py-1">
                  🕌 Friday Prayer 🕌
                </h3>
              </div>

              <div className="space-y-1.5">
                <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-gradient-to-r from-islamic-gold/20 via-islamic-crescent/15 to-islamic-gold/20 border-2 border-islamic-gold/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="text-center text-[11px] font-medium">Jumah</div>
                  <div className="text-center text-[11px] font-mono font-bold">{jumahTime.azanTime}</div>
                  <div className="text-center text-[11px] font-mono font-bold">{jumahTime.jamaatTime}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-gradient-to-r from-islamic-crescent/20 via-islamic-gold/15 to-islamic-crescent/20 border-2 border-islamic-crescent/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="text-center text-[11px] font-medium">Khutbah</div>
                  <div className="text-center text-[11px] font-mono font-bold">{khutbahTime}</div>
                  <div className="text-center text-[11px] text-muted-foreground">-</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};