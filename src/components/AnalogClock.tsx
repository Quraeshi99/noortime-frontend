import { useEffect, useState } from 'react';

export const AnalogClock = () => {
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

  return (
    <div className="relative w-16 h-16 mx-auto">
      {/* Clock Face */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer Circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="hsl(var(--primary) / 0.1)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Hour Markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = 50 + 40 * Math.cos(angle);
          const y1 = 50 + 40 * Math.sin(angle);
          const x2 = 50 + 44 * Math.cos(angle);
          const y2 = 50 + 44 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--primary))"
              strokeWidth={i % 3 === 0 ? "2" : "1.5"}
              opacity={i % 3 === 0 ? "1" : "0.6"}
            />
          );
        })}

        {/* Hour Hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${hourDegrees} 50 50)`}
        />

        {/* Minute Hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="hsl(var(--accent))"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${minuteDegrees} 50 50)`}
        />

        {/* Second Hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="hsl(var(--islamic-gold))"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${secondDegrees} 50 50)`}
        />

        {/* Center Dot */}
        <circle
          cx="50"
          cy="50"
          r="3"
          fill="hsl(var(--primary))"
        />
      </svg>
    </div>
  );
};
