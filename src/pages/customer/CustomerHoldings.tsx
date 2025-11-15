import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, RefreshCw, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerHoldings = () => {
  const navigate = useNavigate();

  const holdings = [
    { stock: "Reliance Industries", qty: 10, avgPrice: 2450, currentPrice: 2520, recommended: true },
    { stock: "TCS", qty: 5, avgPrice: 3200, currentPrice: 3350, recommended: true },
    { stock: "HDFC Bank", qty: 15, avgPrice: 1520, currentPrice: 1580, recommended: false },
    { stock: "Infosys", qty: 8, avgPrice: 1400, currentPrice: 1450, recommended: false },
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Holdings</h1>
            <p className="text-muted-foreground">
              Your portfolio synced from Zerodha
            </p>
          </div>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Holdings
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total Holdings</p>
              <p className="text-3xl font-bold mt-2">4</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-3xl font-bold mt-2 text-success">₹1,23,450</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Total P&L</p>
              <p className="text-3xl font-bold mt-2 text-success">+₹8,250</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock Name</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Avg Price</TableHead>
                  <TableHead className="text-right">Current Price</TableHead>
                  <TableHead className="text-right">P&L</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((holding, index) => {
                  const pl = (holding.currentPrice - holding.avgPrice) * holding.qty;
                  const plPercent = ((holding.currentPrice - holding.avgPrice) / holding.avgPrice * 100).toFixed(2);
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {holding.stock}
                          {holding.recommended && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{holding.qty}</TableCell>
                      <TableCell className="text-right">₹{holding.avgPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{holding.currentPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={pl >= 0 ? "text-success" : "text-destructive"}>
                          {pl >= 0 ? "+" : ""}₹{pl.toLocaleString()} ({plPercent}%)
                        </span>
                      </TableCell>
                      <TableCell>
                        {holding.recommended ? (
                          <Badge className="bg-success-light text-success">
                            Recommended
                          </Badge>
                        ) : (
                          <Badge variant="outline">Other</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-info-light border-info">
          <CardContent className="p-6">
            <h4 className="font-medium mb-2">Holdings Analysis</h4>
            <p className="text-sm text-muted-foreground">
              You have followed 2 out of your last 3 recommendations. Your recommended stocks
              are performing well with an average return of 4.2%. Keep following our analysis
              for better returns.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerHoldings;
