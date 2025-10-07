import { MapPin, Edit3, Building2, Map } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface LocationCardProps {
  onEditLocation: () => void;
}

export const LocationCard = ({ onEditLocation }: LocationCardProps) => {
  // Mock data - ye backend se ayega
  const [userLocation] = useState({
    type: 'mosque', // 'mosque' or 'individual'
    name: 'Masjid Al-Noor',
    address: 'Sector 15, Karachi, Pakistan',
    code: 'MAN001',
    city: 'Karachi'
  });

  const isMosqueConnected = userLocation.type === 'mosque';

  return (
    <Card className="relative overflow-hidden glass-light shadow-md">
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
                  {isMosqueConnected ? userLocation.name : userLocation.city}
                </h3>
                
                {isMosqueConnected && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-1.5 py-0.5 bg-islamic-gold/10 text-islamic-crescent border-islamic-gold/30"
                  >
                    {userLocation.code}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{userLocation.address}</span>
            </div>
            
            {!isMosqueConnected && (
              <p className="text-xs text-accent mt-1">Individual User</p>
            )}
          </div>

          {/* Edit Button with Neumorphism */}
          <Button
            variant="neu"
            size="icon"
            onClick={onEditLocation}
            className="h-8 w-8 rounded-full flex-shrink-0"
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
            : 'bg-accent'
        }`} />
      </div>
    </Card>
  );
};