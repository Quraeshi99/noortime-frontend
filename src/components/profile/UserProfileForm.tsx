import { useState } from "react";
import { ArrowLeft, User, Mail, Crown, Shield, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

interface UserProfileFormProps {
  onBack: () => void;
  onChangePassword: () => void;
}

export const UserProfileForm = ({ onBack, onChangePassword }: UserProfileFormProps) => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await updateProfile({ full_name: fullName, email });
    
    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Edit Profile</h2>
      </div>

      {/* Profile Form */}
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Subscription Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Subscription
            </h3>
            
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Free Plan</p>
                    <p className="text-sm text-muted-foreground">Basic prayer times and notifications</p>
                  </div>
                </div>
                <Badge variant="secondary">Current</Badge>
              </div>
            </Card>

            <Button variant="outline" className="w-full">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </div>

          <Separator />

          {/* Security Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              Security
            </h3>
            
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start"
              onClick={onChangePassword}
            >
              <Key className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </div>

          <Separator />

          {/* Save Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  );
};