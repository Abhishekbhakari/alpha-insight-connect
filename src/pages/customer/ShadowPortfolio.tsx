import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Download, 
  CheckCircle, 
  XCircle,
  Calendar,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ShadowPortfolio = () => {
  const navigate = useNavigate();

  // Mock shadow portfolio data
  const holdings = [
    {
      id: 1,
      stock: "Tata Motors",
      buyDate: "Dec 20, 2025",
      entryPrice: 400,
      currentPrice: 465,
      quantity: 100,
      target: 450,
      stopLoss: 380,
      status: "target_hit",
    },
    {
      id: 2,
      stock: "HDFC Bank",
      buyDate: "Dec 18, 2025",
      entryPrice: 1580,
      currentPrice: 1695,
      quantity: 25,
      target: 1700,
      stopLoss: 1520,
      status: "active",
    },
    {
      id: 3,
      stock: "Reliance",
      buyDate: "Dec 15, 2025",
      entryPrice: 2500,
      currentPrice: 2680,
      quantity: 20,
      target: 2700,
      stopLoss: 2400,
      status: "active",
    },
    {
      id: 4,
      stock: "Infosys",
      buyDate: "Dec 10, 2025",
      entryPrice: 1450,
      currentPrice: 1420,
      quantity: 40,
      target: 1550,
      stopLoss: 1400,
      status: "near_sl",
    },
  ];

  // Calculate totals
  const totalInvested = holdings.reduce((sum, h) => sum + (h.entryPrice * h.quantity), 0);
  const totalCurrent = holdings.reduce((sum, h) => sum + (h.currentPrice * h.quantity), 0);
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPercent = ((totalPnL / totalInvested) * 100).toFixed(2);

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
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shadow Portfolio</h1>
            <p className="text-muted-foreground">
              Stocks you confirmed as bought - track your real performance
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-2xl font-bold">₹{totalInvested.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-2xl font-bold">₹{totalCurrent.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card className={totalPnL >= 0 ? "border-success/30" : "border-destructive/30"}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total P&L</p>
                <p className={`text-2xl font-bold ${totalPnL >= 0 ? "text-success" : "text-destructive"}`}>
                  {totalPnL >= 0 ? "+" : ""}₹{totalPnL.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className={totalPnL >= 0 ? "border-success/30" : "border-destructive/30"}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Returns</p>
                <p className={`text-2xl font-bold ${totalPnL >= 0 ? "text-success" : "text-destructive"}`}>
                  {totalPnL >= 0 ? "+" : ""}{totalPnLPercent}%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
            <CardDescription>
              Stocks marked as "Bought" from our recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holdings.map((holding) => {
                const pnl = (holding.currentPrice - holding.entryPrice) * holding.quantity;
                const pnlPercent = ((holding.currentPrice - holding.entryPrice) / holding.entryPrice * 100).toFixed(2);
                const progressToTarget = ((holding.currentPrice - holding.entryPrice) / (holding.target - holding.entryPrice) * 100).toFixed(0);

                return (
                  <div
                    key={holding.id}
                    className={`p-4 border rounded-lg ${
                      holding.status === "target_hit" 
                        ? "border-success/30 bg-success/5" 
                        : holding.status === "near_sl"
                        ? "border-warning/30 bg-warning/5"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                          pnl >= 0 ? "bg-success/20" : "bg-destructive/20"
                        }`}>
                          {pnl >= 0 ? (
                            <TrendingUp className="h-6 w-6 text-success" />
                          ) : (
                            <TrendingDown className="h-6 w-6 text-destructive" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{holding.stock}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Bought on {holding.buyDate}
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        holding.status === "target_hit" 
                          ? "bg-success text-success-foreground" 
                          : holding.status === "near_sl"
                          ? "bg-warning text-warning-foreground"
                          : "bg-primary text-primary-foreground"
                      }>
                        {holding.status === "target_hit" && <CheckCircle className="mr-1 h-3 w-3" />}
                        {holding.status === "near_sl" && <XCircle className="mr-1 h-3 w-3" />}
                        {holding.status === "active" && <Target className="mr-1 h-3 w-3" />}
                        {holding.status === "target_hit" ? "Target Hit!" : 
                         holding.status === "near_sl" ? "Near Stop Loss" : "Active"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Qty</p>
                        <p className="font-semibold">{holding.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Entry</p>
                        <p className="font-semibold">₹{holding.entryPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Current</p>
                        <p className="font-semibold">₹{holding.currentPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Target</p>
                        <p className="font-semibold text-success">₹{holding.target}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">P&L</p>
                        <p className={`font-semibold ${pnl >= 0 ? "text-success" : "text-destructive"}`}>
                          {pnl >= 0 ? "+" : ""}₹{pnl.toLocaleString()} ({pnlPercent}%)
                        </p>
                      </div>
                    </div>

                    {holding.status === "target_hit" && (
                      <div className="mt-4 p-3 bg-success/10 rounded-lg">
                        <p className="text-sm text-success font-medium">
                          🎯 Congratulations! Target achieved. Consider booking profits.
                        </p>
                      </div>
                    )}

                    {holding.status === "near_sl" && (
                      <div className="mt-4 p-3 bg-warning/10 rounded-lg">
                        <p className="text-sm text-warning font-medium">
                          ⚠️ Stock is approaching stop loss level. Monitor closely.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Your shadow portfolio growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
              <p className="text-muted-foreground">Performance chart visualization</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShadowPortfolio;