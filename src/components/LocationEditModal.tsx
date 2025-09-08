import { useState } from "react";
import { Search, MapPin, Building2, X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LocationEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (location: any) => void;
}

export const LocationEditModal = ({ isOpen, onClose, onSave }: LocationEditModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  
  // Mock data - ye backend API se ayega
  const mockMosques = [
    {
      id: 1,
      name: "Masjid Al-Noor",
      address: "Sector 15, Karachi, Pakistan",
      code: "MAN001",
      city: "Karachi",
      type: "mosque"
    },
    {
      id: 2,
      name: "Masjid Al-Haram",
      address: "DHA Phase 2, Karachi, Pakistan", 
      code: "MAH002",
      city: "Karachi",
      type: "mosque"
    }
  ];

  const mockCities = [
    {
      id: 1,
      name: "Karachi",
      address: "Sindh, Pakistan",
      type: "city"
    },
    {
      id: 2,
      name: "Lahore", 
      address: "Punjab, Pakistan",
      type: "city"
    }
  ];

  const filteredMosques = mockMosques.filter(mosque => 
    mosque.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mosque.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCities = mockCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    if (selectedLocation) {
      onSave(selectedLocation);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-islamic-crescent" />
            Change Location
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search mosque by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs for Mosque vs Individual */}
          <Tabs defaultValue="mosque" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mosque" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Mosque</span>
              </TabsTrigger>
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Individual</span>
              </TabsTrigger>
            </TabsList>

            {/* Mosque Tab */}
            <TabsContent value="mosque" className="space-y-2 max-h-60 overflow-y-auto">
              {filteredMosques.length > 0 ? (
                filteredMosques.map((mosque) => (
                  <Card
                    key={mosque.id}
                    className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                      selectedLocation?.id === mosque.id
                        ? 'border-islamic-gold bg-islamic-gold/5'
                        : 'hover:border-islamic-gold/50'
                    }`}
                    onClick={() => setSelectedLocation(mosque)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="h-4 w-4 text-islamic-crescent" />
                          <h4 className="font-medium text-sm">{mosque.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {mosque.code}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{mosque.address}</p>
                      </div>
                      {selectedLocation?.id === mosque.id && (
                        <Check className="h-4 w-4 text-islamic-gold" />
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No mosques found</p>
              )}
            </TabsContent>

            {/* Individual Tab */}
            <TabsContent value="individual" className="space-y-2 max-h-60 overflow-y-auto">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <Card
                    key={city.id}
                    className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                      selectedLocation?.id === city.id
                        ? 'border-accent bg-accent/5'
                        : 'hover:border-accent/50'
                    }`}
                    onClick={() => setSelectedLocation(city)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-accent" />
                          <h4 className="font-medium text-sm">{city.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{city.address}</p>
                      </div>
                      {selectedLocation?.id === city.id && (
                        <Check className="h-4 w-4 text-accent" />
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No cities found</p>
              )}
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!selectedLocation}
              className="flex-1"
            >
              <Check className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};