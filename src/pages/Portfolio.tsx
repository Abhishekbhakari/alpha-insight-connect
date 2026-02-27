import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TrendingUp, TrendingDown, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Holding {
  stock: string;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
}

interface ClientPortfolio {
  id: number;
  name: string;
  totalPnL: number;
  holdings: Holding[];
}

const mockPortfolios: ClientPortfolio[] = [
  {
    id: 1, name: "Rajesh Kumar", totalPnL: 52000,
    holdings: [
      { stock: "TATA MOTORS", entryPrice: 400, currentPrice: 465, quantity: 100 },
      { stock: "HDFC BANK", entryPrice: 1580, currentPrice: 1695, quantity: 25 },
      { stock: "RELIANCE", entryPrice: 2500, currentPrice: 2680, quantity: 20 },
    ],
  },
  {
    id: 2, name: "Priya Sharma", totalPnL: 28500,
    holdings: [
      { stock: "TCS", entryPrice: 3800, currentPrice: 3950, quantity: 15 },
      { stock: "INFOSYS", entryPrice: 1450, currentPrice: 1520, quantity: 40 },
    ],
  },
  {
    id: 3, name: "Amit Singh", totalPnL: -4200,
    holdings: [
      { stock: "WIPRO", entryPrice: 450, currentPrice: 420, quantity: 80 },
      { stock: "BAJAJ FINANCE", entryPrice: 6800, currentPrice: 6650, quantity: 10 },
    ],
  },
  {
    id: 4, name: "Suresh Patel", totalPnL: 8000,
    holdings: [
      { stock: "TATA MOTORS", entryPrice: 405, currentPrice: 465, quantity: 50 },
    ],
  },
];

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [openClients, setOpenClients] = useState<Set<number>>(new Set());

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const toggle = (id: number) => {
    setOpenClients(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Shadow Portfolios</h1>
          <p className="text-muted-foreground">Track what clients claim they bought</p>
        </div>

        <div className="space-y-3">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)
          ) : (
            mockPortfolios.map(client => {
              const isOpen = openClients.has(client.id);
              return (
                <Card key={client.id}>
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => toggle(client.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.holdings.length} stocks in portfolio</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-bold text-lg ${client.totalPnL >= 0 ? "text-success" : "text-destructive"}`}>
                        {client.totalPnL >= 0 ? "+" : ""}₹{client.totalPnL.toLocaleString()}
                      </span>
                      {isOpen ? <ChevronDown className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                    </div>
                  </div>

                  {isOpen && (
                    <CardContent className="pt-0 pb-4">
                      <div className="border-t pt-4 space-y-3">
                        <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground uppercase tracking-wide px-2">
                          <span>Stock</span>
                          <span className="text-right">Entry Price</span>
                          <span className="text-right">Current Price</span>
                          <span className="text-right">Qty</span>
                          <span className="text-right">Unrealized P&L</span>
                        </div>
                        {client.holdings.map((h, i) => {
                          const pnl = (h.currentPrice - h.entryPrice) * h.quantity;
                          const pnlPct = ((h.currentPrice - h.entryPrice) / h.entryPrice * 100).toFixed(2);
                          return (
                            <div key={i} className="grid grid-cols-5 items-center px-2 py-2 rounded-lg hover:bg-muted/30">
                              <div className="flex items-center gap-2">
                                {pnl >= 0 ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-destructive" />}
                                <span className="font-medium">{h.stock}</span>
                              </div>
                              <span className="text-right">₹{h.entryPrice}</span>
                              <span className="text-right">₹{h.currentPrice}</span>
                              <span className="text-right">{h.quantity}</span>
                              <span className={`text-right font-semibold ${pnl >= 0 ? "text-success" : "text-destructive"}`}>
                                {pnl >= 0 ? "+" : ""}₹{pnl.toLocaleString()} ({pnlPct}%)
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Portfolio;
