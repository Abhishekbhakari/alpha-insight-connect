import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Phone,
  User,
  Mail,
  Copy,
  XCircle,
  Download,
  FileText,
  ShieldCheck,
  Plus,
  Search,
  Upload,
  Loader2,
  Link2,
  ClipboardCheck,
  ExternalLink,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// --- Types ---
type ESignStatus = "in_progress" | "completed" | "expired";

interface ESignDocument {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  leegalityDocId: string;
  signUrl: string;
  irn: string;
  status: ESignStatus;
  sentDate: string;
  completedDate?: string;
  expiresAt: string;
  hoursRemaining: number;
  nudges: { day: number; status: "sent" | "pending" | "skipped" }[];
  webhookVerified?: boolean;
  templateUsed: boolean;
}

// --- Mock Data ---
const mockDocuments: ESignDocument[] = [
  {
    id: "1", clientName: "Rajesh Kumar", clientPhone: "+91 98765 43210", clientEmail: "rajesh@email.com",
    leegalityDocId: "DOC-XX9jECv", signUrl: "https://app.leegality.com/sign/XX9jECv",
    irn: "IRN-2025-001", status: "in_progress", sentDate: "2026-02-28",
    expiresAt: "2026-03-03", hoursRemaining: 52,
    nudges: [{ day: 1, status: "sent" }, { day: 2, status: "pending" }, { day: 3, status: "pending" }],
    templateUsed: true,
  },
  {
    id: "2", clientName: "Priya Sharma", clientPhone: "+91 87654 32109", clientEmail: "priya@email.com",
    leegalityDocId: "DOC-AB3kLMn", signUrl: "https://app.leegality.com/sign/AB3kLMn",
    irn: "IRN-2025-002", status: "in_progress", sentDate: "2026-02-27",
    expiresAt: "2026-03-02", hoursRemaining: 18,
    nudges: [{ day: 1, status: "sent" }, { day: 2, status: "sent" }, { day: 3, status: "pending" }],
    templateUsed: true,
  },
  {
    id: "3", clientName: "Amit Patel", clientPhone: "+91 76543 21098", clientEmail: "amit@email.com",
    leegalityDocId: "DOC-QR7wYZp", signUrl: "https://app.leegality.com/sign/QR7wYZp",
    irn: "IRN-2025-003", status: "in_progress", sentDate: "2026-02-26",
    expiresAt: "2026-03-01", hoursRemaining: 2,
    nudges: [{ day: 1, status: "sent" }, { day: 2, status: "sent" }, { day: 3, status: "sent" }],
    templateUsed: false,
  },
  {
    id: "4", clientName: "Vikram Singh", clientPhone: "+91 32109 87654", clientEmail: "vikram@email.com",
    leegalityDocId: "DOC-FG5tUVw", signUrl: "",
    irn: "IRN-2025-004", status: "completed", sentDate: "2026-02-22", completedDate: "2026-02-23",
    expiresAt: "2026-02-25", hoursRemaining: 0,
    nudges: [{ day: 1, status: "sent" }, { day: 2, status: "skipped" }, { day: 3, status: "skipped" }],
    webhookVerified: true, templateUsed: true,
  },
  {
    id: "5", clientName: "Neha Gupta", clientPhone: "+91 21098 76543", clientEmail: "neha@email.com",
    leegalityDocId: "DOC-HJ8mNOq", signUrl: "",
    irn: "IRN-2025-005", status: "completed", sentDate: "2026-02-20", completedDate: "2026-02-22",
    expiresAt: "2026-02-23", hoursRemaining: 0,
    nudges: [{ day: 1, status: "sent" }, { day: 2, status: "sent" }, { day: 3, status: "skipped" }],
    webhookVerified: true, templateUsed: true,
  },
  {
    id: "6", clientName: "Suresh Nair", clientPhone: "+91 54321 09876", clientEmail: "suresh@email.com",
    leegalityDocId: "DOC-KL2pQRs", signUrl: "https://app.leegality.com/sign/KL2pQRs",
    irn: "IRN-2025-006", status: "expired", sentDate: "2026-02-20",
    expiresAt: "2026-02-23", hoursRemaining: 0,
    nudges: [{ day: 1, status: "sent" }, { day: 2, status: "sent" }, { day: 3, status: "sent" }],
    templateUsed: true,
  },
  {
    id: "7", clientName: "Kavita Joshi", clientPhone: "+91 43210 98765", clientEmail: "kavita@email.com",
    leegalityDocId: "DOC-MN4rSTu", signUrl: "",
    irn: "IRN-2025-007", status: "expired", sentDate: "2026-02-18",
    expiresAt: "2026-02-21", hoursRemaining: 0,
    nudges: [{ day: 1, status: "sent" }, { day: 2, status: "sent" }, { day: 3, status: "sent" }],
    templateUsed: false,
  },
];

