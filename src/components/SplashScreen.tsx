import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log('SplashScreen mounted');
    
    const timer = setTimeout(() => {
      console.log('Starting fade out');
      setIsVisible(false);
      
      setTimeout(() => {
        console.log('Calling onComplete');
        onComplete();
      }, 300);
    }, 2000); // 2 seconds splash time

    return () => {
      console.log('SplashScreen cleanup');
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center space-y-6">
        {/* Full Screen Logo - Much Larger */}
        <div className="relative flex justify-center">
          <img 
            src="/lovable-uploads/39329f85-045b-48c6-88b3-a2d925d41463.png" 
            alt="Noor Time" 
            className="w-72 h-72 md:w-96 md:h-96 rounded-3xl shadow-2xl animate-bounce object-cover"
            onLoad={() => console.log('Logo loaded successfully')}
            onError={() => console.log('Logo failed to load')}
          />
        </div>
        
        {/* App Info */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Noor Time
          </h1>
          <p className="text-muted-foreground text-lg">Prayer Times & Islamic Calendar</p>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center pt-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
};