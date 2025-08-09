import { Card } from "@/components/ui/card";

interface AdditionalTime {
  name: string;
  time: string;
  arabicName?: string;
}

interface AdditionalTimesProps {
  englishDate: string;
  islamicDate: string;
  otherTimes: AdditionalTime[];
}

export const AdditionalTimes = ({ englishDate, islamicDate, otherTimes }: AdditionalTimesProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Date Information */}
      <div className="space-y-4">
        {/* English Date */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary border-2 shadow-lg">
          <h3 className="text-lg font-semibold text-center mb-3 text-foreground">English Date</h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{englishDate}</div>
            <div className="text-sm text-muted-foreground">Gregorian Calendar</div>
          </div>
        </Card>

        {/* Islamic Date */}
        <Card className="p-6 bg-gradient-to-br from-islamic-gold/20 to-islamic-crescent/20 border-2 border-islamic-gold/30 shadow-lg">
          <h3 className="text-lg font-semibold text-center mb-3 text-foreground">Islamic Date</h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-islamic-crescent mb-1">{islamicDate}</div>
            <div className="text-sm text-muted-foreground">Hijri Calendar</div>
          </div>
        </Card>
      </div>

      {/* Other Important Times */}
      <Card className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 border-2 shadow-lg">
        <h3 className="text-lg font-semibold text-center mb-4 text-foreground">Other Times</h3>
        
        <div className="space-y-3">
          {otherTimes.map((time, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-lg bg-background/50 hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="font-medium text-foreground">{time.name}</div>
              <div className="font-mono font-semibold text-primary">{time.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
