import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Save, Upload, Eye, EyeOff, CheckCircle, XCircle, MessageSquare, Wifi, WifiOff
} from "lucide-react";
import { useState } from "react";

const whatsappTemplates = [
  { name: "Smart Nudge Alert", status: "approved", category: "Marketing", lastUsed: "Today" },
  { name: "E-Sign Reminder", status: "approved", category: "Utility", lastUsed: "Yesterday" },
  { name: "Profit Lock Alert", status: "approved", category: "Marketing", lastUsed: "2 days ago" },
  { name: "FOMO Report", status: "pending", category: "Marketing", lastUsed: "Never" },
  { name: "Renewal Reminder", status: "approved", category: "Utility", lastUsed: "3 days ago" },
];

const Settings = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [whatsappConnected] = useState(true);

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">System configuration</p>
        </div>

        <Tabs defaultValue="whatsapp" className="w-full">
          <TabsList>
            <TabsTrigger value="whatsapp">WhatsApp Config</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* WhatsApp Config */}
          <TabsContent value="whatsapp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-success" />
                  Meta WhatsApp Business API
                </CardTitle>
                <CardDescription>Manage your WhatsApp integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {whatsappConnected ? (
                      <Wifi className="h-6 w-6 text-success" />
                    ) : (
                      <WifiOff className="h-6 w-6 text-destructive" />
                    )}
                    <div>
                      <p className="font-medium">Connection Status</p>
                      <p className="text-sm text-muted-foreground">Meta Business Suite</p>
                    </div>
                  </div>
                  <Badge className={whatsappConnected ? "bg-success/15 text-success border-0" : "bg-destructive/15 text-destructive border-0"}>
                    {whatsappConnected ? <><CheckCircle className="h-3 w-3 mr-1" />Connected</> : <><XCircle className="h-3 w-3 mr-1" />Disconnected</>}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Phone Number ID</Label>
                    <Input defaultValue="1234567890" disabled={whatsappConnected} />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Account ID</Label>
                    <Input defaultValue="9876543210" disabled={whatsappConnected} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Access Token</Label>
                    <div className="flex gap-2">
                      <Input type={showApiKey ? "text" : "password"} defaultValue="EAAGm0PX4ZCpsBAAKxxxxxxxx" />
                      <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline">Test Connection</Button>
                  <Button><Save className="mr-2 h-4 w-4" />Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Template Management */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Approved WhatsApp Templates</CardTitle>
                <CardDescription>Read-only list of templates approved by Meta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {whatsappTemplates.map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <p className="text-xs text-muted-foreground">Category: {t.category} · Last used: {t.lastUsed}</p>
                        </div>
                      </div>
                      <Badge className={
                        t.status === "approved"
                          ? "bg-success/15 text-success border-0"
                          : "bg-warning/15 text-warning border-0"
                      }>
                        {t.status === "approved" ? <><CheckCircle className="h-3 w-3 mr-1" />Approved</> : <><></>Pending</>}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">AN</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" />Change Photo</Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="John Analyst" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue="+91 98765 43210" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" defaultValue="analyst@stockpro.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>SEBI Registration No.</Label>
                    <Input defaultValue="INH000012345" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button><Save className="mr-2 h-4 w-4" />Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Client Buy Confirmation", desc: "When a client confirms buying a stock" },
                  { label: "Target Hit Alerts", desc: "When a recommendation hits its target" },
                  { label: "Churn Risk Alerts", desc: "When a client's engagement drops below threshold" },
                  { label: "E-Sign Overdue", desc: "When e-sign is pending more than 3 days" },
                  { label: "Daily Summary", desc: "Receive daily activity digest" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label>{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={i < 4} />
                  </div>
                ))}
                <div className="flex justify-end">
                  <Button><Save className="mr-2 h-4 w-4" />Save</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
