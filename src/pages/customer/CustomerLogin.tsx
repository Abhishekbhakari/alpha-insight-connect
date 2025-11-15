import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/customer/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Client Portal</CardTitle>
          <CardDescription>
            Sign in to view your recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  OTP sent to {phone}
                </p>
              </div>
              <Button type="submit" className="w-full">
                Verify & Sign In
              </Button>
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => setOtpSent(false)}
              >
                Change number
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerLogin;
