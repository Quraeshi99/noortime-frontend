import { Moon, Sun, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border shadow-lg">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="lg"
            onClick={onToggleDarkMode}
            className="flex flex-col items-center gap-1 hover:bg-primary/10 transition-all duration-300"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-primary" />
            ) : (
              <Moon className="h-5 w-5 text-primary" />
            )}
            <span className="text-xs text-muted-foreground">
              {isDarkMode ? "Light" : "Dark"}
            </span>
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="lg"
            onClick={onOpenSettings}
            className="flex flex-col items-center gap-1 hover:bg-primary/10 transition-all duration-300"
          >
            <Settings className="h-5 w-5 text-primary" />
            <span className="text-xs text-muted-foreground">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
