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

interface MainPrayerTableProps {
  prayerTimes: PrayerTime[];
  jumahTime: { azanTime: string; jamaatTime: string };
  khutbahTime: string;
}

export const MainPrayerTable = ({ prayerTimes, jumahTime, khutbahTime }: MainPrayerTableProps) => {
  return (
    <Card className="flex-1 p-2 bg-gradient-to-br from-card via-background to-secondary/30 border border-primary/30 rounded-xl shadow-xl backdrop-blur-sm">
      <div className="grid grid-cols-4 gap-2 h-full">

        {/* Left Column — Clock, Status, Date */}
        <div className="space-y-1">

          {/* Clock Card */}
          <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 border border-accent/30 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="text-xs font-bold font-mono text-primary bg-primary/10 px-1 py-1 rounded-md border border-primary/20 leading-tight">
                {new Date().toLocaleTimeString('en-US', {
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            </div>
          </div>

          {/* Next Prayer Card */}
          <div className="p-2 bg-gradient-to-br from-prayer-next/20 via-prayer-active/10 to-accent/5 border border-prayer-next/40 rounded-lg shadow-md">
            <div className="text-center space-y-0.5">
              <p className="text-[10px] text-prayer-next font-bold leading-tight">Next</p>
              <p className="text-[10px] font-bold text-foreground leading-tight">Maghrib</p>
              <p className="text-[9px] text-muted-foreground font-medium">2h 15m</p>
            </div>
          </div>

          {/* Jamaat Card */}
          <div className="p-2 bg-gradient-to-br from-islamic-gold/20 to-islamic-crescent/20 border border-islamic-gold/40 rounded-lg shadow-lg">
            <div className="text-center space-y-0.5">
              <p className="text-[10px] text-islamic-crescent font-bold">Jamaat</p>
              <div className="text-xs font-bold font-mono text-islamic-crescent">
                15:30
              </div>
            </div>
          </div>

          {/* Date Card */}
          <div className="p-2 bg-gradient-to-br from-primary/10 via-islamic-gold/10 to-accent/5 border border-primary/30 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="text-center space-y-1">
              <div>
                <p className="text-[9px] text-muted-foreground font-semibold">English</p>
                <p className="text-[10px] font-bold text-foreground leading-tight">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-[9px] text-muted-foreground font-semibold">Islamic</p>
                <p className="text-[10px] font-bold text-islamic-crescent leading-tight">
                  15 Shaban 1446
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section — Prayer Times Table (3 columns wide) */}
        <div className="col-span-3 flex flex-col">
          <div className="space-y-1">

            {/* Section Title */}
            <div className="text-center">
              <h2 className="text-sm font-bold text-primary py-1">
                Prayer Times
              </h2>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-3 gap-1 pb-1 border-b border-primary/30">
              <div className="text-center text-xs font-bold text-primary bg-primary/10 rounded py-0.5">Prayer</div>
              <div className="text-center text-xs font-bold text-primary bg-primary/10 rounded py-0.5">Azan</div>
              <div className="text-center text-xs font-bold text-primary bg-primary/10 rounded py-0.5">Jamaat</div>
            </div>

            {/* Prayer Rows */}
            <div className="space-y-0.5">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-1 p-1.5 rounded-lg transition-all duration-300 border ${
                    prayer.isActive
                      ? "bg-gradient-to-r from-prayer-active via-prayer-next to-prayer-active text-white border-prayer-active/50"
                      : prayer.isNext
                      ? "bg-gradient-to-r from-prayer-next/20 via-accent/15 to-prayer-next/20 border-prayer-next/50"
                      : prayer.isCompleted
                      ? "bg-gradient-to-r from-prayer-completed/15 via-muted/10 to-prayer-completed/15 text-muted-foreground border-prayer-completed/40"
                      : "bg-gradient-to-r from-background via-card to-background border-muted/30"
                  }`}
                >
                  <div className="text-center text-xs font-bold">{prayer.name}</div>
                  <div className="text-center text-xs font-mono font-bold">{prayer.azanTime}</div>
                  <div className="text-center text-xs font-mono font-bold">{prayer.jamaatTime}</div>
                </div>
              ))}
            </div>

            {/* Friday Prayer */}
            <div className="pt-1 border-t border-islamic-gold/30 space-y-0.5">
              <div className="text-center">
                <h3 className="text-xs font-bold text-islamic-gold py-0.5">
                  Friday Prayer
                </h3>
              </div>
              <div className="space-y-0.5">
                <div className="grid grid-cols-3 gap-1 p-1.5 rounded-lg bg-gradient-to-r from-islamic-gold/20 via-islamic-crescent/15 to-islamic-gold/20 border border-islamic-gold/40">
                  <div className="text-center text-xs font-bold">Jumah</div>
                  <div className="text-center text-xs font-mono font-bold">{jumahTime.azanTime}</div>
                  <div className="text-center text-xs font-mono font-bold">{jumahTime.jamaatTime}</div>
                </div>
                <div className="grid grid-cols-3 gap-1 p-1.5 rounded-lg bg-gradient-to-r from-islamic-crescent/20 via-islamic-gold/15 to-islamic-crescent/20 border border-islamic-crescent/40">
                  <div className="text-center text-xs font-bold">Khutbah</div>
                  <div className="text-center text-xs font-mono font-bold">{khutbahTime}</div>
                  <div className="text-center text-xs text-muted-foreground font-semibold">—</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Card>
  );
};