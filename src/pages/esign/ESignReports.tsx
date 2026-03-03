import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Download, Calendar, BarChart3, PieChart, TrendingUp,
  FileText, Clock, CheckCircle2, Target
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell, LineChart, Line, Legend,
  FunnelChart, Funnel, LabelList
} from "recharts";

const monthlySent = [
  { month: "Oct", count: 65 }, { month: "Nov", count: 78 }, { month: "Dec", count: 92 },
  { month: "Jan", count: 104 }, { month: "Feb", count: 87 }, { month: "Mar", count: 89 },
];

const statusBreakdown = [
  { name: "Completed", value: 682, color: "hsl(160, 84%, 39%)" },
  { name: "Pending", value: 34, color: "hsl(38, 92%, 50%)" },
  { name: "Expired", value: 45, color: "hsl(0, 84%, 60%)" },
  { name: "Rejected", value: 12, color: "hsl(25, 95%, 53%)" },
];

const workflowUsage = [
  { name: "Standard", count: 312 }, { name: "Dual Signer", count: 187 },
  { name: "Quick Consent", count: 245 }, { name: "Board Res.", count: 29 },
];

const funnelData = [
  { name: "Sent", value: 1247, fill: "hsl(224, 76%, 33%)" },
  { name: "Opened", value: 1089, fill: "hsl(199, 89%, 48%)" },
  { name: "Viewed", value: 892, fill: "hsl(38, 92%, 50%)" },
  { name: "Signed", value: 682, fill: "hsl(160, 84%, 39%)" },
];

const detailedReport = [
  { date: "Mar 3", doc: "Investment Advisory Agreement", recipients: "Rahul Sharma", status: "Pending", time: "—" },
  { date: "Mar 2", doc: "Risk Disclosure Document", recipients: "Priya Patel, Amit Kumar", status: "Completed", time: "1d 5h" },
  { date: "Mar 1", doc: "Fee Structure Consent", recipients: "Vikram Singh", status: "Expired", time: "—" },
  { date: "Feb 28", doc: "KYC Authorization Form", recipients: "Meera Joshi", status: "Rejected", time: "—" },
  { date: "Feb 27", doc: "Annual Review Acknowledgment", recipients: "Arjun Nair", status: "Completed", time: "4h 20m" },
];

const statusColors: Record<string, string> = {
  Completed: "bg-[hsl(var(--success-light))] text-[hsl(var(--success))]",
  Pending: "bg-[hsl(var(--warning-light))] text-[hsl(var(--warning))]",
  Expired: "bg-[hsl(var(--destructive-light))] text-[hsl(var(--destructive))]",
  Rejected: "bg-[hsl(38,92%,96%)] text-[hsl(25,95%,53%)]",
};

export default function ESignReports() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("30d");

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/esign")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-sm text-muted-foreground">Document signing metrics and insights</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[160px]"><Calendar className="h-4 w-4 mr-1.5" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { label: "Documents Sent", value: "1,247", icon: FileText, color: "text-primary" },
            { label: "Completion Rate", value: "84.7%", icon: Target, color: "text-[hsl(var(--success))]" },
            { label: "Avg. Signing Time", value: "6h 42m", icon: Clock, color: "text-[hsl(var(--info))]" },
            { label: "Most Used Workflow", value: "Standard", icon: TrendingUp, color: "text-[hsl(var(--warning))]" },
          ].map((m) => (
            <Card key={m.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                  <m.icon className={`h-5 w-5 ${m.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{m.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Documents Sent Over Time</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={monthlySent}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(224, 76%, 33%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Documents by Status</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <RechartsPie>
                  <Pie data={statusBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {statusBreakdown.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Documents by Workflow</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={workflowUsage} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 88%)" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(160, 84%, 39%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base">Signing Completion Funnel</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3 py-4">
                {funnelData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-16">{item.name}</span>
                    <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center px-3"
                        style={{ width: `${(item.value / funnelData[0].value) * 100}%`, backgroundColor: item.fill }}
                      >
                        <span className="text-xs font-medium text-white">{item.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Table */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Detailed Report</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> CSV</Button>
                <Button variant="outline" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> Excel</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 px-3 font-medium">Date</th>
                    <th className="text-left py-2 px-3 font-medium">Document</th>
                    <th className="text-left py-2 px-3 font-medium">Recipients</th>
                    <th className="text-left py-2 px-3 font-medium">Status</th>
                    <th className="text-left py-2 px-3 font-medium">Time to Complete</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedReport.map((r, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-2 px-3">{r.date}</td>
                      <td className="py-2 px-3 font-medium">{r.doc}</td>
                      <td className="py-2 px-3 text-muted-foreground">{r.recipients}</td>
                      <td className="py-2 px-3"><Badge className={statusColors[r.status]}>{r.status}</Badge></td>
                      <td className="py-2 px-3 text-muted-foreground">{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}