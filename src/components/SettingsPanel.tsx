import { useState } from "react";
import { 
  User, 
  Clock, 
  LogOut, 
  Moon, 
  Sun, 
  Bell, 
  Volume2,
  MapPin,
  X,
  Edit3,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { UserProfileForm } from "@/components/profile/UserProfileForm";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { useToast } from "@/components/ui/use-toast";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

type ViewType = 'main' | 'login' | 'signup' | 'forgot-password' | 'user-profile' | 'change-password';

export const SettingsPanel = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
}: SettingsPanelProps) => {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('main');
  
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

  const resetToMain = () => {
    setCurrentView('main');
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
      <div className={`fixed left-0 top-0 h-full w-[45%] bg-background border-r shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
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
        <div className="flex-1 overflow-y-auto p-6">
          {currentView === 'main' && (
            <div className="space-y-6">
              {/* User Profile Section */}
              {user ? (
                <Card className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {user.user_metadata?.full_name || 'User'}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCurrentView('user-profile')}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="p-6 text-center">
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Welcome!</h3>
                      <p className="text-sm text-muted-foreground">Sign in to access your account</p>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => setCurrentView('login')}
                      >
                        Sign In
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setCurrentView('signup')}
                      >
                        Create Account
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {user && (
                <>
                  <Separator />

                  {/* Prayer Time Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Prayer Time Settings
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notifications" className="font-medium">Prayer Notifications</Label>
                          <p className="text-sm text-muted-foreground">Get notified before prayer times</p>
                        </div>
                        <Switch
                          id="notifications"
                          checked={notifications}
                          onCheckedChange={setNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sound" className="font-medium">Azan Sound</Label>
                          <p className="text-sm text-muted-foreground">Play azan audio</p>
                        </div>
                        <Switch
                          id="sound"
                          checked={sound}
                          onCheckedChange={setSound}
                        />
                      </div>

                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="h-4 w-4 mr-2" />
                        Change Location
                      </Button>
                    </div>
                  </div>

                  <Separator />
                </>
              )}

              {/* Theme Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Appearance</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isDarkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                    <div>
                      <Label htmlFor="darkmode" className="font-medium">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Switch between themes</p>
                    </div>
                  </div>
                  <Switch
                    id="darkmode"
                    checked={isDarkMode}
                    onCheckedChange={onToggleDarkMode}
                  />
                </div>
              </div>

              {user && (
                <>
                  <Separator />

                  {/* Additional Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">More Options</h3>
                    
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="h-4 w-4 mr-2" />
                        Notification Settings
                      </Button>
                      
                      <Button variant="outline" className="w-full justify-start">
                        <Volume2 className="h-4 w-4 mr-2" />
                        Sound Settings
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Logout Button */}
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {loading ? "Logging out..." : "Logout"}
                  </Button>
                </>
              )}
            </div>
          )}

          {currentView === 'login' && (
            <LoginForm
              onBack={resetToMain}
              onSwitchToSignup={() => setCurrentView('signup')}
              onForgotPassword={() => setCurrentView('forgot-password')}
            />
          )}

          {currentView === 'signup' && (
            <SignupForm
              onBack={resetToMain}
              onSwitchToLogin={() => setCurrentView('login')}
            />
          )}

          {currentView === 'forgot-password' && (
            <ForgotPasswordForm
              onBack={() => setCurrentView('login')}
            />
          )}

          {currentView === 'user-profile' && (
            <UserProfileForm
              onBack={resetToMain}
              onChangePassword={() => setCurrentView('change-password')}
            />
          )}

          {currentView === 'change-password' && (
            <ChangePasswordForm
              onBack={() => setCurrentView('user-profile')}
            />
          )}
        </div>
      </div>
    </>
  );
};