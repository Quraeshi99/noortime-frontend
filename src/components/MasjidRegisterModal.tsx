import { useState } from "react";
import { Building2, Save, X, MapPin, UploadCloud, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface MasjidRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MasjidRegisterModal = ({ isOpen, onClose }: MasjidRegisterModalProps) => {
  const { toast } = useToast();
  
  const [officialName, setOfficialName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India"); // Default standard
  const [latitude, setLatitude] = useState("28.6139");
  const [longitude, setLongitude] = useState("77.2090");
  const [exteriorUrl, setExteriorUrl] = useState("https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600");
  const [interiorUrl, setInteriorUrl] = useState("https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_BASE_URL}/masjids/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          official_name: officialName,
          address_line_1: address,
          city,
          state,
          postal_code: postalCode,
          country,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          exterior_photo_url: exteriorUrl,
          interior_photo_url: interiorUrl
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.detail || "Failed to submit registration application");
      }

      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Your masjid verification request is pending backend admin review.",
      });
    } catch (err: any) {
      toast({
        title: "Registration Error",
        description: err.message || "Network timeout connecting to server.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-4 border-b bg-gradient-to-r from-islamic-gold/15 to-islamic-crescent/15">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Building2 className="h-5 w-5 text-islamic-gold" />
            Register Your Masjid
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
            <h3 className="text-lg font-bold">Alhamdulillah!</h3>
            <p className="text-xs text-muted-foreground">
              Your application for <span className="font-semibold text-foreground">{officialName}</span> has been received successfully. Our admins will verify and onboard your master timings shortly.
            </p>
            <Button onClick={handleReset} className="mt-4 bg-islamic-gold text-white text-xs h-8">
              Back to Main Menu
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="space-y-1">
              <Label htmlFor="reg_name" className="text-xs font-semibold">Official Masjid Name *</Label>
              <Input
                id="reg_name"
                value={officialName}
                onChange={(e) => setOfficialName(e.target.value)}
                placeholder="e.g. Jama Masjid Al-Noor"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="reg_addr" className="text-xs font-semibold">Address Line 1 *</Label>
              <Input
                id="reg_addr"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address / locality"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="reg_city" className="text-xs font-semibold">City *</Label>
                <Input
                  id="reg_city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="reg_state" className="text-xs font-semibold">State *</Label>
                <Input
                  id="reg_state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="reg_zip" className="text-xs font-semibold">Postal Code *</Label>
                <Input
                  id="reg_zip"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="PIN code"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="reg_country" className="text-xs font-semibold">Country *</Label>
                <Input
                  id="reg_country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="reg_lat" className="text-xs font-semibold">Latitude *</Label>
                <Input
                  id="reg_lat"
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="reg_lng" className="text-xs font-semibold">Longitude *</Label>
                <Input
                  id="reg_lng"
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <Label className="text-xs font-semibold flex items-center gap-1">
                <UploadCloud className="h-3 w-3 text-muted-foreground" />
                Exterior Photo URL *
              </Label>
              <Input
                type="url"
                value={exteriorUrl}
                onChange={(e) => setExteriorUrl(e.target.value)}
                placeholder="https://..."
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold flex items-center gap-1">
                <UploadCloud className="h-3 w-3 text-muted-foreground" />
                Interior Photo URL *
              </Label>
              <Input
                type="url"
                value={interiorUrl}
                onChange={(e) => setInteriorUrl(e.target.value)}
                placeholder="https://..."
                required
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t mt-4">
              <Button type="button" variant="outline" onClick={onClose} className="h-8 text-xs">
                <X className="h-3.5 w-3.5 mr-1" />
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="h-8 text-xs bg-islamic-gold text-white hover:bg-islamic-gold/90">
                <Save className="h-3.5 w-3.5 mr-1" />
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
