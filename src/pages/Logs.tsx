import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Megaphone,
  Bot,
  FileSignature,
  Webhook,
  Search,
  CheckCheck,
  Check,
  XCircle,
  Filter,
} from "lucide-react";

type EventType = "broadcast_rec" | "daily_nudge" | "esign_reminder" | "webhook_reply";
type LogStatus = "sent" | "failed" | "read";

interface LogEntry {
  id: string;
  timestamp: string;
  clientName: string;
  clientPhone: string;
  eventType: EventType;
  status: LogStatus;
  message: string;
}

const eventTypeConfig: Record<EventType, { label: string; icon: React.ElementType; color: string }> = {
  broadcast_rec: { label: "Broadcast Rec", icon: Megaphone, color: "text-primary" },
  daily_nudge: { label: "Daily Nudge", icon: Bot, color: "text-[hsl(38,92%,50%)]" },
  esign_reminder: { label: "E-Sign Reminder", icon: FileSignature, color: "text-[hsl(199,89%,48%)]" },
  webhook_reply: { label: "Webhook Reply", icon: Webhook, color: "text-[hsl(160,84%,39%)]" },
};

const statusConfig: Record<LogStatus, { label: string; icon: React.ElementType; badgeClass: string }> = {
  sent: { label: "Sent", icon: Check, badgeClass: "bg-[hsl(38,92%,96%)] text-[hsl(38,92%,40%)] border-0" },
  read: { label: "Read", icon: CheckCheck, badgeClass: "bg-[hsl(160,84%,95%)] text-[hsl(160,84%,30%)] border-0" },
  failed: { label: "Failed", icon: XCircle, badgeClass: "bg-[hsl(0,84%,96%)] text-[hsl(0,84%,50%)] border-0" },
};

const mockLogs: LogEntry[] = [
  { id: "1", timestamp: "2025-02-28 09:15:32", clientName: "Rajesh Kumar", clientPhone: "+91 98765 43210", eventType: "broadcast_rec", status: "read", message: "Buy Call: TATAMOTORS @ ₹405 - Target ₹480" },
  { id: "2", timestamp: "2025-02-28 09:15:30", clientName: "Priya Sharma", clientPhone: "+91 87654 32109", eventType: "broadcast_rec", status: "sent", message: "Buy Call: TATAMOTORS @ ₹405 - Target ₹480" },
  { id: "3", timestamp: "2025-02-28 08:00:01", clientName: "Amit Patel", clientPhone: "+91 76543 21098", eventType: "daily_nudge", status: "read", message: "TATAMOTORS is still in the Buy Zone at ₹407. Don't miss out!" },
  { id: "4", timestamp: "2025-02-28 08:00:01", clientName: "Deepa Reddy", clientPhone: "+91 65432 10987", eventType: "daily_nudge", status: "sent", message: "RELIANCE is still in the Buy Zone at ₹2,430. Don't miss out!" },
  { id: "5", timestamp: "2025-02-27 18:30:00", clientName: "Suresh Nair", clientPhone: "+91 54321 09876", eventType: "esign_reminder", status: "read", message: "Reminder: Your agreement expires tomorrow. Please sign now." },
  { id: "6", timestamp: "2025-02-27 18:30:00", clientName: "Kavita Joshi", clientPhone: "+91 43210 98765", eventType: "esign_reminder", status: "failed", message: "Reminder: Your agreement expires today. Please sign now." },
  { id: "7", timestamp: "2025-02-27 14:22:10", clientName: "Vikram Singh", clientPhone: "+91 32109 87654", eventType: "webhook_reply", status: "read", message: "Client replied: I Bought This → TATAMOTORS added to Shadow Portfolio" },
  { id: "8", timestamp: "2025-02-27 14:20:05", clientName: "Neha Gupta", clientPhone: "+91 21098 76543", eventType: "webhook_reply", status: "read", message: "Client replied: Ignored → RELIANCE skipped" },
  { id: "9", timestamp: "2025-02-27 10:00:01", clientName: "Rohit Mehta", clientPhone: "+91 10987 65432", eventType: "daily_nudge", status: "sent", message: "HDFCBANK is still in the Buy Zone at ₹1,610. Don't miss out!" },
  { id: "10", timestamp: "2025-02-27 09:15:00", clientName: "Rajesh Kumar", clientPhone: "+91 98765 43210", eventType: "broadcast_rec", status: "read", message: "Sell Call: INFY @ ₹1,820 - Target ₹1,700" },
  { id: "11", timestamp: "2025-02-26 18:30:00", clientName: "Amit Patel", clientPhone: "+91 76543 21098", eventType: "esign_reminder", status: "sent", message: "Day 1 Reminder: Please sign your agreement to get started." },
  { id: "12", timestamp: "2025-02-26 15:45:00", clientName: "Deepa Reddy", clientPhone: "+91 65432 10987", eventType: "broadcast_rec", status: "failed", message: "Buy Call: SBIN @ ₹620 - Target ₹690" },
];

export default function Logs() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = mockLogs.filter((log) => {
    const matchesSearch =
      log.clientName.toLowerCase().includes(search.toLowerCase()) ||
      log.message.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || log.eventType === filterType;
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: mockLogs.length,
    sent: mockLogs.filter((l) => l.status === "sent").length,
    read: mockLogs.filter((l) => l.status === "read").length,
    failed: mockLogs.filter((l) => l.status === "failed").length,
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Communication Logs</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Read-only audit trail of all automated and manual communications
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Events</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[hsl(38,92%,50%)]">{stats.sent}</p>
              <p className="text-xs text-muted-foreground">Sent</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[hsl(160,84%,39%)]">{stats.read}</p>
              <p className="text-xs text-muted-foreground">Read</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[hsl(0,84%,60%)]">{stats.failed}</p>
              <p className="text-xs text-muted-foreground">Failed</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by client name or message..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="broadcast_rec">Broadcast Rec</SelectItem>
                  <SelectItem value="daily_nudge">Daily Nudge</SelectItem>
                  <SelectItem value="esign_reminder">E-Sign Reminder</SelectItem>
                  <SelectItem value="webhook_reply">Webhook Reply</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Log Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead className="w-[160px]">Event Type</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((log) => {
                    const eventConf = eventTypeConfig[log.eventType];
                    const statusConf = statusConfig[log.status];
                    const EventIcon = eventConf.icon;
                    const StatusIcon = statusConf.icon;
                    return (
                      <TableRow key={log.id}>
                        <TableCell className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium text-foreground">{log.clientName}</p>
                            <p className="text-xs text-muted-foreground">{log.clientPhone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <EventIcon className={`h-4 w-4 ${eventConf.color}`} />
                            <span className="text-xs font-medium">{eventConf.label}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConf.badgeClass}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConf.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[300px] truncate">
                          {log.message}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No logs found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
