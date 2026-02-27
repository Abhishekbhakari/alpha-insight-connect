import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download, Send, RefreshCw, Award, Calendar, TrendingUp, Star
} from "lucide-react";
import { useState, useEffect } from "react";

const Reports = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const renewalClients = [
    { name: "Rajesh Kumar", expires: "Mar 15, 2026", pnl: "+₹52,000", returns: "+18.4%", months: 11 },
    { name: "Anita Desai", expires: "Mar 20, 2026", pnl: "+₹42,000", returns: "+15.2%", months: 11 },
    { name: "Suresh Patel", expires: "Mar 08, 2026", pnl: "+₹8,000", returns: "+4.1%", months: 11 },
  ];

  const quarterlyReports = [
    { name: "Amit Singh", quarter: "Q4 2025", pnl: "+₹38,000", winRate: "80%", trades: 15, badge: "Gold" },
    { name: "Priya Sharma", quarter: "Q4 2025", pnl: "+₹28,500", winRate: "75%", trades: 12, badge: "Silver" },
    { name: "Vikram Joshi", quarter: "Q4 2025", pnl: "+₹15,600", winRate: "67%", trades: 9, badge: "Bronze" },
  ];

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6 p-6">
          <Skeleton className="h-10 w-64" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Visual report generation gallery</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 11th Month Renewal Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                11th Month Renewal — Year in Review
              </CardTitle>
              <CardDescription>
                Auto-generated review images for clients approaching expiry
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {renewalClients.map((client, i) => (
                <div key={i} className="border rounded-xl overflow-hidden">
                  {/* Report Card Preview */}
                  <div className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs opacity-75">Year in Review</p>
                        <p className="text-lg font-bold">{client.name}</p>
                      </div>
                      <Star className="h-6 w-6 opacity-75" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xl font-bold">{client.pnl}</p>
                        <p className="text-[10px] opacity-75">Total P&L</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold">{client.returns}</p>
                        <p className="text-[10px] opacity-75">Returns</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold">{client.months}mo</p>
                        <p className="text-[10px] opacity-75">With Us</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between bg-card">
                    <p className="text-xs text-muted-foreground">Expires: {client.expires}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm"><RefreshCw className="h-3 w-3 mr-1" />Regenerate</Button>
                      <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                        <Send className="h-3 w-3 mr-1" />WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quarterly Performance Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-success" />
                Quarterly Performance Certificates
              </CardTitle>
              <CardDescription>
                "Certificate of Profit" cards sent to WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quarterlyReports.map((client, i) => (
                <div key={i} className="border rounded-xl overflow-hidden">
                  {/* Certificate Preview */}
                  <div className="bg-gradient-to-br from-success to-success/80 text-success-foreground p-5 text-center">
                    <Award className="h-10 w-10 mx-auto mb-2 opacity-80" />
                    <p className="text-[10px] uppercase tracking-widest opacity-75">Certificate of Profit</p>
                    <p className="text-lg font-bold mt-1">{client.name}</p>
                    <p className="text-3xl font-bold mt-2">{client.pnl}</p>
                    <div className="mt-3 flex justify-center gap-4 text-xs">
                      <span>Win Rate: {client.winRate}</span>
                      <span>Trades: {client.trades}</span>
                    </div>
                    <Badge className="mt-3 bg-white/20 text-white border-0">{client.badge} Performer</Badge>
                  </div>
                  <div className="p-3 flex items-center justify-between bg-card">
                    <p className="text-xs text-muted-foreground">{client.quarter}</p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm"><RefreshCw className="h-3 w-3 mr-1" />Regenerate</Button>
                      <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                        <Send className="h-3 w-3 mr-1" />WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Reports;
