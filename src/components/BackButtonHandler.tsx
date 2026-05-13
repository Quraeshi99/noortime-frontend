import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';

export const BackButtonHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = () => {
      if (location.pathname === '/' || location.pathname === '') {
        // If on the home page, exit the app
        CapacitorApp.exitApp();
      } else {
        // Otherwise, go back one page in history
        navigate(-1);
      }
    };

    // Add event listener for hardware back button
    const backButtonListener = CapacitorApp.addListener('backButton', handleBackButton);

    // Cleanup the listener when the component unmounts
    return () => {
      backButtonListener.then((listener) => listener.remove());
    };
  }, [navigate, location]);

  // This component doesn't render anything
  return null;
};
