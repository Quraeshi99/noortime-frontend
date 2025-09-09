import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserProfileForm } from "./UserProfileForm";
import { ChangePasswordForm } from "./ChangePasswordForm";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'profile' | 'change-password';
}

type ProfileView = 'profile' | 'change-password';

export const ProfileModal = ({ isOpen, onClose, initialView = 'profile' }: ProfileModalProps) => {
  const [currentView, setCurrentView] = useState<ProfileView>(initialView);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl mx-4 bg-background rounded-2xl shadow-2xl border max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full hover:bg-muted"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[90vh]">
          {currentView === 'profile' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold">My Profile</h2>
                <p className="text-muted-foreground">Manage your account settings</p>
              </div>
              <UserProfileForm
                onBack={onClose}
                onChangePassword={() => setCurrentView('change-password')}
              />
            </div>
          )}
          
          {currentView === 'change-password' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentView('profile')}
                  className="rounded-full"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h2 className="text-2xl font-bold">Change Password</h2>
                  <p className="text-muted-foreground">Update your account password</p>
                </div>
              </div>
              <ChangePasswordForm
                onBack={() => setCurrentView('profile')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};