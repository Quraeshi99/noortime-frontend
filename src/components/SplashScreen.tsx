import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 300); // Reduced wait time
    }, 1500); // Reduced splash time to 1.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center space-y-8 px-4">
        {/* Full Screen Logo */}
        <div className="relative flex justify-center animate-bounce">
          <div className="w-40 h-40 md:w-56 md:h-56 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl">
            <div className="text-6xl md:text-8xl">🕌</div>
          </div>
        </div>
        
        {/* App Name */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Noor Time
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium tracking-wide">
            Prayer Times & Islamic Calendar
          </p>
        </div>
        
        {/* Loading Animation */}
        <div className="flex justify-center pt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-white/30 border-t-white"></div>
        </div>
      </div>
    </div>
  );
};