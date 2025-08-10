import { useState } from "react";
import { 
  User, 
  Clock, 
  Palette, 
  LogOut, 
  Moon, 
  Sun, 
  Bell, 
  Volume2,
  MapPin,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const SettingsPanel = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
}: SettingsPanelProps) => {
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);

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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* User Profile Section */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                  U
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-foreground">User Name</h3>
                <p className="text-muted-foreground">user@example.com</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>

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

              <Button variant="outline" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Change Location
              </Button>
            </div>
          </div>

          <Separator />

          {/* Theme & Display Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Theme & Display
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkmode" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                </div>
                <Switch
                  id="darkmode"
                  checked={isDarkMode}
                  onCheckedChange={onToggleDarkMode}
                />
              </div>

              <Card className="p-4 bg-gradient-to-r from-islamic-gold/20 to-islamic-crescent/20 border border-islamic-gold/30">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon className="h-5 w-5 text-islamic-crescent" /> : <Sun className="h-5 w-5 text-islamic-gold" />}
                  <div>
                    <p className="font-medium">{isDarkMode ? 'Dark' : 'Light'} Theme Active</p>
                    <p className="text-sm text-muted-foreground">Perfect for {isDarkMode ? 'night' : 'day'} prayers</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

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
            size="lg"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};