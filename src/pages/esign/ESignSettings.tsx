import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, Key, Globe, Webhook, Bell, CreditCard, TestTube,
  Eye, EyeOff, Copy, RefreshCw, CheckCircle2, XCircle, Plus, Trash2,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const webhookLogs = [
  { url: "https://api.example.com/webhook/esign", status: "200 OK", time: "Mar 3, 10:15 AM" },
  { url: "https://api.example.com/webhook/esign", status: "200 OK", time: "Mar 2, 03:45 PM" },
  { url: "https://api.example.com/webhook/esign", status: "500 Error", time: "Mar 1, 11:00 AM" },
];

export default function ESignSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showToken, setShowToken] = useState(false);
  const [env, setEnv] = useState<"sandbox" | "production">("sandbox");
  const [webhookHeaders, setWebhookHeaders] = useState([{ key: "Content-Type", value: "application/json" }]);

  return (
    <AppLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/esign")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">eSign Settings</h1>
            <p className="text-sm text-muted-foreground">Configure API credentials and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="api">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="api">API Config</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* API Config */}
          <TabsContent value="api" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Key className="h-5 w-5" /> API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Environment</Label>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${env === "sandbox" ? "font-medium text-foreground" : "text-muted-foreground"}`}>Sandbox</span>
                    <Switch checked={env === "production"} onCheckedChange={(v) => setEnv(v ? "production" : "sandbox")} />
                    <span className={`text-sm ${env === "production" ? "font-medium text-foreground" : "text-muted-foreground"}`}>Production</span>
                  </div>
                </div>
                <div>
                  <Label>Auth Token</Label>
                  <div className="flex gap-2 mt-1">
                    <Input type={showToken ? "text" : "password"} value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx" readOnly className="font-mono text-sm" />
                    <Button variant="outline" size="icon" onClick={() => setShowToken(!showToken)}>
                      {showToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText("sk_live_xxx"); toast({ title: "Copied!" }); }}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>API Endpoint</Label>
                  <Input value={env === "sandbox" ? "https://sandbox.leegality.com/api" : "https://app.leegality.com/api"} readOnly className="text-sm text-muted-foreground mt-1" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-1.5"><RefreshCw className="h-4 w-4" /> Regenerate Token</Button>
                  <Button className="gap-1.5" onClick={() => toast({ title: "Connection Successful", description: "Leegality API is reachable." })}>
                    <TestTube className="h-4 w-4" /> Test Connection
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhooks */}
          <TabsContent value="webhooks" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Webhook className="h-5 w-5" /> Webhook Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Success Webhook URL</Label>
                  <Input placeholder="https://your-api.com/webhook/success" className="mt-1" />
                </div>
                <div>
                  <Label>Error Webhook URL</Label>
                  <Input placeholder="https://your-api.com/webhook/error" className="mt-1" />
                </div>
                <div>
                  <Label className="mb-2 block">Custom Headers</Label>
                  <div className="space-y-2">
                    {webhookHeaders.map((h, i) => (
                      <div key={i} className="flex gap-2">
                        <Input placeholder="Header Key" value={h.key} onChange={(e) => { const u = [...webhookHeaders]; u[i].key = e.target.value; setWebhookHeaders(u); }} />
                        <Input placeholder="Header Value" value={h.value} onChange={(e) => { const u = [...webhookHeaders]; u[i].value = e.target.value; setWebhookHeaders(u); }} />
                        <Button variant="ghost" size="icon" onClick={() => setWebhookHeaders(webhookHeaders.filter((_, idx) => idx !== i))}>
                          <Trash2 className="h-4 w-4 text-[hsl(var(--destructive))]" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => setWebhookHeaders([...webhookHeaders, { key: "", value: "" }])}>
                      <Plus className="h-3 w-3 mr-1" /> Add Header
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="gap-1.5"><TestTube className="h-4 w-4" /> Test Webhook</Button>
                <Separator />
                <div>
                  <Label className="mb-2 block">Recent Deliveries</Label>
                  <div className="space-y-2">
                    {webhookLogs.map((l, i) => (
                      <div key={i} className="flex items-center justify-between text-sm border rounded-lg px-3 py-2">
                        <span className="text-muted-foreground truncate flex-1">{l.url}</span>
                        <Badge variant="outline" className={l.status.includes("200") ? "text-[hsl(var(--success))]" : "text-[hsl(var(--destructive))]"}>
                          {l.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-3">{l.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><Bell className="h-5 w-5" /> Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {["Email", "SMS", "WhatsApp"].map((channel) => (
                  <div key={channel}>
                    <Label className="text-base font-medium mb-2 block">{channel} Notifications</Label>
                    <div className="space-y-2 pl-1">
                      {["When document is signed", "When document expires", "Daily summary report"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 text-sm">
                          <Checkbox defaultChecked={opt !== "Daily summary report"} />
                          {opt}
                        </label>
                      ))}
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account */}
          <TabsContent value="account" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2"><CreditCard className="h-5 w-5" /> Account & Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Credits Remaining</span>
                    <span className="font-medium text-foreground">847 / 1,000</span>
                  </div>
                  <Progress value={84.7} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="border rounded-lg p-3">
                    <p className="text-muted-foreground">Current Plan</p>
                    <p className="text-lg font-bold text-foreground">Professional</p>
                  </div>
                  <div className="border rounded-lg p-3">
                    <p className="text-muted-foreground">Documents This Month</p>
                    <p className="text-lg font-bold text-foreground">89</p>
                  </div>
                </div>
                <Button className="gap-1.5"><ExternalLink className="h-4 w-4" /> Upgrade Plan</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}