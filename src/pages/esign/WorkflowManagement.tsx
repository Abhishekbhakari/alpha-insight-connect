import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus, Users, Copy, Trash2, Edit2, Eye, Workflow, Shield, MapPin,
  ArrowLeft, Fingerprint, Camera, Smartphone, GripVertical, Save
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const existingWorkflows = [
  { id: "wf-1", name: "Standard Agreement", desc: "Single signer with Virtual Sign", signers: 1, type: "Virtual Sign", used: 145, order: "N/A" },
  { id: "wf-2", name: "Dual Signer Agreement", desc: "Two sequential signers with Aadhaar", signers: 2, type: "Aadhaar eSign", used: 67, order: "Sequential" },
  { id: "wf-3", name: "Quick Consent", desc: "Single quick sign for simple documents", signers: 1, type: "Quick Sign", used: 203, order: "N/A" },
  { id: "wf-4", name: "Board Resolution", desc: "Three parallel signers with DSC", signers: 3, type: "DSC Token", used: 12, order: "Parallel" },
  { id: "wf-5", name: "Employee Onboarding", desc: "HR and Employee sequential signing", signers: 2, type: "Virtual Sign", used: 89, order: "Sequential" },
];

const signatureTypes = ["Aadhaar eSign", "DSC Token", "Virtual Sign", "Visual Sign", "Quick Sign"];

interface SignerConfig {
  label: string;
  signType: string;
  autoPlace: boolean;
  security: { gps: boolean; face: boolean; liveness: boolean; twoFactor: boolean };
}

export default function WorkflowManagement() {
  const navigate = useNavigate();
  const [createOpen, setCreateOpen] = useState(false);
  const [wfName, setWfName] = useState("");
  const [wfDesc, setWfDesc] = useState("");
  const [sequential, setSequential] = useState(true);
  const [signers, setSigners] = useState<SignerConfig[]>([
    { label: "Signer 1", signType: "Virtual Sign", autoPlace: true, security: { gps: false, face: false, liveness: false, twoFactor: false } }
  ]);

  const addSigner = () => {
    setSigners([...signers, { label: `Signer ${signers.length + 1}`, signType: "Virtual Sign", autoPlace: true, security: { gps: false, face: false, liveness: false, twoFactor: false } }]);
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/esign")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Workflow Management</h1>
              <p className="text-sm text-muted-foreground">Create and manage reusable signing workflows</p>
            </div>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Create New Workflow</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Signing Workflow</DialogTitle>
              </DialogHeader>
              <div className="space-y-5 pt-2">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label>Workflow Name</Label>
                    <Input placeholder="e.g. Client Advisory Agreement" value={wfName} onChange={(e) => setWfName(e.target.value)} />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea placeholder="Describe when this workflow should be used" value={wfDesc} onChange={(e) => setWfDesc(e.target.value)} rows={2} />
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium">Signer Configuration</Label>
                    <Button variant="outline" size="sm" onClick={addSigner}><Plus className="h-3 w-3 mr-1" /> Add Signer</Button>
                  </div>
                  <div className="space-y-3">
                    {signers.map((s, i) => (
                      <Card key={i}>
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                              <Badge variant="outline">{s.label}</Badge>
                            </div>
                            {signers.length > 1 && (
                              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSigners(signers.filter((_, idx) => idx !== i))}>
                                <Trash2 className="h-3.5 w-3.5 text-[hsl(var(--destructive))]" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Signer Label</Label>
                              <Input value={s.label} onChange={(e) => { const u = [...signers]; u[i].label = e.target.value; setSigners(u); }} />
                            </div>
                            <div>
                              <Label className="text-xs">Signature Type</Label>
                              <Select value={s.signType} onValueChange={(v) => { const u = [...signers]; u[i].signType = v; setSigners(u); }}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {signatureTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <Label className="text-xs mb-1.5 block">Security Options</Label>
                            <div className="flex flex-wrap gap-3">
                              {[
                                { key: "gps" as const, icon: MapPin, label: "GPS Location" },
                                { key: "face" as const, icon: Camera, label: "Face Capture" },
                                { key: "liveness" as const, icon: Fingerprint, label: "Liveness" },
                                { key: "twoFactor" as const, icon: Smartphone, label: "2FA" },
                              ].map((opt) => (
                                <label key={opt.key} className="flex items-center gap-1.5 text-xs">
                                  <Checkbox checked={s.security[opt.key]} onCheckedChange={(v) => {
                                    const u = [...signers]; u[i].security[opt.key] = !!v; setSigners(u);
                                  }} />
                                  <opt.icon className="h-3 w-3" /> {opt.label}
                                </label>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Signing Order</Label>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${!sequential ? "text-foreground font-medium" : "text-muted-foreground"}`}>Parallel</span>
                    <Switch checked={sequential} onCheckedChange={setSequential} />
                    <span className={`text-sm ${sequential ? "text-foreground font-medium" : "text-muted-foreground"}`}>Sequential</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
                  <Button className="gap-1" onClick={() => setCreateOpen(false)}>
                    <Save className="h-4 w-4" /> Save Workflow
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {existingWorkflows.map((wf) => (
            <Card key={wf.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Workflow className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">Used {wf.used}×</Badge>
                </div>
                <h3 className="font-semibold text-foreground">{wf.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{wf.desc}</p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <Badge variant="outline" className="text-xs"><Users className="h-3 w-3 mr-1" />{wf.signers} signer(s)</Badge>
                  <Badge variant="outline" className="text-xs"><Shield className="h-3 w-3 mr-1" />{wf.type}</Badge>
                  {wf.order !== "N/A" && <Badge variant="outline" className="text-xs">{wf.order}</Badge>}
                </div>
                <Separator className="my-3" />
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1"><Edit2 className="h-3 w-3" /> Edit</Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1"><Copy className="h-3 w-3" /> Duplicate</Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 text-[hsl(var(--destructive))]"><Trash2 className="h-3 w-3" /> Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}