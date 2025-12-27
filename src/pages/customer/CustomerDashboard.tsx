import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Phone, CheckCircle, Clock, Link as LinkIcon, MessageCircle, Target, Zap, ThumbsUp, ThumbsDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Smart-Nudge</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/customer/dashboard")}>
              Dashboard
            </Button>
            <Button variant="ghost" onClick={() => navigate("/customer/holdings")}>
              Shadow Portfolio
            </Button>
            <Button variant="ghost" onClick={() => navigate("/customer/history")}>
              History
            </Button>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome, Rajesh</h1>
          <p className="text-muted-foreground">
            Your personalized stock recommendations dashboard
          </p>
        </div>

        {/* Today's Recommendation with Shadow Portfolio Actions */}
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Today's Smart Call
                </CardTitle>
                <CardDescription>Recommended at 9:00 AM</CardDescription>
              </div>
              <Badge className="bg-success-light text-success">
                <Target className="mr-1 h-3 w-3" />
                In Buy Zone
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Stock</p>
                  <p className="text-2xl font-bold">Tata Motors</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-success-light text-success">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    BUY
                  </Badge>
                  <span className="text-sm text-muted-foreground">NSE: TATAMOTORS</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-muted-foreground">Buy Zone</p>
                  <p className="text-lg font-semibold">₹400 - ₹410</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Price</p>
                  <p className="text-lg font-semibold text-success">₹405</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="text-lg font-semibold text-success">₹450</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stop Loss</p>
                  <p className="text-lg font-semibold text-destructive">₹380</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                Analysis
              </h4>
              <p className="text-sm text-muted-foreground">
                Strong quarterly results with auto sales up 25% YoY. EV segment showing promising growth.
                Technical breakout above ₹395 resistance. Good risk-reward ratio at current levels.
              </p>
            </div>

            {/* Shadow Portfolio Actions */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-3">Did you act on this recommendation?</h4>
              <div className="flex gap-3">
                <Button className="flex-1 bg-success hover:bg-success/90">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  I Bought This
                </Button>
                <Button variant="outline" className="flex-1">
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Ignored
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This helps us track your portfolio performance accurately
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">+₹42,500</p>
                  <p className="text-sm text-muted-foreground">This Quarter P&L</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">18/24</p>
                  <p className="text-sm text-muted-foreground">Calls Acted Upon</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-warning/20 flex items-center justify-center">
                  <Target className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Broker Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle>Broker Connection</CardTitle>
              <CardDescription>
                Optional: Connect to auto-verify your trades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
                      <LinkIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Zerodha</p>
                      <p className="text-sm text-muted-foreground">
                        Connected • Last synced 5 mins ago
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Sync Now
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <LinkIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Angel One</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Nudges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Tata Motors in Buy Zone",
                    message: "Price is ₹405 - Don't miss out!",
                    time: "10 mins ago",
                    type: "nudge",
                  },
                  {
                    title: "HDFC Bank - Profit Lock Alert",
                    message: "Target hit! Consider booking profits",
                    time: "Yesterday",
                    type: "profit",
                  },
                  {
                    title: "Initial Buy Call - Tata Motors",
                    message: "New recommendation received",
                    time: "Today at 9:00 AM",
                    type: "call",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === "profit" ? "bg-success/20" : 
                      activity.type === "nudge" ? "bg-primary/20" : "bg-muted"
                    }`}>
                      {activity.type === "profit" ? (
                        <CheckCircle className="h-4 w-4 text-success" />
                      ) : activity.type === "nudge" ? (
                        <Zap className="h-4 w-4 text-primary" />
                      ) : (
                        <Phone className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;