const mockClients = [
  { id: "c1", name: "Deepa Reddy", phone: "+91 65432 10987", email: "deepa@email.com" },
  { id: "c2", name: "Rohit Mehta", phone: "+91 10987 65432", email: "rohit@email.com" },
  { id: "c3", name: "Ananya Das", phone: "+91 99887 76655", email: "ananya@email.com" },
  { id: "c4", name: "Karan Malhotra", phone: "+91 88776 65544", email: "karan@email.com" },
];

// --- Subcomponents ---

function ApiStatusIndicator({ connected }: { connected: boolean }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-card text-sm">
      {connected ? (
        <>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--success))] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[hsl(var(--success))]" />
          </span>
          <span className="text-muted-foreground font-medium">Leegality API</span>
          <Badge className="bg-[hsl(var(--success-light))] text-[hsl(var(--success))] border-0 text-[10px] px-1.5">
            Sandbox
          </Badge>
        </>
      ) : (
        <>
          <WifiOff className="h-3.5 w-3.5 text-[hsl(var(--destructive))]" />
          <span className="text-muted-foreground font-medium">Leegality API</span>
          <Badge className="bg-[hsl(var(--destructive-light))] text-[hsl(var(--destructive))] border-0 text-[10px] px-1.5">
            Disconnected
          </Badge>
        </>
      )}
    </div>
  );
}

function ValidityBadge({ hoursRemaining, status }: { hoursRemaining: number; status: ESignStatus }) {
  if (status === "completed") {
    return (
      <Badge className="bg-[hsl(var(--success))] text-white border-0 text-xs font-bold gap-1">
        <CheckCircle2 className="h-3 w-3" /> Signed
      </Badge>
    );
  }
  if (status === "expired" || hoursRemaining <= 0) {
    return (
      <Badge className="bg-[hsl(var(--destructive))] text-white border-0 text-xs font-bold">
        ❌ Expired
      </Badge>
    );
  }
  if (hoursRemaining <= 12) {
    return (
      <Badge className="bg-[hsl(var(--destructive))] text-white border-0 text-xs font-bold animate-pulse">
        🚨 Expires in {hoursRemaining}h
      </Badge>
    );
  }
  if (hoursRemaining <= 36) {
    return (
      <Badge className="bg-[hsl(var(--warning))] text-[hsl(var(--warning-foreground))] border-0 text-xs font-bold">
        ⏳ Expires in {hoursRemaining}h
      </Badge>
    );
  }
  return (
    <Badge className="bg-[hsl(var(--success))] text-white border-0 text-xs font-bold">
      ✓ {hoursRemaining}h remaining
    </Badge>
  );
}

