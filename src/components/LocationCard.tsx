import { MapPin, Edit3, Building2, Map } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

interface LocationCardProps {
  onEditLocation: () => void;
}

export const LocationCard = ({ onEditLocation }: LocationCardProps) => {
  const defaultMasjid = useLiveQuery(
    () => db.masjids.where('is_default').equals(1).first() ?? db.masjids.orderBy('id').first()
  );

  const isMosqueConnected = defaultMasjid !== undefined;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-islamic-crescent/5 via-primary/5 to-islamic-gold/5 border border-islamic-gold/20 shadow-sm">
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          {/* Location Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {isMosqueConnected ? (
                <Building2 className="h-4 w-4 text-islamic-crescent flex-shrink-0" />
              ) : (
                <Map className="h-4 w-4 text-accent flex-shrink-0" />
              )}
              
              <div className="flex items-center gap-2 min-w-0">
                <h3 className="font-medium text-sm text-foreground truncate">
                  {isMosqueConnected ? defaultMasjid.name : "Select City / Mosque"}
                </h3>
                
                {isMosqueConnected && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-1.5 py-0.5 bg-islamic-gold/10 text-islamic-crescent border-islamic-gold/30"
                  >
                    M#{defaultMasjid.id}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">
                {isMosqueConnected 
                  ? (defaultMasjid.address || defaultMasjid.city || "Connected to Master Timing") 
                  : "Tap edit to search location"}
              </span>
            </div>
            
            {!isMosqueConnected && (
              <p className="text-xs text-accent mt-1">Guest Mode Fallback</p>
            )}
          </div>

          {/* Edit Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onEditLocation}
            className="h-7 w-7 rounded-md hover:bg-islamic-gold/10 hover:text-islamic-crescent transition-colors flex-shrink-0"
            title="Change Location"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      {/* Connection Status Indicator */}
      <div className="absolute top-1 right-1">
        <div className={`w-2 h-2 rounded-full ${
          isMosqueConnected 
            ? 'bg-islamic-gold shadow-glow' 
            : 'bg-accent animate-pulse'
        }`} />
      </div>
    </Card>
  );
};