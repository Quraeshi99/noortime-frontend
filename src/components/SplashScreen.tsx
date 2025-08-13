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
      }, 500); // Wait for fade-out animation
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center space-y-6 animate-pulse">
        <div className="relative flex justify-center">
          <img 
            src="/lovable-uploads/39329f85-045b-48c6-88b3-a2d925d41463.png" 
            alt="Noor Time" 
            className="w-24 h-24 md:w-32 md:h-32 rounded-3xl shadow-2xl animate-bounce"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Noor Time
          </h1>
          <p className="text-muted-foreground text-sm">Prayer Times & Islamic Calendar</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
};