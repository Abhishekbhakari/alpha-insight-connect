import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Phone, CheckCircle, Clock, Link as LinkIcon } from "lucide-react";
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
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">StockPro</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/customer/dashboard")}>
              Dashboard
            </Button>
            <Button variant="ghost" onClick={() => navigate("/customer/holdings")}>
              Holdings
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
            Here's your latest stock recommendation
          </p>
        </div>

        {/* Today's Recommendation */}
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Today's Recommendation</CardTitle>
              <Badge className="bg-success-light text-success">
                <Phone className="mr-1 h-3 w-3" />
                Call Delivered
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Stock</p>
                  <p className="text-2xl font-bold">Reliance Industries</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-success-light text-success">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    BUY
                  </Badge>
                  <span className="text-sm text-muted-foreground">NSE: RELIANCE</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Entry Price</p>
                  <p className="text-lg font-semibold">₹2,500</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target</p>
                  <p className="text-lg font-semibold text-success">₹2,700</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stop Loss</p>
                  <p className="text-lg font-semibold text-destructive">₹2,400</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Analysis Summary</h4>
              <p className="text-sm text-muted-foreground">
                Strong quarterly results with revenue growth of 15% YoY. Expansion in retail
                segment showing promising returns. Technical indicators suggest upward momentum
                with support at ₹2,450.
              </p>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Bought
              </Button>
              <Button variant="outline" className="flex-1">
                Listen to Call Recording
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Broker Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle>Broker Connection</CardTitle>
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
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Call Received - Reliance Industries",
                  time: "Today at 9:05 AM",
                  status: "delivered",
                },
                {
                  title: "Holdings Synced - Zerodha",
                  time: "Today at 8:50 AM",
                  status: "success",
                },
                {
                  title: "Call Received - TCS",
                  time: "Yesterday at 9:03 AM",
                  status: "delivered",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.status === "delivered" ? "bg-success" : "bg-primary"
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
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
  );
};

export default CustomerDashboard;
