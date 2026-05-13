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
    <Card className="flex-1 p-1.5 bg-gradient-to-br from-card via-background to-secondary/30 border border-primary/30 rounded-xl shadow-xl backdrop-blur-sm h-full overflow-hidden">
      <div className="grid grid-cols-4 gap-1.5 h-full">

        {/* Left Column — Clock, Status, Date */}
        <div className="space-y-1 h-full flex flex-col justify-between">

          {/* Clock Card */}
          <div className="p-1.5 bg-gradient-to-br from-primary/10 to-accent/10 border border-accent/30 rounded-lg shadow-lg">
            <div className="text-center">
              <div className="text-[11px] font-bold font-mono text-primary bg-primary/10 px-0.5 py-0.5 rounded border border-primary/20 leading-tight">
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
          <div className="p-1.5 bg-gradient-to-br from-prayer-next/20 via-prayer-active/10 to-accent/5 border border-prayer-next/40 rounded-lg shadow-md">
            <div className="text-center space-y-0">
              <p className="text-[9px] text-prayer-next font-bold leading-tight">Next</p>
              <p className="text-[10px] font-bold text-foreground leading-tight">Maghrib</p>
              <p className="text-[8px] text-muted-foreground font-medium">2h 15m</p>
            </div>
          </div>

          {/* Jamaat Card */}
          <div className="p-1.5 bg-gradient-to-br from-islamic-gold/20 to-islamic-crescent/20 border border-islamic-gold/40 rounded-lg shadow-lg">
            <div className="text-center space-y-0">
              <p className="text-[9px] text-islamic-crescent font-bold">Jamaat</p>
              <div className="text-[11px] font-bold font-mono text-islamic-crescent">
                15:30
              </div>
            </div>
          </div>

          {/* Date Card */}
          <div className="p-1.5 bg-gradient-to-br from-primary/10 via-islamic-gold/10 to-accent/5 border border-primary/30 rounded-lg shadow-lg backdrop-blur-sm">
            <div className="text-center space-y-0.5">
              <div>
                <p className="text-[8px] text-muted-foreground font-semibold">English</p>
                <p className="text-[9px] font-bold text-foreground leading-tight">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-[8px] text-muted-foreground font-semibold">Islamic</p>
                <p className="text-[9px] font-bold text-islamic-crescent leading-tight">
                  15 Shaban 1446
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section — Prayer Times Table (3 columns wide) */}
        <div className="col-span-3 flex flex-col h-full">
          <div className="flex flex-col h-full justify-between">

            {/* Section Title */}
            <div className="text-center mb-0.5">
              <h2 className="text-[11px] font-bold text-primary py-0.5">
                Prayer Times
              </h2>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-3 gap-1 pb-0.5 border-b border-primary/30 mb-0.5">
              <div className="text-center text-[10px] font-bold text-primary bg-primary/10 rounded py-0.5">Prayer</div>
              <div className="text-center text-[10px] font-bold text-primary bg-primary/10 rounded py-0.5">Azan</div>
              <div className="text-center text-[10px] font-bold text-primary bg-primary/10 rounded py-0.5">Jamaat</div>
            </div>

            {/* Prayer Rows */}
            <div className="flex flex-col justify-between flex-1 space-y-0.5">
              {prayerTimes.map((prayer, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-3 gap-1 px-1 py-1 rounded-lg transition-all duration-300 border ${
                    prayer.isActive
                      ? "bg-gradient-to-r from-prayer-active via-prayer-next to-prayer-active text-white border-prayer-active/50"
                      : prayer.isNext
                      ? "bg-gradient-to-r from-prayer-next/20 via-accent/15 to-prayer-next/20 border-prayer-next/50"
                      : prayer.isCompleted
                      ? "bg-gradient-to-r from-prayer-completed/15 via-muted/10 to-prayer-completed/15 text-muted-foreground border-prayer-completed/40"
                      : "bg-gradient-to-r from-background via-card to-background border-muted/30"
                  }`}
                >
                  <div className="text-center text-[11px] font-bold flex items-center justify-center">{prayer.name}</div>
                  <div className="text-center text-[11px] font-mono font-bold flex items-center justify-center">{prayer.azanTime}</div>
                  <div className="text-center text-[11px] font-mono font-bold flex items-center justify-center">{prayer.jamaatTime}</div>
                </div>
              ))}
            </div>

            {/* Friday Prayer */}
            <div className="pt-0.5 border-t border-islamic-gold/30 mt-0.5">
              <div className="text-center mb-0.5">
                <h3 className="text-[10px] font-bold text-islamic-gold py-0.5">
                  Friday Prayer
                </h3>
              </div>
              <div className="space-y-0.5">
                <div className="grid grid-cols-3 gap-1 px-1 py-0.5 rounded bg-gradient-to-r from-islamic-gold/20 via-islamic-crescent/15 to-islamic-gold/20 border border-islamic-gold/40">
                  <div className="text-center text-[10px] font-bold">Jumah</div>
                  <div className="text-center text-[10px] font-mono font-bold">{jumahTime.azanTime}</div>
                  <div className="text-center text-[10px] font-mono font-bold">{jumahTime.jamaatTime}</div>
                </div>
                <div className="grid grid-cols-3 gap-1 px-1 py-0.5 rounded bg-gradient-to-r from-islamic-crescent/20 via-islamic-gold/15 to-islamic-crescent/20 border border-islamic-crescent/40">
                  <div className="text-center text-[10px] font-bold">Khutbah</div>
                  <div className="text-center text-[10px] font-mono font-bold">{khutbahTime}</div>
                  <div className="text-center text-[10px] text-muted-foreground font-semibold">—</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Card>
  );
};