function NudgeTracker({ nudges }: { nudges: ESignDocument["nudges"] }) {
  return (
    <div className="space-y-1.5">
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">WhatsApp Nudges</span>
      <div className="flex items-center gap-3">
        {nudges.map((n, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className={`h-3 w-3 rounded-full border-2 flex items-center justify-center ${
                n.status === "sent"
                  ? "bg-[hsl(var(--success))] border-[hsl(var(--success))]"
                  : n.status === "skipped"
                  ? "bg-muted border-border"
                  : "bg-transparent border-[hsl(var(--warning))]"
              }`}
            >
              {n.status === "sent" && <CheckCircle2 className="h-2 w-2 text-white" />}
            </div>
            <span className={`text-[10px] ${n.status === "sent" ? "text-[hsl(var(--success))] font-medium" : "text-muted-foreground"}`}>
              Day {n.day}: {n.status === "sent" ? "Sent" : n.status === "skipped" ? "Skipped" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActiveRequestCard({
  doc,
  onCancel,
}: {
  doc: ESignDocument;
  onCancel: (id: string) => void;
}) {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(doc.signUrl);
    toast.success("Signing URL copied to clipboard");
  };

  const borderColor =
    doc.hoursRemaining <= 12
      ? "border-l-[hsl(var(--destructive))]"
      : doc.hoursRemaining <= 36
      ? "border-l-[hsl(var(--warning))]"
      : "border-l-[hsl(var(--success))]";

  return (
    <Card className={`border-l-4 ${borderColor}`}>
      <CardContent className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{doc.clientName}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{doc.clientPhone}</span>
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{doc.clientEmail}</span>
            </div>
          </div>
          <ValidityBadge hoursRemaining={doc.hoursRemaining} status={doc.status} />
        </div>

        {/* Doc ID & IRN */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-accent/50 px-2.5 py-1 rounded-md">
            <FileText className="h-3 w-3 text-primary" />
            <span className="font-mono font-medium text-primary">{doc.leegalityDocId}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <ClipboardCheck className="h-3 w-3" />
            <span>IRN: {doc.irn}</span>
          </div>
          <span className="text-muted-foreground ml-auto">Sent: {doc.sentDate}</span>
        </div>

        {/* Nudge Tracker */}
        <NudgeTracker nudges={doc.nudges} />

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={handleCopyUrl}>
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            Copy Signing URL
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs text-[hsl(var(--destructive))] border-[hsl(var(--destructive-light))] hover:bg-[hsl(var(--destructive-light))]"
            onClick={() => onCancel(doc.id)}
          >
            <XCircle className="h-3.5 w-3.5 mr-1.5" />
            Cancel Request
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CompletedCard({ doc }: { doc: ESignDocument }) {
  return (
    <Card className="border-l-4 border-l-[hsl(var(--success))]">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{doc.clientName}</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span className="font-mono">{doc.leegalityDocId}</span>
              <span className="mx-1">·</span>
              Completed: {doc.completedDate}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {doc.webhookVerified && (
              <Badge className="bg-[hsl(var(--success-light))] text-[hsl(var(--success))] border-0 text-[10px] gap-1">
                <ShieldCheck className="h-3 w-3" /> Webhook Verified
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Download Signed Document
          </Button>
          <Button size="sm" variant="outline" className="flex-1 text-xs">
            <ClipboardCheck className="h-3.5 w-3.5 mr-1.5" />
            Download Audit Trail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ExpiredCard({ doc, onRetry }: { doc: ESignDocument; onRetry: (id: string) => void }) {
  return (
    <Card className="border-l-4 border-l-[hsl(var(--destructive))] bg-[hsl(var(--destructive-light))]/30">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">{doc.clientName}</span>
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span className="font-mono">{doc.leegalityDocId}</span>
              <span className="mx-1">·</span>
              Expired: {doc.expiresAt}
            </div>
          </div>
          <Badge className="bg-[hsl(var(--destructive))] text-white border-0 text-xs">Expired</Badge>
        </div>
        <NudgeTracker nudges={doc.nudges} />
        <Button size="sm" variant="outline" className="w-full text-xs" onClick={() => onRetry(doc.id)}>
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          Resend New Request
        </Button>
      </CardContent>
    </Card>
  );
}

// --- Initiation Sheet ---
function NewRequestSheet() {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("");
  const [useTemplate, setUseTemplate] = useState(true);
  const [irn, setIrn] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [clientSearch, setClientSearch] = useState("");

  const filteredClients = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const handleSubmit = () => {
    if (!selectedClient) {
      toast.error("Please select a client");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      setSelectedClient("");
      setIrn("");
      toast.success("E-Sign request sent via WhatsApp!");
    }, 2000);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="h-4 w-4" />
          Send E-Sign Request
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-foreground">New Leegality E-Sign Request</SheetTitle>
          <SheetDescription>
            Initiate a document signing request via the Leegality API. The client will receive a signing link on WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Step 1: Client Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</div>
              <Label className="font-semibold text-foreground">Select Client</Label>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients by name or email..."
                className="pl-9"
                value={clientSearch}
                onChange={(e) => setClientSearch(e.target.value)}
              />
            </div>
            <div className="border rounded-lg max-h-40 overflow-y-auto">
              {filteredClients.map((c) => (
                <button
                  key={c.id}
                  className={`w-full text-left px-3 py-2.5 text-sm hover:bg-accent transition-colors flex items-center justify-between ${
                    selectedClient === c.id ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedClient(c.id)}
                >
                  <div>
                    <span className="font-medium text-foreground">{c.name}</span>
                    <span className="text-muted-foreground ml-2 text-xs">{c.email}</span>
                  </div>
                  {selectedClient === c.id && <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />}
                </button>
              ))}
              {filteredClients.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No clients found</p>
              )}
            </div>
          </div>

          {/* Step 2: Document Config */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</div>
              <Label className="font-semibold text-foreground">Document Configuration</Label>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">Use Standard Template</p>
                <p className="text-xs text-muted-foreground">Pre-approved SEBI advisory agreement</p>
              </div>
              <Switch checked={useTemplate} onCheckedChange={setUseTemplate} />
            </div>
            {!useTemplate && (
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Drop PDF here or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">Max 10MB · PDF only · Will be Base64 encoded</p>
              </div>
            )}
          </div>

          {/* Step 3: IRN */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</div>
              <Label className="font-semibold text-foreground">Internal Reference</Label>
            </div>
            <Input
              placeholder="e.g., IRN-2026-XXX"
              value={irn}
              onChange={(e) => setIrn(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Used for internal tracking. Will be attached to the Leegality request.</p>
          </div>
        </div>

        <SheetFooter>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2" onClick={handleSubmit} disabled={submitting || !selectedClient}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending via Leegality API...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Generate Link & Send via WhatsApp
              </>
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// --- Main Page ---
export default function Onboarding() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [loading] = useState(false);
  const [apiConnected] = useState(true);

  const inProgress = documents.filter((d) => d.status === "in_progress");
  const completed = documents.filter((d) => d.status === "completed");
  const expired = documents.filter((d) => d.status === "expired");

  const handleCancel = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    toast.success("E-Sign request cancelled");
  };

  const handleRetry = (id: string) => {
    toast.success("New request initiated for client");
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 space-y-6">
          <Skeleton className="h-8 w-72" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24" />)}
          </div>
          <Skeleton className="h-10 w-96" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48" />)}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">E-Sign Management Hub</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Leegality-powered document signing with automated 3-day WhatsApp follow-ups
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ApiStatusIndicator connected={apiConnected} />
            <NewRequestSheet />
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--warning-light))] flex items-center justify-center">
                <Send className="h-5 w-5 text-[hsl(var(--warning))]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgress.length}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--success-light))] flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completed.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--destructive-light))] flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-[hsl(var(--destructive))]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{expired.length}</p>
                <p className="text-xs text-muted-foreground">Expired / Failed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(var(--info-light))] flex items-center justify-center">
                <Clock className="h-5 w-5 text-[hsl(var(--info))]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {inProgress.filter((d) => d.hoursRemaining <= 12).length}
                </p>
                <p className="text-xs text-muted-foreground">Expiring Soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed View */}
        <Tabs defaultValue="in_progress" className="space-y-4">
          <TabsList className="bg-muted">
            <TabsTrigger value="in_progress" className="gap-1.5">
              <Send className="h-3.5 w-3.5" />
              In Progress
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5">{inProgress.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Completed
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5">{completed.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="expired" className="gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5" />
              Expired / Failed
              <Badge variant="secondary" className="ml-1 text-[10px] px-1.5">{expired.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in_progress" className="space-y-4">
            {inProgress.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Send className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">No active signing requests</p>
                  <p className="text-xs text-muted-foreground mt-1">Click "Send E-Sign Request" to get started</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {inProgress.map((doc) => (
                  <ActiveRequestCard key={doc.id} doc={doc} onCancel={handleCancel} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completed.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">No completed documents yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {completed.map((doc) => (
                  <CompletedCard key={doc.id} doc={doc} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="expired" className="space-y-4">
            {expired.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">No expired requests</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {expired.map((doc) => (
                  <ExpiredCard key={doc.id} doc={doc} onRetry={handleRetry} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
