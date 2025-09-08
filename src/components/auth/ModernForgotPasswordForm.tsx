import { useState } from "react";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";

interface ModernForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export const ModernForgotPasswordForm = ({ onBackToLogin }: ModernForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await resetPassword(email);
    
    if (error) {
      toast({
        title: "Reset Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email Sent!",
        description: "Check your email for password reset instructions.",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center">
          <KeyRound className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reset Password</h1>
          <p className="text-muted-foreground mt-2">Enter your email to receive reset instructions</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-12 rounded-xl border-2 focus:border-primary transition-colors"
              required
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 rounded-xl font-semibold text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </Button>
      </form>

      {/* Back to login */}
      <div className="text-center">
        <Button
          variant="link"
          className="p-0 h-auto text-primary hover:text-primary/80 font-semibold inline-flex items-center gap-2"
          onClick={onBackToLogin}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Button>
      </div>
    </div>
  );
};