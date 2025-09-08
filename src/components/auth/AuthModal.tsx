import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModernLoginForm } from "./ModernLoginForm";
import { ModernSignupForm } from "./ModernSignupForm";
import { ModernForgotPasswordForm } from "./ModernForgotPasswordForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup' | 'forgot-password';
}

type AuthView = 'login' | 'signup' | 'forgot-password';

export const AuthModal = ({ isOpen, onClose, initialView = 'login' }: AuthModalProps) => {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);

  if (!isOpen) return null;

  const handleAuthSuccess = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg mx-4 bg-background rounded-2xl shadow-2xl border">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Auth Content */}
        <div className="p-8">
          {currentView === 'login' && (
            <ModernLoginForm
              onSwitchToSignup={() => setCurrentView('signup')}
              onForgotPassword={() => setCurrentView('forgot-password')}
              onSuccess={handleAuthSuccess}
            />
          )}
          
          {currentView === 'signup' && (
            <ModernSignupForm
              onSwitchToLogin={() => setCurrentView('login')}
              onSuccess={handleAuthSuccess}
            />
          )}
          
          {currentView === 'forgot-password' && (
            <ModernForgotPasswordForm
              onBackToLogin={() => setCurrentView('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
};