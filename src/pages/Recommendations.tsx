import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus, TrendingUp, TrendingDown, Target, CheckCircle, XCircle, Smartphone
} from "lucide-react";
import { useState, useEffect } from "react";

const activeCalls = [
  { id: 1, stock: "TATA MOTORS", type: "Buy", entryMin: 400, entryMax: 410, target: 450, sl: 380, cutoff: 420, current: 405, status: "active", pnl: 1.25 },
  { id: 2, stock: "HDFC BANK", type: "Buy", entryMin: 1580, entryMax: 1600, target: 1700, sl: 1520, cutoff: 1620, current: 1695, status: "near_target", pnl: 7.28 },
  { id: 3, stock: "TCS", type: "Sell", entryMin: 3800, entryMax: 3850, target: 3600, sl: 3950, cutoff: 3750, current: 3550, status: "target_hit", pnl: 6.58 },
  { id: 4, stock: "INFOSYS", type: "Buy", entryMin: 1450, entryMax: 1470, target: 1550, sl: 1400, cutoff: 1480, current: 1395, status: "sl_hit", pnl: -3.79 },
];

const historyCalls = [
  { id: 5, stock: "RELIANCE", type: "Buy", entry: 2500, target: 2700, sl: 2400, exit: 2690, status: "target_hit", pnl: 7.6, date: "Jan 15, 2026" },
  { id: 6, stock: "BAJAJ FINANCE", type: "Buy", entry: 6800, target: 7200, sl: 6500, exit: 7180, status: "target_hit", pnl: 5.59, date: "Jan 10, 2026" },
  { id: 7, stock: "WIPRO", type: "Sell", entry: 450, target: 400, sl: 480, exit: 485, status: "sl_hit", pnl: -7.78, date: "Jan 5, 2026" },
];

const Recommendations = () => {
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ symbol: "", type: "Buy", entryMin: "", entryMax: "", target: "", sl: "", cutoff: "" });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const statusBadge = (status: string) => {
    if (status === "active") return <Badge className="bg-primary text-primary-foreground"><Target className="h-3 w-3 mr-1" />Active</Badge>;
    if (status === "near_target") return <Badge className="bg-success text-success-foreground"><TrendingUp className="h-3 w-3 mr-1" />Near Target</Badge>;
    if (status === "target_hit") return <Badge className="bg-success text-success-foreground"><CheckCircle className="h-3 w-3 mr-1" />Target Hit</Badge>;
    return <Badge className="bg-destructive text-destructive-foreground"><XCircle className="h-3 w-3 mr-1" />SL Hit</Badge>;
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Recommendations</h1>
            <p className="text-muted-foreground">Core trading calls interface</p>
          </div>

          <Dialog open={formOpen} onOpenChange={setFormOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" />Create New Call</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create New Recommendation</DialogTitle>
              </DialogHeader>
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Stock Symbol</Label>
                    <Input
                      placeholder="e.g. TATAMOTORS"
                      value={form.symbol}
                      onChange={e => setForm({ ...form, symbol: e.target.value.toUpperCase() })}
                      className="uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buy">Buy</SelectItem>
                        <SelectItem value="Sell">Sell</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Entry Min (₹)</Label>
                      <Input type="number" value={form.entryMin} onChange={e => setForm({ ...form, entryMin: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Entry Max (₹)</Label>
                      <Input type="number" value={form.entryMax} onChange={e => setForm({ ...form, entryMax: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Target Price (₹)</Label>
                      <Input type="number" value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Stop Loss (₹)</Label>
                      <Input type="number" value={form.sl} onChange={e => setForm({ ...form, sl: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cutoff Price (₹)</Label>
                    <p className="text-xs text-muted-foreground">Price above which clients should NOT buy</p>
                    <Input type="number" value={form.cutoff} onChange={e => setForm({ ...form, cutoff: e.target.value })} />
                  </div>
                  <Button className="w-full" onClick={() => setFormOpen(false)}>
                    Publish Call
                  </Button>
                </div>

                {/* WhatsApp Preview */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    WhatsApp Message Preview
                  </Label>
                  <div className="bg-[hsl(142,70%,95%)] rounded-2xl p-4 border shadow-sm max-w-xs mx-auto">
                    <div className="bg-card rounded-xl p-4 shadow-sm space-y-2">
                      <p className="font-bold text-sm">📊 Smart-Nudge Alert</p>
                      <div className="border-l-4 border-success pl-3">
                        <p className="font-semibold">{form.symbol || "STOCK"}</p>
                        <p className="text-sm">Action: <span className={form.type === "Buy" ? "text-success font-bold" : "text-destructive font-bold"}>{form.type}</span></p>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>Entry: ₹{form.entryMin || "---"} - ₹{form.entryMax || "---"}</p>
                        <p>Target: ₹{form.target || "---"}</p>
                        <p>Stop Loss: ₹{form.sl || "---"}</p>
                      </div>
                      <div className="pt-2 flex gap-2">
                        <div className="flex-1 bg-success/20 text-success text-center py-2 rounded-lg text-sm font-medium">
                          ✅ I Bought This
                        </div>
                        <div className="flex-1 bg-muted text-muted-foreground text-center py-2 rounded-lg text-sm font-medium">
                          ❌ Ignored
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2 text-right">9:15 AM ✓✓</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active ({activeCalls.length})</TabsTrigger>
            <TabsTrigger value="history">History ({historyCalls.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-28" />)
            ) : (
              activeCalls.map(call => (
                <Card key={call.id} className={
                  call.status === "target_hit" ? "border-success/30" :
                  call.status === "sl_hit" ? "border-destructive/30" : ""
                }>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                          call.pnl >= 0 ? "bg-success/15" : "bg-destructive/15"
                        }`}>
                          {call.pnl >= 0 ? <TrendingUp className="h-6 w-6 text-success" /> : <TrendingDown className="h-6 w-6 text-destructive" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-lg">{call.stock}</p>
                            <Badge variant={call.type === "Buy" ? "default" : "destructive"} className="text-xs">{call.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Entry: ₹{call.entryMin}-{call.entryMax} · Target: ₹{call.target} · SL: ₹{call.sl}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="font-semibold text-lg">₹{call.current}</p>
                          <p className="text-xs text-muted-foreground">Live Price</p>
                        </div>
                        <div className={`text-right font-bold text-lg ${call.pnl >= 0 ? "text-success" : "text-destructive"}`}>
                          {call.pnl >= 0 ? "+" : ""}{call.pnl}%
                        </div>
                        {statusBadge(call.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {historyCalls.map(call => (
              <Card key={call.id} className={call.status === "target_hit" ? "border-success/20" : "border-destructive/20"}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        call.pnl >= 0 ? "bg-success/15" : "bg-destructive/15"
                      }`}>
                        {call.pnl >= 0 ? <TrendingUp className="h-5 w-5 text-success" /> : <TrendingDown className="h-5 w-5 text-destructive" />}
                      </div>
                      <div>
                        <p className="font-bold">{call.stock} <span className="text-muted-foreground font-normal text-sm">· {call.type}</span></p>
                        <p className="text-sm text-muted-foreground">
                          Entry ₹{call.entry} → Exit ₹{call.exit} · {call.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`font-bold ${call.pnl >= 0 ? "text-success" : "text-destructive"}`}>
                        {call.pnl >= 0 ? "+" : ""}{call.pnl}%
                      </span>
                      {statusBadge(call.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Recommendations;
