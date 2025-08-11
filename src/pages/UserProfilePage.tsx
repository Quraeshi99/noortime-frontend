import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfileForm } from "@/components/profile/UserProfileForm";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";

interface UserProfilePageProps {
  onBack: () => void;
}

type ProfileViewType = 'profile' | 'change-password';

export const UserProfilePage = ({ onBack }: UserProfilePageProps) => {
  const [currentView, setCurrentView] = useState<ProfileViewType>('profile');

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
            {currentView === 'profile' && 'My Profile'}
            {currentView === 'change-password' && 'Change Password'}
          </h1>
        </div>

        {/* Profile Forms */}
        <div className="bg-card shadow-2xl rounded-2xl border p-8">
          {currentView === 'profile' && (
            <UserProfileForm
              onBack={onBack}
              onChangePassword={() => setCurrentView('change-password')}
            />
          )}

          {currentView === 'change-password' && (
            <ChangePasswordForm
              onBack={() => setCurrentView('profile')}
            />
          )}
        </div>
      </div>
    </div>
  );
};