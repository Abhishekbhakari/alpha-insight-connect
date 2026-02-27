import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Plus, Search, MessageSquare, AlertTriangle, CheckCircle, Clock, Send, X,
  TrendingUp, TrendingDown
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Client {
  id: number;
  name: string;
  phone: string;
  subscriptionEnd: string;
  daysLeft: number;
  esignStatus: "signed" | "sent" | "pending";
  esignDays: number;
  totalPnL: number;
  trades: number;
}

const mockClients: Client[] = [
  { id: 1, name: "Rajesh Kumar", phone: "+91 98765 43210", subscriptionEnd: "2026-08-15", daysLeft: 168, esignStatus: "signed", esignDays: 0, totalPnL: 52000, trades: 18 },
  { id: 2, name: "Priya Sharma", phone: "+91 87654 32109", subscriptionEnd: "2026-04-10", daysLeft: 42, esignStatus: "signed", esignDays: 0, totalPnL: 28500, trades: 12 },
  { id: 3, name: "Amit Singh", phone: "+91 76543 21098", subscriptionEnd: "2026-03-20", daysLeft: 21, esignStatus: "sent", esignDays: 2, totalPnL: 38000, trades: 15 },
  { id: 4, name: "Suresh Patel", phone: "+91 65432 10987", subscriptionEnd: "2026-03-08", daysLeft: 9, esignStatus: "pending", esignDays: 5, totalPnL: 8000, trades: 5 },
  { id: 5, name: "Meera Gupta", phone: "+91 54321 09876", subscriptionEnd: "2026-03-05", daysLeft: 6, esignStatus: "sent", esignDays: 4, totalPnL: -2500, trades: 3 },
  { id: 6, name: "Vikram Joshi", phone: "+91 43210 98765", subscriptionEnd: "2026-06-22", daysLeft: 115, esignStatus: "pending", esignDays: 1, totalPnL: 15600, trades: 9 },
  { id: 7, name: "Anita Desai", phone: "+91 32109 87654", subscriptionEnd: "2026-05-18", daysLeft: 80, esignStatus: "signed", esignDays: 0, totalPnL: 42000, trades: 20 },
];

const Clients = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = mockClients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const getSubColor = (days: number) => {
    if (days > 30) return "text-success";
    if (days > 10) return "text-warning";
    return "text-destructive";
  };

  const getEsignBadge = (status: string) => {
    if (status === "signed") return <Badge className="bg-success/15 text-success border-0"><CheckCircle className="h-3 w-3 mr-1" />Signed</Badge>;
    if (status === "sent") return <Badge className="bg-warning/15 text-warning border-0"><Clock className="h-3 w-3 mr-1" />Sent</Badge>;
    return <Badge className="bg-muted text-muted-foreground border-0"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Clients</h1>
            <p className="text-muted-foreground">Manage your 250+ client base</p>
          </div>
          <Button onClick={() => navigate("/clients/add")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Subscription End</TableHead>
                    <TableHead>E-Sign Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        {Array.from({ length: 5 }).map((_, j) => (
                          <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    filtered.map((client) => (
                      <TableRow
                        key={client.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedClient(client)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{client.name}</span>
                            {client.esignStatus === "pending" && client.esignDays > 3 && (
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{client.phone}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${getSubColor(client.daysLeft)}`}>
                            {client.subscriptionEnd}
                          </span>
                          <p className={`text-xs ${getSubColor(client.daysLeft)}`}>
                            {client.daysLeft} days left
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getEsignBadge(client.esignStatus)}
                            {client.esignStatus === "sent" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => { e.stopPropagation(); }}
                                title="Send WhatsApp Nudge"
                              >
                                <MessageSquare className="h-4 w-4 text-success" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedClient(client); }}>
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Detail Drawer */}
      <Sheet open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          {selectedClient && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedClient.name}</SheetTitle>
                <SheetDescription>{selectedClient.phone}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
                    {selectedClient.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{selectedClient.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                    {getEsignBadge(selectedClient.esignStatus)}
                  </div>
                </div>

                {/* Subscription Timeline */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Subscription Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">12-month plan</span>
                        <span className={`font-medium ${getSubColor(selectedClient.daysLeft)}`}>
                          {selectedClient.daysLeft} days remaining
                        </span>
                      </div>
                      <Progress
                        value={Math.max(0, ((365 - selectedClient.daysLeft) / 365) * 100)}
                        className="h-3"
                      />
                      <p className="text-xs text-muted-foreground">
                        Expires: {selectedClient.subscriptionEnd}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Portfolio Summary */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Shadow Portfolio Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Trades</p>
                        <p className="text-2xl font-bold">{selectedClient.trades}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total P&L</p>
                        <p className={`text-2xl font-bold ${selectedClient.totalPnL >= 0 ? "text-success" : "text-destructive"}`}>
                          {selectedClient.totalPnL >= 0 ? "+" : ""}₹{selectedClient.totalPnL.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Send WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => { setSelectedClient(null); navigate(`/clients/${selectedClient.id}`); }}>
                    Full Profile
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

export default Clients;
