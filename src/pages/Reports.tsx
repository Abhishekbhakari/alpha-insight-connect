import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Send, 
  Target, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Calendar
} from "lucide-react";
import { useState } from "react";

const Reports = () => {
  const [quarter, setQuarter] = useState("q4-2025");

  // Mock data for performance
  const performanceData = {
    totalCalls: 48,
    successfulCalls: 38,
    totalProfit: 285000,
    avgReturn: 12.5,
    hitRate: 79,
  };

  // Mock data for recommendations
  const recommendations = [
    { stock: "Tata Motors", type: "BUY", entry: 400, target: 450, current: 465, status: "target_hit", profit: 16.25 },
    { stock: "HDFC Bank", type: "BUY", entry: 1580, target: 1700, current: 1695, status: "near_target", profit: 7.28 },
    { stock: "Infosys", type: "BUY", entry: 1450, target: 1550, current: 1420, status: "sl_hit", profit: -2.07 },
    { stock: "Reliance", type: "BUY", entry: 2500, target: 2700, current: 2680, status: "near_target", profit: 7.2 },
    { stock: "TCS", type: "SELL", entry: 3800, target: 3600, current: 3550, status: "target_hit", profit: 6.58 },
  ];

  // Mock missed opportunities
  const missedOpportunities = [
    { client: "Suresh Patel", missedCalls: 5, potentialProfit: 42500 },
    { client: "Meera Sharma", missedCalls: 8, potentialProfit: 68000 },
    { client: "Anil Gupta", missedCalls: 3, potentialProfit: 24500 },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">FOMO Reports</h1>
            <p className="text-muted-foreground">
              Performance analytics and missed opportunity reports
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={quarter} onValueChange={setQuarter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q4-2025">Q4 2025</SelectItem>
                <SelectItem value="q3-2025">Q3 2025</SelectItem>
                <SelectItem value="q2-2025">Q2 2025</SelectItem>
                <SelectItem value="q1-2025">Q1 2025</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">{performanceData.totalCalls}</p>
                <p className="text-sm text-muted-foreground">Total Calls</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-success">{performanceData.successfulCalls}</p>
                <p className="text-sm text-muted-foreground">Successful</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-success">₹{(performanceData.totalProfit / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Total Profit</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{performanceData.avgReturn}%</p>
                <p className="text-sm text-muted-foreground">Avg Return</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{performanceData.hitRate}%</p>
                <p className="text-sm text-muted-foreground">Hit Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">
              <BarChart3 className="mr-2 h-4 w-4" />
              Performance Report
            </TabsTrigger>
            <TabsTrigger value="fomo">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Missed Opportunity Report
            </TabsTrigger>
            <TabsTrigger value="client">
              <PieChart className="mr-2 h-4 w-4" />
              Client-wise Analysis
            </TabsTrigger>
          </TabsList>

          {/* Performance Report Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Performance Summary</CardTitle>
                <CardDescription>
                  All recommendations and their outcomes for {quarter.toUpperCase().replace('-', ' ')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        rec.status === "target_hit" 
                          ? "border-success/30 bg-success/5" 
                          : rec.status === "sl_hit"
                          ? "border-destructive/30 bg-destructive/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          rec.profit >= 0 ? "bg-success/20" : "bg-destructive/20"
                        }`}>
                          {rec.profit >= 0 ? (
                            <TrendingUp className="h-5 w-5 text-success" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{rec.stock}</p>
                          <p className="text-sm text-muted-foreground">
                            {rec.type} @ ₹{rec.entry} → Target ₹{rec.target}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold">₹{rec.current}</p>
                          <p className="text-xs text-muted-foreground">Current</p>
                        </div>
                        <Badge className={
                          rec.status === "target_hit" 
                            ? "bg-success text-success-foreground" 
                            : rec.status === "sl_hit"
                            ? "bg-destructive text-destructive-foreground"
                            : "bg-primary text-primary-foreground"
                        }>
                          {rec.status === "target_hit" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {rec.status === "sl_hit" && <XCircle className="mr-1 h-3 w-3" />}
                          {rec.status === "near_target" && <Target className="mr-1 h-3 w-3" />}
                          {rec.status === "target_hit" ? "Target Hit" : rec.status === "sl_hit" ? "SL Hit" : "Active"}
                        </Badge>
                        <div className={`text-right font-semibold ${rec.profit >= 0 ? "text-success" : "text-destructive"}`}>
                          {rec.profit >= 0 ? "+" : ""}{rec.profit}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FOMO Report Tab */}
          <TabsContent value="fomo" className="space-y-6">
            <Card className="border-warning/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  Missed Opportunity Report
                </CardTitle>
                <CardDescription>
                  Clients who didn't act on recommendations and their potential profits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {missedOpportunities.map((client, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-warning/20 rounded-lg bg-warning/5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-warning" />
                        </div>
                        <div>
                          <p className="font-medium">{client.client}</p>
                          <p className="text-sm text-muted-foreground">
                            Ignored {client.missedCalls} calls this quarter
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold text-warning">₹{client.potentialProfit.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Potential Profit Missed</p>
                        </div>
                        <Button size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          Send Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Sample FOMO Message:</h4>
                  <p className="text-sm text-muted-foreground italic">
                    "Dear Client, if you had followed our 5 calls this quarter, your profit would have been ₹42,500. 
                    Don't miss out on future opportunities - stay active and trade with confidence!"
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                Send FOMO Reports to All Inactive Clients
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download All Reports
              </Button>
            </div>
          </TabsContent>

          {/* Client-wise Analysis Tab */}
          <TabsContent value="client" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Performance Analysis</CardTitle>
                <CardDescription>
                  Individual client performance based on Shadow Portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Rajesh Kumar", trades: 18, profit: 52000, successRate: 85, status: "active" },
                    { name: "Amit Singh", trades: 15, profit: 38000, successRate: 80, status: "active" },
                    { name: "Priya Sharma", trades: 12, profit: 28500, successRate: 75, status: "active" },
                    { name: "Suresh Patel", trades: 5, profit: 8000, successRate: 60, status: "inactive" },
                    { name: "Meera Gupta", trades: 3, profit: -2500, successRate: 33, status: "churn_risk" },
                  ].map((client, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        client.status === "churn_risk" ? "border-destructive/30 bg-destructive/5" :
                        client.status === "inactive" ? "border-warning/30 bg-warning/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {client.trades} trades this quarter
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className={`font-semibold ${client.profit >= 0 ? "text-success" : "text-destructive"}`}>
                            {client.profit >= 0 ? "+" : ""}₹{client.profit.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">P&L</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{client.successRate}%</p>
                          <p className="text-xs text-muted-foreground">Success Rate</p>
                        </div>
                        <Badge variant={
                          client.status === "active" ? "default" :
                          client.status === "inactive" ? "secondary" : "destructive"
                        }>
                          {client.status === "active" ? "Active" :
                           client.status === "inactive" ? "Inactive" : "Churn Risk"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Reports;