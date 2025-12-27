import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  UserMinus, 
  Gift, 
  Phone, 
  TrendingUp,
  AlertTriangle,
  Clock,
  MessageCircle,
  Users,
  Trophy,
  Copy,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Retention = () => {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Mock churn risk clients
  const churnRiskClients = [
    { 
      id: 1,
      name: "Suresh Patel", 
      score: 28, 
      daysInactive: 21, 
      lastAction: "Ignored 5 consecutive calls",
      whatsappOpenRate: 15,
      subscriptionEnds: "Jan 15, 2026",
      phone: "+91 98765 43210"
    },
    { 
      id: 2,
      name: "Meera Sharma", 
      score: 32, 
      daysInactive: 18, 
      lastAction: "No trades in 30 days",
      whatsappOpenRate: 22,
      subscriptionEnds: "Jan 20, 2026",
      phone: "+91 98765 43211"
    },
    { 
      id: 3,
      name: "Anil Gupta", 
      score: 38, 
      daysInactive: 14, 
      lastAction: "Low engagement score",
      whatsappOpenRate: 35,
      subscriptionEnds: "Feb 5, 2026",
      phone: "+91 98765 43212"
    },
  ];

  // Mock referral data
  const referralLeaderboard = [
    { rank: 1, name: "Amit Kumar", referrals: 12, bonus: "+3 months", earnings: 15000, code: "AMIT2025" },
    { rank: 2, name: "Priya Singh", referrals: 8, bonus: "+2 months", earnings: 10000, code: "PRIYA2025" },
    { rank: 3, name: "Rohit Verma", referrals: 6, bonus: "+1.5 months", earnings: 7500, code: "ROHIT2025" },
    { rank: 4, name: "Neha Gupta", referrals: 4, bonus: "+1 month", earnings: 5000, code: "NEHA2025" },
    { rank: 5, name: "Vikram Joshi", referrals: 3, bonus: "+15 days", earnings: 3750, code: "VIKRAM2025" },
  ];

  // Profit lock alerts
  const profitLockAlerts = [
    { stock: "Tata Motors", target: 450, current: 468, clients: 42, status: "sent", sentAt: "10:15 AM" },
    { stock: "HDFC Bank", target: 1700, current: 1695, clients: 38, status: "pending", progress: 97 },
    { stock: "Reliance", target: 2700, current: 2680, clients: 45, status: "pending", progress: 92 },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: "Copied!",
      description: `Referral code ${code} copied to clipboard`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Retention Center</h1>
          <p className="text-muted-foreground">
            Churn prediction, referral tracking, and profit lock alerts
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center">
                  <UserMinus className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">Churn Risk</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">48</p>
                  <p className="text-sm text-muted-foreground">Referrals This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Profit Alerts Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-warning/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-sm text-muted-foreground">Retention Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="churn" className="space-y-6">
          <TabsList>
            <TabsTrigger value="churn">
              <UserMinus className="mr-2 h-4 w-4" />
              Churn Prediction
            </TabsTrigger>
            <TabsTrigger value="referrals">
              <Gift className="mr-2 h-4 w-4" />
              Referral Leaderboard
            </TabsTrigger>
            <TabsTrigger value="profit-lock">
              <TrendingUp className="mr-2 h-4 w-4" />
              Profit Lock Alerts
            </TabsTrigger>
          </TabsList>

          {/* Churn Prediction Tab */}
          <TabsContent value="churn" className="space-y-6">
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  High Churn Risk Clients
                </CardTitle>
                <CardDescription>
                  Clients with engagement score below 40 - immediate action needed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {churnRiskClients.map((client) => (
                    <div
                      key={client.id}
                      className="p-4 border border-destructive/20 rounded-lg bg-destructive/5"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center font-semibold text-destructive">
                            {client.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-muted-foreground">{client.phone}</p>
                          </div>
                        </div>
                        <Badge variant="destructive">
                          Score: {client.score}/100
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Days Inactive</p>
                          <p className="font-semibold text-destructive">{client.daysInactive} days</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">WhatsApp Open Rate</p>
                          <p className="font-semibold">{client.whatsappOpenRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Subscription Ends</p>
                          <p className="font-semibold">{client.subscriptionEnds}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Last Action</p>
                          <p className="font-semibold text-sm">{client.lastAction}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Now
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Send WhatsApp
                        </Button>
                        <Button size="sm" variant="outline">
                          <Gift className="mr-2 h-4 w-4" />
                          Offer Discount
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Score Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { factor: "WhatsApp Open Rate", weight: 25, description: "Percentage of nudges opened" },
                    { factor: "Trade Activity", weight: 30, description: "Number of trades executed" },
                    { factor: "Days Since Last Login", weight: 20, description: "Portal engagement" },
                    { factor: "Call Response Rate", weight: 15, description: "Marked as Bought/Ignored" },
                    { factor: "Subscription Tenure", weight: 10, description: "Loyalty factor" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.factor}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Badge variant="outline">{item.weight}% weight</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referral Leaderboard Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Referral Leaderboard
                </CardTitle>
                <CardDescription>
                  Top referring clients earn bonus subscription validity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralLeaderboard.map((client) => (
                    <div
                      key={client.rank}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        client.rank <= 3 ? "border-primary/30 bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                          client.rank === 1 ? "bg-yellow-500 text-white" :
                          client.rank === 2 ? "bg-gray-400 text-white" :
                          client.rank === 3 ? "bg-amber-600 text-white" :
                          "bg-muted"
                        }`}>
                          {client.rank}
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted px-2 py-0.5 rounded">{client.code}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => handleCopyCode(client.code)}
                            >
                              {copiedCode === client.code ? (
                                <CheckCircle className="h-3 w-3 text-success" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold">{client.referrals}</p>
                          <p className="text-xs text-muted-foreground">Referrals</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-success">{client.bonus}</p>
                          <p className="text-xs text-muted-foreground">Bonus</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{client.earnings.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Earnings</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Referral Program Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Bonus per Referral</p>
                    <p className="text-2xl font-bold">+7 days</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Commission per Referral</p>
                    <p className="text-2xl font-bold">₹1,250</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Configure Referral Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profit Lock Alerts Tab */}
          <TabsContent value="profit-lock" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  Profit Lock Alerts
                </CardTitle>
                <CardDescription>
                  Automatic "BOOK PROFIT NOW" alerts when targets are hit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profitLockAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg ${
                        alert.status === "sent" 
                          ? "border-success/30 bg-success/5" 
                          : "border-primary/30 bg-primary/5"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            alert.status === "sent" ? "bg-success/20" : "bg-primary/20"
                          }`}>
                            <TrendingUp className={`h-5 w-5 ${
                              alert.status === "sent" ? "text-success" : "text-primary"
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium">{alert.stock}</p>
                            <p className="text-sm text-muted-foreground">
                              Target: ₹{alert.target} | Current: ₹{alert.current}
                            </p>
                          </div>
                        </div>
                        <Badge className={
                          alert.status === "sent" 
                            ? "bg-success text-success-foreground" 
                            : "bg-primary text-primary-foreground"
                        }>
                          {alert.status === "sent" ? (
                            <>
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Sent at {alert.sentAt}
                            </>
                          ) : (
                            <>
                              <Clock className="mr-1 h-3 w-3" />
                              {alert.progress}% to Target
                            </>
                          )}
                        </Badge>
                      </div>

                      {alert.status === "pending" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress to Target</span>
                            <span className="font-medium">{alert.progress}%</span>
                          </div>
                          <Progress value={alert.progress} className="h-2" />
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {alert.clients} clients holding this stock
                        </p>
                        {alert.status === "pending" && (
                          <Button size="sm" variant="outline">
                            Send Alert Manually
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Lock Message Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-sm">
                    🎯 <strong>TARGET HIT!</strong><br/><br/>
                    {"{stock_name}"} has reached your target price of ₹{"{target_price}"}!<br/><br/>
                    Current Price: ₹{"{current_price}"}<br/>
                    Your Entry: ₹{"{entry_price}"}<br/>
                    Profit: <span className="text-success font-bold">+{"{profit_percent}"}%</span><br/><br/>
                    📈 Consider booking profits now to lock in your gains!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Retention;