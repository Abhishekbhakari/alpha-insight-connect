import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Upload, FileText, ChevronRight, ChevronLeft, Check, X, Plus,
  Trash2, Eye, Send, Save, Users, Settings2, ArrowLeft
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const steps = ["Upload Document", "Select Workflow", "Add Recipients", "Configure Settings", "Review & Send"];

const workflows = [
  { id: "wf-1", name: "Standard Agreement", desc: "Single signer, Virtual Sign", signers: 1, type: "Virtual Sign", order: "N/A" },
  { id: "wf-2", name: "Dual Signer Agreement", desc: "Two signers, Sequential", signers: 2, type: "Aadhaar eSign", order: "Sequential" },
  { id: "wf-3", name: "Quick Consent", desc: "Single signer, Quick Sign", signers: 1, type: "Quick Sign", order: "N/A" },
  { id: "wf-4", name: "Board Resolution", desc: "Three signers, Parallel", signers: 3, type: "DSC Token", order: "Parallel" },
];

interface Recipient {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function SendDocument() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; pages: number } | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("");
  const [recipients, setRecipients] = useState<Recipient[]>([{ name: "", email: "", phone: "", role: "Signer 1" }]);
  const [docName, setDocName] = useState("");
  const [irn, setIrn] = useState("");
  const [expiryType, setExpiryType] = useState("7days");
  const [customMessage, setCustomMessage] = useState("");
  const [notifications, setNotifications] = useState({ email: true, sms: true, whatsapp: true, copy: false });
  const [sending, setSending] = useState(false);

  const handleFileDrop = () => {
    setUploadedFile({ name: "Investment_Advisory_Agreement.pdf", size: "2.4 MB", pages: 8 });
    setDocName("Investment Advisory Agreement");
  };

  const addRecipient = () => {
    setRecipients([...recipients, { name: "", email: "", phone: "", role: `Signer ${recipients.length + 1}` }]);
  };

  const removeRecipient = (i: number) => {
    setRecipients(recipients.filter((_, idx) => idx !== i));
  };

  const updateRecipient = (i: number, field: keyof Recipient, value: string) => {
    const updated = [...recipients];
    updated[i] = { ...updated[i], [field]: value };
    setRecipients(updated);
  };

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Document Sent!", description: "Signing links have been generated and sent to all recipients." });
      navigate("/esign");
    }, 2000);
  };

  const wf = workflows.find(w => w.id === selectedWorkflow);

  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/esign")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Send New Document</h1>
            <p className="text-sm text-muted-foreground">Upload, configure, and send for eSignature</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-1">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-1 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 transition-colors ${
                  i < currentStep ? "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]" :
                  i === currentStep ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i === currentStep ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step}</span>
              </div>
              {i < steps.length - 1 && <div className={`h-px flex-1 mx-1 ${i < currentStep ? "bg-[hsl(var(--success))]" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {/* Step 0: Upload */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <CardTitle className="text-lg">Upload Document</CardTitle>
                <CardDescription>Upload the PDF document that needs to be signed</CardDescription>
                {!uploadedFile ? (
                  <div
                    onClick={handleFileDrop}
                    className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center cursor-pointer hover:border-primary/60 hover:bg-accent/50 transition-all"
                  >
                    <Upload className="h-12 w-12 text-primary/50 mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground">Drag & drop your PDF here</p>
                    <p className="text-sm text-muted-foreground mt-1">or click to browse • PDF only, max 10MB</p>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 flex items-center justify-between bg-accent/30">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">{uploadedFile.size} • {uploadedFile.pages} pages</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setUploadedFile(null)}>
                      <X className="h-4 w-4 mr-1" /> Change
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Workflow */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <CardTitle className="text-lg">Select Signing Workflow</CardTitle>
                <CardDescription>Choose a pre-configured workflow or create a new one</CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {workflows.map((w) => (
                    <div
                      key={w.id}
                      onClick={() => setSelectedWorkflow(w.id)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedWorkflow === w.id ? "border-primary bg-accent/50 ring-1 ring-primary" : "hover:border-primary/40"
                      }`}
                    >
                      <p className="font-medium text-foreground">{w.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{w.desc}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline" className="text-xs"><Users className="h-3 w-3 mr-1" />{w.signers} signer(s)</Badge>
                        <Badge variant="outline" className="text-xs">{w.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate("/esign/workflows")}>
                  <Plus className="h-4 w-4 mr-1" /> Create New Workflow
                </Button>
              </div>
            )}

            {/* Step 2: Recipients */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <CardTitle className="text-lg">Recipient Details</CardTitle>
                <CardDescription>Add signing recipients based on the selected workflow{wf && ` (${wf.signers} required)`}</CardDescription>
                <div className="space-y-4">
                  {recipients.map((r, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{r.role}</Badge>
                        {recipients.length > 1 && (
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeRecipient(i)}>
                            <Trash2 className="h-4 w-4 text-[hsl(var(--destructive))]" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs">Full Name</Label>
                          <Input placeholder="Rahul Sharma" value={r.name} onChange={(e) => updateRecipient(i, "name", e.target.value)} />
                        </div>
                        <div>
                          <Label className="text-xs">Email Address</Label>
                          <Input type="email" placeholder="rahul@example.com" value={r.email} onChange={(e) => updateRecipient(i, "email", e.target.value)} />
                        </div>
                        <div>
                          <Label className="text-xs">Phone Number</Label>
                          <Input placeholder="+91 98765 43210" value={r.phone} onChange={(e) => updateRecipient(i, "phone", e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={addRecipient}>
                  <Plus className="h-4 w-4 mr-1" /> Add Another Recipient
                </Button>
              </div>
            )}

            {/* Step 3: Settings */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <CardTitle className="text-lg">Document Settings</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Document Name</Label>
                    <Input value={docName} onChange={(e) => setDocName(e.target.value)} />
                  </div>
                  <div>
                    <Label>Internal Reference Number (IRN)</Label>
                    <Input placeholder="e.g. IRN-2026-0042" value={irn} onChange={(e) => setIrn(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Expiry Settings</Label>
                  <Select value={expiryType} onValueChange={setExpiryType}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Expiry</SelectItem>
                      <SelectItem value="3days">Expires in 3 Days</SelectItem>
                      <SelectItem value="7days">Expires in 7 Days</SelectItem>
                      <SelectItem value="14days">Expires in 14 Days</SelectItem>
                      <SelectItem value="30days">Expires in 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Custom Message for Recipients</Label>
                  <Textarea placeholder="Add a personal note..." value={customMessage} onChange={(e) => setCustomMessage(e.target.value)} rows={3} />
                </div>
                <div>
                  <Label className="mb-2 block">Notification Channels</Label>
                  <div className="flex flex-wrap gap-4">
                    {(["email", "sms", "whatsapp"] as const).map((ch) => (
                      <label key={ch} className="flex items-center gap-2 text-sm">
                        <Checkbox checked={notifications[ch]} onCheckedChange={(v) => setNotifications({ ...notifications, [ch]: !!v })} />
                        {ch.charAt(0).toUpperCase() + ch.slice(1)}
                      </label>
                    ))}
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox checked={notifications.copy} onCheckedChange={(v) => setNotifications({ ...notifications, copy: !!v })} />
                      Send me a copy
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <CardTitle className="text-lg">Review & Send</CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Document Preview */}
                  <div className="border rounded-lg p-6 bg-muted/30 flex flex-col items-center justify-center min-h-[300px]">
                    <FileText className="h-16 w-16 text-primary/30 mb-3" />
                    <p className="font-medium text-foreground">{docName || "Document Preview"}</p>
                    <p className="text-sm text-muted-foreground">{uploadedFile?.pages || 0} pages</p>
                  </div>
                  {/* Summary */}
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Document</span><span className="font-medium">{docName}</span></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Workflow</span><span className="font-medium">{wf?.name || "—"}</span></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">IRN</span><span className="font-medium">{irn || "—"}</span></div>
                      <Separator />
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Expiry</span><span className="font-medium">{expiryType}</span></div>
                      <Separator />
                      <div className="text-sm">
                        <span className="text-muted-foreground">Recipients</span>
                        <div className="mt-2 space-y-1.5">
                          {recipients.map((r, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <Badge variant="outline" className="text-xs">{r.role}</Badge>
                              <span>{r.name || "—"}</span>
                              <span className="text-muted-foreground">({r.email || "—"})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => currentStep === 0 ? navigate("/esign") : setCurrentStep(currentStep - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> {currentStep === 0 ? "Cancel" : "Back"}
          </Button>
          <div className="flex gap-2">
            {currentStep === 4 && (
              <Button variant="outline" className="gap-1"><Save className="h-4 w-4" /> Save as Draft</Button>
            )}
            {currentStep < 4 ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)}>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSend} disabled={sending} className="gap-1">
                {sending ? "Sending..." : <><Send className="h-4 w-4" /> Send for Signature</>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}