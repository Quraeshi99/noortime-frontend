import { useEffect, useState, useCallback } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = useCallback(() => {
    console.log('Calling onComplete');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    console.log('SplashScreen mounted');
    
    const timer = setTimeout(() => {
      console.log('Starting fade out');
      setIsVisible(false);
      
      setTimeout(handleComplete, 300);
    }, 1500); // 1.5 seconds splash time

    return () => {
      console.log('SplashScreen cleanup');
      clearTimeout(timer);
    };
  }, [handleComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center space-y-8">
        {/* Professional Watch/Clock */}
        <div className="relative flex justify-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-8 border-primary bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center animate-pulse shadow-2xl">
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              {/* Clock Face */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30">
                {/* Clock Numbers */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-primary">12</div>
                <div className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-primary">3</div>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-primary">6</div>
                <div className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs font-bold text-primary">9</div>
                
                {/* Clock Hands */}
                <div className="absolute top-1/2 left-1/2 w-1 h-6 bg-primary transform -translate-x-1/2 -translate-y-full origin-bottom animate-spin" style={{animationDuration: '12s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-accent transform -translate-x-1/2 -translate-y-full origin-bottom animate-spin" style={{animationDuration: '1s'}}></div>
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* App Info */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Noor Time
          </h1>
          <p className="text-muted-foreground text-xl">Prayer Times & Islamic Calendar</p>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center pt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-primary border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
};