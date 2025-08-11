import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

interface AuthPageProps {
  onBack: () => void;
  initialView?: 'login' | 'signup';
}

type AuthViewType = 'login' | 'signup' | 'forgot-password';

export const AuthPage = ({ onBack, initialView = 'login' }: AuthPageProps) => {
  const [currentView, setCurrentView] = useState<AuthViewType>(initialView);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {currentView === 'login' && 'Welcome Back'}
            {currentView === 'signup' && 'Join Us Today'}
            {currentView === 'forgot-password' && 'Reset Password'}
          </h1>
        </div>

        {/* Auth Forms */}
        <div className="bg-card shadow-2xl rounded-2xl border p-8">
          {currentView === 'login' && (
            <LoginForm
              onBack={onBack}
              onSwitchToSignup={() => setCurrentView('signup')}
              onForgotPassword={() => setCurrentView('forgot-password')}
            />
          )}

          {currentView === 'signup' && (
            <SignupForm
              onBack={onBack}
              onSwitchToLogin={() => setCurrentView('login')}
            />
          )}

          {currentView === 'forgot-password' && (
            <ForgotPasswordForm
              onBack={() => setCurrentView('login')}
            />
          )}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>For testing purposes:</p>
          <p>Email: test@test.com, Password: 123456</p>
        </div>
      </div>
    </div>
  );
};