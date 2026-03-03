import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText, Send, Upload, Clock, CheckCircle2, AlertTriangle,
  ArrowUpRight, ArrowDownRight, Search, Filter, MoreHorizontal,
  Eye, RefreshCw, Download, Plus, FileSpreadsheet, Workflow,
  Activity
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const stats = [
  { title: "Total Documents Sent", value: "1,247", trend: "+12.5%", up: true, icon: Send, color: "text-primary" },
  { title: "Pending Signatures", value: "34", trend: "5 urgent", up: false, icon: Clock, color: "text-[hsl(var(--warning))]" },
  { title: "Completed This Month", value: "89", trend: "+8.3%", up: true, icon: CheckCircle2, color: "text-[hsl(var(--success))]" },
  { title: "Expiring Soon", value: "7", trend: "Next 48h", up: false, icon: AlertTriangle, color: "text-[hsl(var(--destructive))]" },
];

const recentDocuments = [
  { id: "DOC-A1x9kE", name: "Investment Advisory Agreement", recipients: ["Rahul Sharma"], status: "completed", sentDate: "2026-03-01", workflow: "Standard" },
  { id: "DOC-B2y8jD", name: "Risk Disclosure Document", recipients: ["Priya Patel", "Amit Kumar"], status: "pending", sentDate: "2026-03-02", workflow: "Dual Signer" },
  { id: "DOC-C3z7iC", name: "Portfolio Management Agreement", recipients: ["Sneha Reddy"], status: "pending", sentDate: "2026-03-03", workflow: "Standard" },
  { id: "DOC-D4w6hB", name: "Fee Structure Consent", recipients: ["Vikram Singh"], status: "expired", sentDate: "2026-02-25", workflow: "Quick Sign" },
  { id: "DOC-E5v5gA", name: "KYC Authorization Form", recipients: ["Meera Joshi"], status: "rejected", sentDate: "2026-02-28", workflow: "Aadhaar eSign" },
  { id: "DOC-F6u4fZ", name: "Annual Review Acknowledgment", recipients: ["Arjun Nair"], status: "completed", sentDate: "2026-02-27", workflow: "Standard" },
];

const activityFeed = [
  { text: "Rahul Sharma signed Investment Advisory Agreement", time: "2 mins ago", type: "success" },
  { text: "Reminder sent to Priya Patel for Risk Disclosure", time: "15 mins ago", type: "info" },
  { text: "Vikram Singh's Fee Structure Consent expired", time: "1 hour ago", type: "warning" },
  { text: "Meera Joshi rejected KYC Authorization Form", time: "2 hours ago", type: "error" },
  { text: "Sneha Reddy opened Portfolio Management Agreement", time: "3 hours ago", type: "info" },
  { text: "Bulk upload completed: 12 documents sent", time: "5 hours ago", type: "success" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-[hsl(var(--warning-light))] text-[hsl(var(--warning))] border-[hsl(var(--warning)/0.3)]" },
  completed: { label: "Completed", className: "bg-[hsl(var(--success-light))] text-[hsl(var(--success))] border-[hsl(var(--success)/0.3)]" },
  expired: { label: "Expired", className: "bg-[hsl(var(--destructive-light))] text-[hsl(var(--destructive))] border-[hsl(var(--destructive)/0.3)]" },
  rejected: { label: "Rejected", className: "bg-[hsl(38,92%,96%)] text-[hsl(25,95%,53%)] border-[hsl(25,95%,53%,0.3)]" },
};

const activityColors: Record<string, string> = {
  success: "bg-[hsl(var(--success))]",
  info: "bg-[hsl(var(--info))]",
  warning: "bg-[hsl(var(--warning))]",
  error: "bg-[hsl(var(--destructive))]",
};

export default function ESignDashboard() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = recentDocuments.filter((d) => {
    if (statusFilter !== "all" && d.status !== statusFilter) return false;
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase()) && !d.recipients.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    return true;
  });

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">eSign Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your document signing workflow</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--success))] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[hsl(var(--success))]" />
              </span>
              <span className="text-muted-foreground">Leegality API Connected</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <Card key={s.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">{s.title}</span>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-foreground">{s.value}</span>
                  <Badge variant="outline" className={`text-xs ${s.up ? "text-[hsl(var(--success))]" : "text-[hsl(var(--destructive))]"}`}>
                    {s.up ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                    {s.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button size="lg" className="h-14 text-base gap-2" onClick={() => navigate("/esign/send")}>
            <Plus className="h-5 w-5" /> Send New Document
          </Button>
          <Button size="lg" variant="outline" className="h-14 text-base gap-2" onClick={() => navigate("/esign/bulk")}>
            <FileSpreadsheet className="h-5 w-5" /> Upload Bulk via Excel
          </Button>
          <Button size="lg" variant="outline" className="h-14 text-base gap-2" onClick={() => navigate("/esign/workflows")}>
            <Workflow className="h-5 w-5" /> Create Workflow Template
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Documents Table */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Documents</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search documents..."
                        className="pl-8 h-9 w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <Filter className="h-3.5 w-3.5 mr-1.5" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-left py-3 px-3 font-medium">Document</th>
                        <th className="text-left py-3 px-3 font-medium">Recipient(s)</th>
                        <th className="text-left py-3 px-3 font-medium">Status</th>
                        <th className="text-left py-3 px-3 font-medium">Sent Date</th>
                        <th className="text-right py-3 px-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((doc) => (
                        <tr key={doc.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary shrink-0" />
                              <div>
                                <p className="font-medium text-foreground">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">{doc.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground">{doc.recipients.join(", ")}</td>
                          <td className="py-3 px-3">
                            <Badge variant="outline" className={statusConfig[doc.status]?.className}>
                              {statusConfig[doc.status]?.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-3 text-muted-foreground">{doc.sentDate}</td>
                          <td className="py-3 px-3">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/esign/documents/${doc.id}`)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              {doc.status === "pending" && (
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              )}
                              {doc.status === "completed" && (
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Activity
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="relative mt-1.5">
                      <div className={`h-2 w-2 rounded-full ${activityColors[a.type]}`} />
                      {i < activityFeed.length - 1 && <div className="absolute top-3 left-[3px] w-px h-full bg-border" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{a.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}