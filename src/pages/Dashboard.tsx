import { AppLayout } from "@/components/Layout/AppLayout";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { RecentActivity } from "@/components/Dashboard/RecentActivity";
import { Users, TrendingUp, CheckCircle, AlertTriangle, Zap, Target, UserMinus, Gift } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for active nudges
  const activeNudges = [
    {
      id: 1,
      stock: "Tata Motors",
      buyRange: "400-410",
      currentPrice: 405,
      cutoff: 420,
      status: "in_zone",
      nudgesSent: 12,
    },
    {
      id: 2,
      stock: "HDFC Bank",
      buyRange: "1580-1600",
      currentPrice: 1595,
      cutoff: 1620,
      status: "in_zone",
      nudgesSent: 8,
    },
    {
      id: 3,
      stock: "Infosys",
      buyRange: "1450-1470",
      currentPrice: 1485,
      cutoff: 1480,
      status: "above_cutoff",
      nudgesSent: 5,
    },
  ];

  // Mock data for churn alerts
  const churnAlerts = [
    { name: "Suresh Patel", score: 32, daysInactive: 15, lastAction: "Ignored 3 calls" },
    { name: "Meera Sharma", score: 28, daysInactive: 21, lastAction: "No trades this month" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Smart-Nudge Dashboard</h1>
            <p className="text-muted-foreground">
              SEBI-Compliant Portfolio Management & Client Retention
            </p>
          </div>
          <Button onClick={() => navigate("/recommendations/create")}>
            <Zap className="mr-2 h-4 w-4" />
            Create Smart Call
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Clients"
            value="248"
            icon={Users}
            trend={{ value: "+12 this month", positive: true }}
            variant="info"
          />
          <StatsCard
            title="Shadow Portfolio Entries"
            value="1,842"
            icon={CheckCircle}
            trend={{ value: "Clients confirmed trades", positive: true }}
            variant="success"
          />
          <StatsCard
            title="Active Smart-Nudges"
            value="5"
            icon={Zap}
            trend={{ value: "Monitoring live prices", positive: true }}
            variant="info"
          />
          <StatsCard
            title="Churn Risk Clients"
            value="7"
            icon={AlertTriangle}
            trend={{ value: "Need immediate attention", positive: false }}
            variant="warning"
          />
        </div>

        {/* Active Smart-Nudges */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Active Smart-Nudges
                </CardTitle>
                <CardDescription>
                  Live price monitoring and automated WhatsApp alerts
                </CardDescription>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <span className="h-2 w-2 rounded-full bg-success mr-2" />
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeNudges.map((nudge) => (
                <div
                  key={nudge.id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    nudge.status === "in_zone" 
                      ? "border-success/30 bg-success/5" 
                      : "border-muted bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      nudge.status === "in_zone" ? "bg-success/20" : "bg-muted"
                    }`}>
                      <TrendingUp className={`h-5 w-5 ${
                        nudge.status === "in_zone" ? "text-success" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{nudge.stock}</p>
                      <p className="text-sm text-muted-foreground">
                        Buy Zone: ₹{nudge.buyRange} | Cutoff: ₹{nudge.cutoff}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold">₹{nudge.currentPrice}</p>
                      <p className="text-xs text-muted-foreground">Current Price</p>
                    </div>
                    <Badge className={
                      nudge.status === "in_zone" 
                        ? "bg-success text-success-foreground" 
                        : "bg-muted text-muted-foreground"
                    }>
                      {nudge.status === "in_zone" ? "In Zone • Nudging" : "Above Cutoff • Paused"}
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold">{nudge.nudgesSent}</p>
                      <p className="text-xs text-muted-foreground">Nudges Sent</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Churn Prediction Alerts */}
            <Card className="border-warning/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <UserMinus className="h-5 w-5" />
                  Churn Risk Alerts
                </CardTitle>
                <CardDescription>
                  Clients with low engagement scores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {churnAlerts.map((client, index) => (
                  <div key={index} className="p-3 border border-warning/20 rounded-lg bg-warning/5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{client.name}</p>
                      <Badge variant="outline" className="text-warning border-warning">
                        Score: {client.score}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {client.lastAction} • {client.daysInactive} days inactive
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Call Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Referral Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Referral Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Amit Kumar", referrals: 8, bonus: "+2 months" },
                  { name: "Priya Singh", referrals: 5, bonus: "+1 month" },
                  { name: "Rohit Verma", referrals: 3, bonus: "+15 days" },
                ].map((leader, index) => (
                  <div key={index} className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-3">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}>
                        {index + 1}
                      </span>
                      <p className="font-medium">{leader.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{leader.referrals} referrals</p>
                      <p className="text-xs text-success">{leader.bonus}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full justify-start" 
                  onClick={() => navigate("/recommendations/create")}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Create Smart Call
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/customers/add")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/reports")}
                >
                  <Target className="mr-2 h-4 w-4" />
                  View FOMO Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;