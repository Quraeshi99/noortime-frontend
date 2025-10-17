import { useEffect, useState } from 'react';

interface AnalogClockProps {
  islamicDate?: string;
  englishDate?: string;
}

export const AnalogClock = ({ islamicDate, englishDate }: AnalogClockProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = (hours * 30) + (minutes * 0.5);
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;

  const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="relative w-full">
      {/* Clock Container */}
      <div className="relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
          {/* Outer Decorative Ring */}
          <circle
            cx="100"
            cy="100"
            r="98"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2"
          />
          
          {/* Main Clock Face */}
          <circle
            cx="100"
            cy="100"
            r="92"
            fill="hsl(var(--card))"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
          />
          
          {/* Inner Shadow Circle */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="1"
          />

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--islamic-gold))" />
              <stop offset="50%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--islamic-crescent))" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>

          {/* Hour Numbers */}
          {hourNumbers.map((num, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x = 100 + 70 * Math.cos(angle);
            const y = 100 + 70 * Math.sin(angle);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="hsl(var(--primary))"
                fontSize="14"
                fontWeight="bold"
                className="font-mono"
              >
                {num}
              </text>
            );
          })}

          {/* Hour Markers (Small dots between numbers) */}
          {[...Array(60)].map((_, i) => {
            if (i % 5 !== 0) { // Skip positions where numbers are
              const angle = (i * 6 - 90) * (Math.PI / 180);
              const x = 100 + 82 * Math.cos(angle);
              const y = 100 + 82 * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="1"
                  fill="hsl(var(--muted-foreground))"
                  opacity="0.5"
                />
              );
            }
            return null;
          })}

          {/* Hour Hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="55"
            stroke="url(#gradient2)"
            strokeWidth="5"
            strokeLinecap="round"
            transform={`rotate(${hourDegrees} 100 100)`}
          />

          {/* Minute Hand */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            stroke="hsl(var(--accent))"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${minuteDegrees} 100 100)`}
          />

          {/* Second Hand */}
          <line
            x1="100"
            y1="105"
            x2="100"
            y2="28"
            stroke="hsl(var(--islamic-gold))"
            strokeWidth="2"
            strokeLinecap="round"
            transform={`rotate(${secondDegrees} 100 100)`}
          />

          {/* Center Circle */}
          <circle
            cx="100"
            cy="100"
            r="6"
            fill="hsl(var(--primary))"
            stroke="hsl(var(--background))"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Date Display Below Clock */}
      <div className="mt-2 space-y-1">
        {englishDate && (
          <div className="text-center px-2 py-0.5 bg-primary/10 rounded border border-primary/30">
            <p className="text-[7px] text-muted-foreground font-medium">English</p>
            <p className="text-[8px] font-bold text-foreground leading-tight">
              {englishDate}
            </p>
          </div>
        )}
        {islamicDate && (
          <div className="text-center px-2 py-0.5 bg-islamic-gold/10 rounded border border-islamic-gold/30">
            <p className="text-[7px] text-muted-foreground font-medium">Islamic</p>
            <p className="text-[8px] font-bold text-islamic-crescent leading-tight">
              {islamicDate}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};