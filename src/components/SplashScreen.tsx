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
    }, 2000); // 2 seconds splash time

    return () => {
      console.log('SplashScreen cleanup');
      clearTimeout(timer);
    };
  }, [handleComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-background via-card to-secondary flex items-center justify-center transition-opacity duration-500 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="text-center space-y-8 px-4 max-w-md mx-auto">
        {/* Logo Image - Full Size */}
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/ae0e0c9a-71d5-4a74-9acd-2476254d6481.png" 
            alt="Noor Time - Prayer Time & Islamic Calendar" 
            className="w-80 h-auto md:w-96 max-w-full object-contain animate-fade-in"
          />
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center pt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
};