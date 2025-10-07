import { useState } from "react";
import { 
  User, 
  Clock, 
  LogOut, 
  Bell, 
  Volume2,
  MapPin,
  X,
  Edit3,
  Shield,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { ProfileModal } from "@/components/profile/ProfileModal";
import { useToast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewType = 'main';

export const SettingsPanel = ({
  isOpen,
  onClose,
}: SettingsPanelProps) => {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'signup'>('login');
  
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      onClose();
    }
  };


  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
      />
      
        {/* Settings Panel */}
        <div className={`fixed left-0 top-0 h-full w-[85%] sm:w-[60%] md:w-[45%] lg:w-[400px] bg-background border-r shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-2xl font-bold text-foreground">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6">
          {currentView === 'main' && (
            <div className="space-y-3 sm:space-y-6">
              {/* User Profile Section */}
              {user ? (
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <Avatar className="h-7 w-7 sm:h-10 sm:w-10 ring-2 ring-primary/20 flex-shrink-0">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground text-xs truncate">
                        {user.user_metadata?.full_name || 'User'}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsProfileModalOpen(true)}
                      className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={handleLogout}
                      disabled={loading}
                      className="h-6 w-6 sm:h-8 sm:w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                    >
                      <LogOut className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-2 sm:p-4">
                  <div className="space-y-2">
                    <div className="mx-auto w-7 h-7 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs">Welcome!</h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Sign in to your account</p>
                    </div>
                    <Button 
                      className="w-full h-7 sm:h-9 text-xs"
                      onClick={() => {
                        setAuthModalView('login');
                        setIsAuthModalOpen(true);
                      }}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              )}

              {user && (
                <>
                  <Separator />

                  {/* Prayer Time Settings */}
                  <div className="space-y-2 sm:space-y-4">
                    <h3 className="text-sm sm:text-lg font-semibold flex items-center gap-2">
                      <Clock className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
                      Prayer Settings
                    </h3>
                    
                    <div className="space-y-2 sm:space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <Label htmlFor="notifications" className="font-medium text-[10px] sm:text-sm">Notifications</Label>
                          <p className="text-[9px] sm:text-xs text-muted-foreground">Prayer alerts</p>
                        </div>
                        <Switch
                          id="notifications"
                          checked={notifications}
                          onCheckedChange={setNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <Label htmlFor="sound" className="font-medium text-[10px] sm:text-sm">Sound</Label>
                          <p className="text-[9px] sm:text-xs text-muted-foreground">Azan audio</p>
                        </div>
                        <Switch
                          id="sound"
                          checked={sound}
                          onCheckedChange={setSound}
                        />
                      </div>

                      <Button variant="outline" className="w-full justify-start h-7 sm:h-10 text-[10px] sm:text-sm">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Location
                      </Button>
                    </div>
                  </div>

                  <Separator />
                </>
              )}


              {user && (
                <>
                  <Separator />

                  {/* Additional Settings */}
                  <div className="space-y-2 sm:space-y-4">
                    <h3 className="text-sm sm:text-lg font-semibold">More</h3>
                    
                    <div className="space-y-1 sm:space-y-3">
                      <Button variant="outline" className="w-full justify-start h-7 sm:h-10 text-[10px] sm:text-sm">
                        <Bell className="h-3 w-3 mr-1 sm:mr-2" />
                        Notifications
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start h-7 sm:h-10 text-[10px] sm:text-sm">
                        <Volume2 className="h-3 w-3 mr-1 sm:mr-2" />
                        Sounds
                      </Button>
                    </div>
                  </div>

                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        initialView="profile"
      />
    </>
  );
};