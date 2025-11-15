import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-fit mb-2"
            onClick={() => navigate("/auth/login")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {step === "success" ? "Password Reset" : "Forgot Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === "email" && "Enter your email to receive a verification code"}
            {step === "otp" && "Enter the OTP sent to your email"}
            {step === "reset" && "Create a new password"}
            {step === "success" && "Your password has been reset successfully"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="analyst@stockpro.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send OTP
              </Button>
            </form>
          )}

          {step === "otp" && (
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
                  OTP sent to {email}
                </p>
              </div>
              <Button type="submit" className="w-full">
                Verify OTP
              </Button>
              <Button type="button" variant="link" className="w-full">
                Resend OTP
              </Button>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          )}

          {step === "success" && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </div>
              <p className="text-muted-foreground">
                You can now sign in with your new password
              </p>
              <Button onClick={() => navigate("/auth/login")} className="w-full">
                Go to Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
