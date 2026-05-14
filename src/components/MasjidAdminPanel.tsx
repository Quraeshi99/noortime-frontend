import { useState, useEffect } from "react";
import { Building2, Save, X, Phone, Mail, Globe, Users, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface MasjidAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MasjidAdminPanel = ({ isOpen, onClose }: MasjidAdminPanelProps) => {
  const { toast } = useToast();
  const defaultMasjid = useLiveQuery(
    () => db.masjids.where('is_default').equals(1).first() ?? db.masjids.orderBy('id').first()
  );

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [capacity, setCapacity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [asrJuristic, setAsrJuristic] = useState("Hanafi");
  const [loading, setLoading] = useState(false);

  // Sync state when loaded
  useEffect(() => {
    if (defaultMasjid) {
      setName(defaultMasjid.name || "");
      setAddress(defaultMasjid.address || "");
      setCity(defaultMasjid.city || "");
      setCapacity(String((defaultMasjid as any).capacity || 500));
      setPhone((defaultMasjid as any).phone_number || "");
      setEmail((defaultMasjid as any).email || "");
      setWebsite((defaultMasjid as any).website_url || "");
      setAsrJuristic((defaultMasjid as any).settings?.asr_juristic || "Hanafi");
    }
  }, [defaultMasjid]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!defaultMasjid) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      // If server supports update endpoint PUT/PATCH /masjids/{id}
      if (token && defaultMasjid.id) {
        await fetch(`${API_BASE_URL}/masjids/${defaultMasjid.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name,
            address_line_1: address,
            city,
            capacity: capacity ? parseInt(capacity) : null,
            phone_number: phone || null,
            email: email || null,
            website_url: website || null,
            settings: {
              method_id: 1, // Standard default
              asr_juristic: asrJuristic,
              hijri_offset: 0
            }
          })
        }).catch(() => {}); // silent fail offline
      }

      // Update offline cache DB atomically
      await db.masjids.update(defaultMasjid.id, {
        name,
        address,
        city,
        capacity: capacity ? parseInt(capacity) : 500,
        phone_number: phone,
        email,
        website_url: website,
        settings: {
          ...(defaultMasjid as any).settings,
          asr_juristic: asrJuristic
        }
      } as any);

      toast({
        title: "Masjid Profile Updated",
        description: "Settings applied successfully.",
      });
      onClose();
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message || "Could not save settings.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-4 border-b bg-gradient-to-r from-islamic-gold/10 to-islamic-crescent/10">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Building2 className="h-5 w-5 text-islamic-gold" />
            Masjid Profile & Admin Panel
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-4 space-y-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="fiqh">Fiqh / Timings</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="m_name" className="text-xs font-semibold">Masjid Name</Label>
                <Input
                  id="m_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Masjid Al-Noor"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="m_addr" className="text-xs font-semibold">Street Address</Label>
                <Input
                  id="m_addr"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street details"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="m_city" className="text-xs font-semibold">City</Label>
                  <Input
                    id="m_city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="m_cap" className="text-xs font-semibold flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    Capacity
                  </Label>
                  <Input
                    id="m_cap"
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g. 500"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="m_phone" className="text-xs font-semibold flex items-center gap-1">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  Phone Number
                </Label>
                <Input
                  id="m_phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91..."
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="m_email" className="text-xs font-semibold flex items-center gap-1">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  Email Address
                </Label>
                <Input
                  id="m_email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@masjid.com"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="m_web" className="text-xs font-semibold flex items-center gap-1">
                  <Globe className="h-3 w-3 text-muted-foreground" />
                  Website URL
                </Label>
                <Input
                  id="m_web"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </TabsContent>

            {/* Fiqh Tab */}
            <TabsContent value="fiqh" className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold flex items-center gap-1">
                  <Settings className="h-3 w-3 text-muted-foreground" />
                  Asr Juristic Calculation
                </Label>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    type="button"
                    variant={asrJuristic === 'Hanafi' ? 'default' : 'outline'}
                    onClick={() => setAsrJuristic('Hanafi')}
                    className={`h-9 text-xs ${asrJuristic === 'Hanafi' ? 'bg-islamic-gold text-white' : ''}`}
                  >
                    Hanafi (Later)
                  </Button>
                  <Button
                    type="button"
                    variant={asrJuristic === 'Standard' ? 'default' : 'outline'}
                    onClick={() => setAsrJuristic('Standard')}
                    className={`h-9 text-xs ${asrJuristic === 'Standard' ? 'bg-islamic-gold text-white' : ''}`}
                  >
                    Shafi'i / Standard
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground pt-1">
                  Determines when Asr starting time shadow length is calculated.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-end gap-2 pt-4 border-t mt-4">
            <Button type="button" variant="outline" onClick={onClose} className="h-8 text-xs">
              <X className="h-3.5 w-3.5 mr-1" />
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="h-8 text-xs bg-islamic-gold text-white hover:bg-islamic-gold/90">
              <Save className="h-3.5 w-3.5 mr-1" />
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
