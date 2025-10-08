import { User, Clock, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProfileModal } from "./profile/ProfileModal";

interface AppFooterProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSettings: () => void;
}

export const AppFooter = ({
  isDarkMode,
  onToggleDarkMode,
  onOpenSettings,
}: AppFooterProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleQiblaClick = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2000);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Gradient Background matching app theme */}
        <div className={`relative backdrop-blur-xl border-t ${
          isDarkMode 
            ? 'bg-gradient-to-t from-gray-900/95 via-gray-800/90 to-gray-900/80 border-gray-700/50' 
            : 'bg-gradient-to-t from-white/95 via-gray-50/90 to-white/80 border-gray-200/50'
        } shadow-[0_-4px_20px_rgba(0,0,0,0.1)]`}>
          <div className="max-w-md mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Profile Button */}
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsProfileOpen(true)}
                className={`flex flex-col items-center gap-1.5 min-w-[70px] rounded-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'hover:bg-emerald-500/10 active:bg-emerald-500/20' 
                    : 'hover:bg-emerald-600/10 active:bg-emerald-600/20'
                }`}
              >
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-emerald-600/20 text-emerald-600'
                }`}>
                  <User className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Profile
                </span>
              </Button>

              {/* Prayer Times Button */}
              <Button
                variant="ghost"
                size="lg"
                onClick={onOpenSettings}
                className={`flex flex-col items-center gap-1.5 min-w-[70px] rounded-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'hover:bg-emerald-500/10 active:bg-emerald-500/20' 
                    : 'hover:bg-emerald-600/10 active:bg-emerald-600/20'
                }`}
              >
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-emerald-600/20 text-emerald-600'
                }`}>
                  <Clock className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Times
                </span>
              </Button>

              {/* Qibla Compass Button - Center/Featured */}
              <Button
                variant="ghost"
                size="lg"
                onClick={handleQiblaClick}
                className={`relative flex flex-col items-center gap-1.5 min-w-[80px] rounded-2xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'hover:bg-emerald-500/10 active:bg-emerald-500/20' 
                    : 'hover:bg-emerald-600/10 active:bg-emerald-600/20'
                }`}
              >
                <div className={`p-3 rounded-full transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-emerald-500/30 to-teal-500/30 text-emerald-300 shadow-lg shadow-emerald-500/20' 
                    : 'bg-gradient-to-br from-emerald-600/30 to-teal-600/30 text-emerald-700 shadow-lg shadow-emerald-600/20'
                }`}>
                  <Compass className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Qibla
                </span>
                {showComingSoon && (
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                    isDarkMode 
                      ? 'bg-gray-800 text-gray-200 border border-gray-700' 
                      : 'bg-white text-gray-700 border border-gray-200 shadow-md'
                  }`}>
                    Coming Soon
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
};
