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
    <Card className="p-8 bg-gradient-to-br from-card via-prayer-surface to-prayer-container border-2 border-primary/15 shadow-[var(--material-elevation-3)] rounded-3xl">
      {/* Daily Prayers Section */}
      <div className="space-y-6">
        {/* Table Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
            Daily Prayer Times
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
        </div>

        {/* Prayer Times Grid Header */}
        <div className="grid grid-cols-4 gap-6 pb-4 border-b-2 border-primary/20">
          <div className="text-center">
            <h3 className="font-bold text-lg text-primary">Prayer</h3>
            <p className="text-sm text-muted-foreground">نماز</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg text-primary">Azan</h3>
            <p className="text-sm text-muted-foreground">اذان</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg text-primary">Jamaat</h3>
            <p className="text-sm text-muted-foreground">جماعت</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg text-primary">Arabic</h3>
            <p className="text-sm text-muted-foreground">عربی</p>
          </div>
        </div>

        {/* Prayer Rows */}
        <div className="space-y-3">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-6 p-4 rounded-2xl transition-all duration-300 border-2 ${
                prayer.isActive
                  ? "bg-gradient-to-r from-prayer-active to-prayer-next text-white shadow-[var(--shadow-prayer)] border-prayer-active/30 scale-[1.02]"
                  : prayer.isNext
                  ? "bg-gradient-to-r from-prayer-next/15 to-accent/15 border-prayer-next/40 shadow-[var(--material-elevation-1)]"
                  : prayer.isCompleted
                  ? "bg-prayer-completed/10 text-muted-foreground border-prayer-completed/30"
                  : "hover:bg-muted/30 border-transparent hover:border-primary/20 hover:shadow-[var(--material-elevation-1)]"
              }`}
            >
              <div className="text-center">
                <div className="font-bold text-lg">{prayer.name}</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-xl font-bold">{prayer.azanTime}</div>
              </div>
              <div className="text-center">
                <div className="font-mono text-xl font-bold">{prayer.jamaatTime}</div>
              </div>
              <div className="text-center" dir="rtl">
                <div className="font-bold text-lg">{prayer.arabicName}</div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gradient-to-r from-transparent via-primary/30 to-transparent h-0.5" />

        {/* Friday Prayer Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold bg-gradient-to-r from-islamic-gold to-islamic-crescent bg-clip-text text-transparent">
              Friday Prayer
            </h3>
            <p className="text-sm text-muted-foreground" dir="rtl">جمعة مبارک</p>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-6 p-4 rounded-2xl bg-gradient-to-r from-islamic-gold/10 to-islamic-crescent/10 border-2 border-islamic-gold/30">
              <div className="text-center font-bold text-lg">Jumah</div>
              <div className="text-center font-mono text-xl font-bold">{jumahTime.azanTime}</div>
              <div className="text-center font-mono text-xl font-bold">{jumahTime.jamaatTime}</div>
              <div className="text-center font-bold text-lg" dir="rtl">الجمعة</div>
            </div>
            <div className="grid grid-cols-4 gap-6 p-4 rounded-2xl bg-gradient-to-r from-islamic-crescent/10 to-islamic-gold/10 border-2 border-islamic-crescent/30">
              <div className="text-center font-bold text-lg">Khutbah</div>
              <div className="text-center font-mono text-xl font-bold">{khutbahTime}</div>
              <div className="text-center text-muted-foreground">-</div>
              <div className="text-center font-bold text-lg" dir="rtl">خطبة</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};