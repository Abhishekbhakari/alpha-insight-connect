import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Download, FileText, Send, XCircle, CheckCircle2, Clock,
  Eye, RefreshCw, Mail, Phone, MapPin, Shield, ExternalLink,
  FileCheck, ScrollText
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const document = {
  id: "DOC-A1x9kE",
  name: "Investment Advisory Agreement",
  status: "pending",
  workflow: "Standard Agreement",
  irn: "IRN-2026-0042",
  sentBy: "Admin (You)",
  sentDate: "2026-03-01 10:30 AM",
  expiryDate: "2026-03-08 10:30 AM",
  customMessage: "Please review and sign the agreement at your earliest convenience.",
  pages: 8,
};

const recipients = [
  {
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    status: "signed",
    signedAt: "2026-03-02 03:45 PM",
    activity: [
      { event: "Link sent via Email & WhatsApp", time: "Mar 1, 10:30 AM" },
      { event: "Document opened from Mumbai, India", time: "Mar 1, 02:15 PM" },
      { event: "OTP verified successfully", time: "Mar 2, 03:44 PM" },
      { event: "Document signed", time: "Mar 2, 03:45 PM" },
    ],
  },
  {
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 87654 32100",
    status: "pending",
    signedAt: null,
    activity: [
      { event: "Link sent via Email & WhatsApp", time: "Mar 1, 10:30 AM" },
      { event: "Reminder sent", time: "Mar 2, 10:30 AM" },
      { event: "Document opened from Delhi, India", time: "Mar 2, 11:00 AM" },
    ],
  },
];

const allActivity = [
  { event: "Document created and sent for signing", time: "Mar 1, 10:30 AM", type: "info" },
  { event: "Signing link opened by Rahul Sharma", time: "Mar 1, 02:15 PM", type: "info" },
  { event: "Reminder sent to all pending recipients", time: "Mar 2, 10:30 AM", type: "warning" },
  { event: "Document opened by Priya Patel", time: "Mar 2, 11:00 AM", type: "info" },
  { event: "Rahul Sharma signed the document", time: "Mar 2, 03:45 PM", type: "success" },
];

const statusIcon: Record<string, React.ReactNode> = {
  signed: <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />,
  pending: <Clock className="h-5 w-5 text-[hsl(var(--warning))]" />,
  rejected: <XCircle className="h-5 w-5 text-[hsl(var(--destructive))]" />,
};

const statusBadge: Record<string, string> = {
  signed: "bg-[hsl(var(--success-light))] text-[hsl(var(--success))]",
  pending: "bg-[hsl(var(--warning-light))] text-[hsl(var(--warning))]",
  rejected: "bg-[hsl(var(--destructive-light))] text-[hsl(var(--destructive))]",
};

const activityDot: Record<string, string> = {
  info: "bg-[hsl(var(--info))]",
  success: "bg-[hsl(var(--success))]",
  warning: "bg-[hsl(var(--warning))]",
};

export default function DocumentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/esign")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">{document.name}</h1>
                <Badge className={statusBadge[document.status]}>{document.status.charAt(0).toUpperCase() + document.status.slice(1)}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{document.id} • {document.irn}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1.5"><Download className="h-4 w-4" /> Download Document</Button>
            <Button variant="outline" className="gap-1.5"><ScrollText className="h-4 w-4" /> Download Audit Trail</Button>
            <Button variant="outline" className="gap-1.5"><Send className="h-4 w-4" /> Resend</Button>
            <Button variant="outline" className="gap-1.5 text-[hsl(var(--destructive))]"><XCircle className="h-4 w-4" /> Cancel</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Document Preview */}
          <div className="xl:col-span-3">
            <Card className="h-full">
              <CardContent className="p-0">
                <div className="bg-muted/30 flex flex-col items-center justify-center min-h-[500px] rounded-lg">
                  <FileText className="h-20 w-20 text-primary/20 mb-4" />
                  <p className="text-lg font-medium text-foreground">{document.name}</p>
                  <p className="text-sm text-muted-foreground">{document.pages} pages • PDF</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" /> View Full Document</Button>
                    <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Download</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tracking Panel */}
          <div className="xl:col-span-2 space-y-4">
            {/* Progress Timeline */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Signing Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recipients.map((r, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {statusIcon[r.status]}
                        <div>
                          <p className="font-medium text-sm text-foreground">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.email}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${statusBadge[r.status]}`}>
                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                      </Badge>
                    </div>
                    {r.status === "pending" && (
                      <div className="flex gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 text-xs"><Send className="h-3 w-3 mr-1" /> Remind</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs"><RefreshCw className="h-3 w-3 mr-1" /> Resend Link</Button>
                      </div>
                    )}
                    {r.status === "signed" && (
                      <div className="flex gap-1.5">
                        <Button size="sm" variant="outline" className="h-7 text-xs"><FileCheck className="h-3 w-3 mr-1" /> View Signature</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs"><Download className="h-3 w-3 mr-1" /> Certificate</Button>
                      </div>
                    )}
                    {/* Activity Log */}
                    <div className="pl-2 border-l-2 border-border space-y-2 pt-1">
                      {r.activity.map((a, j) => (
                        <div key={j} className="text-xs">
                          <p className="text-foreground">{a.event}</p>
                          <p className="text-muted-foreground">{a.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Document Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Document Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 text-sm">
                {[
                  ["Workflow", document.workflow],
                  ["Sent by", document.sentBy],
                  ["Sent Date", document.sentDate],
                  ["Expiry Date", document.expiryDate],
                  ["IRN", document.irn],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium text-foreground">{value}</span>
                  </div>
                ))}
                {document.customMessage && (
                  <>
                    <Separator />
                    <div>
                      <span className="text-muted-foreground text-xs">Message</span>
                      <p className="text-sm text-foreground mt-1">{document.customMessage}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Full Activity Log */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allActivity.map((a, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="relative mt-1.5">
                        <div className={`h-2 w-2 rounded-full ${activityDot[a.type]}`} />
                        {i < allActivity.length - 1 && <div className="absolute top-3 left-[3px] w-px h-full bg-border" />}
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{a.event}</p>
                        <p className="text-xs text-muted-foreground">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}