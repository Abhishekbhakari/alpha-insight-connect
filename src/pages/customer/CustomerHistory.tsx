import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, CheckCircle, XCircle, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerHistory = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      stock: "Reliance Industries",
      type: "buy",
      entryPrice: 2500,
      target: 2700,
      stopLoss: 2400,
      date: "2024-01-15",
      time: "9:05 AM",
      status: "delivered",
      bought: true,
    },
    {
      id: 2,
      stock: "TCS",
      type: "buy",
      entryPrice: 3200,
      target: 3400,
      stopLoss: 3100,
      date: "2024-01-14",
      time: "9:03 AM",
      status: "delivered",
      bought: true,
    },
    {
      id: 3,
      stock: "Wipro",
      type: "sell",
      entryPrice: 450,
      target: 420,
      stopLoss: 465,
      date: "2024-01-13",
      time: "9:07 AM",
      status: "delivered",
      bought: false,
    },
    {
      id: 4,
      stock: "Infosys",
      type: "buy",
      entryPrice: 1400,
      target: 1500,
      stopLoss: 1350,
      date: "2024-01-12",
      time: "9:02 AM",
      status: "missed",
      bought: false,
    },
  ];

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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recommendations History</h1>
          <p className="text-muted-foreground">
            All recommendations received from our research team
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Received</p>
              <p className="text-3xl font-bold mt-2">24</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Calls Delivered</p>
              <p className="text-3xl font-bold mt-2 text-success">22</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Followed</p>
              <p className="text-3xl font-bold mt-2 text-primary">18</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-3xl font-bold mt-2 text-success">75%</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold">{rec.stock}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                          <Phone className="h-3 w-3" />
                          {rec.date} at {rec.time}
                        </p>
                      </div>
                      <Badge
                        className={
                          rec.type === "buy"
                            ? "bg-success-light text-success"
                            : "bg-destructive-light text-destructive"
                        }
                      >
                        {rec.type === "buy" ? (
                          <TrendingUp className="mr-1 h-3 w-3" />
                        ) : (
                          <TrendingDown className="mr-1 h-3 w-3" />
                        )}
                        {rec.type.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Entry Price</p>
                        <p className="text-lg font-semibold">₹{rec.entryPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Target</p>
                        <p className="text-lg font-semibold text-success">
                          ₹{rec.target.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stop Loss</p>
                        <p className="text-lg font-semibold text-destructive">
                          ₹{rec.stopLoss.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      className={
                        rec.status === "delivered"
                          ? "bg-success-light text-success"
                          : "bg-warning-light text-warning"
                      }
                    >
                      {rec.status === "delivered" ? "Call Delivered" : "Call Missed"}
                    </Badge>
                    {rec.bought ? (
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Followed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Not Followed</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerHistory;
