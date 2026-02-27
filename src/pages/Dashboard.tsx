import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, TrendingUp, FileSignature, DollarSign, Plus, UserPlus, CheckCheck, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const activityFeed = [
    { text: "Rajesh Kumar bought Tata Motors", time: "2 min ago", type: "buy" },
    { text: "Priya Sharma signed e-agreement", time: "15 min ago", type: "sign" },
    { text: "WhatsApp Nudge sent to 45 clients", time: "1 hr ago", type: "nudge" },
    { text: "Amit Singh ignored HDFC Bank call", time: "2 hr ago", type: "ignore" },
    { text: "Target hit on TCS — Profit Lock alert sent", time: "3 hr ago", type: "profit" },
    { text: "New client Meera Gupta added", time: "5 hr ago", type: "new" },
  ];

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6 p-6">
          <Skeleton className="h-10 w-72" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32" />)}
          </div>
          <Skeleton className="h-64" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your business stats</p>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Active Clients</p>
                  <p className="text-3xl font-bold">248</p>
                  <Badge className="mt-1 bg-success/15 text-success border-0 text-xs">+8.2% this month</Badge>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Recommendations</p>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground mt-1">5 Buy · 3 Sell · 4 Hold</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending E-Signs</p>
                  <p className="text-3xl font-bold text-destructive">18</p>
                  <p className="text-xs text-destructive mt-1">6 overdue &gt; 3 days</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-destructive-light flex items-center justify-center">
                  <FileSignature className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Renewal Revenue</p>
                  <p className="text-3xl font-bold">₹12.4L</p>
                  <p className="text-xs text-muted-foreground mt-1">Projected this quarter</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Activity Feed */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Live feed of client and system actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                      item.type === "buy" ? "bg-success" :
                      item.type === "sign" ? "bg-primary" :
                      item.type === "nudge" ? "bg-info" :
                      item.type === "profit" ? "bg-success" :
                      item.type === "ignore" ? "bg-warning" : "bg-muted-foreground"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{item.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                        {item.type === "nudge" && (
                          <span className="inline-flex items-center text-xs text-info">
                            <CheckCheck className="h-3 w-3 mr-1" /> Read
                          </span>
                        )}
                        {item.type === "buy" && (
                          <span className="inline-flex items-center text-xs text-success">
                            <Check className="h-3 w-3 mr-1" /> Confirmed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start h-14 text-base"
                onClick={() => navigate("/recommendations/create")}
              >
                <Plus className="mr-3 h-5 w-5" />
                New Recommendation
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-14 text-base"
                onClick={() => navigate("/clients/add")}
              >
                <UserPlus className="mr-3 h-5 w-5" />
                Add Client
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
