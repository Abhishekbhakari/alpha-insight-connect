import { AppLayout } from "@/components/Layout/AppLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Upload, Play, Save, Send, Bell, Zap, Target, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const CreateRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    stockName: "",
    type: "buy",
    buyRangeMin: "",
    buyRangeMax: "",
    cutoffPrice: "",
    stopLoss: "",
    targetPrice: "",
    messageScript: "",
    scheduleDate: "",
    scheduleTime: "09:00",
    customerSegment: "all",
    riskLevel: "moderate",
    enableSmartNudge: true,
    nudgeInterval: "15",
    enableProfitLock: true,
  });

  const handleSubmit = (action: "draft" | "schedule") => {
    console.log("Submitting:", action, formData);
    navigate("/recommendations");
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/recommendations")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Create Smart Recommendation</h1>
              <p className="text-muted-foreground">
                Set up automated price monitoring and client nudges
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSubmit("draft")}>
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button onClick={() => handleSubmit("schedule")}>
              <Send className="mr-2 h-4 w-4" />
              Publish & Activate
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Stock Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stockName">Stock Name</Label>
                  <Input
                    id="stockName"
                    placeholder="e.g., Tata Motors"
                    value={formData.stockName}
                    onChange={(e) => setFormData({ ...formData, stockName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Recommendation Type</Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="buy" id="buy" />
                      <Label htmlFor="buy" className="font-normal cursor-pointer">
                        Buy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sell" id="sell" />
                      <Label htmlFor="sell" className="font-normal cursor-pointer">
                        Sell
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Buy Range - Smart Nudge Feature */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Buy Zone Range</span>
                    <Badge variant="outline" className="text-xs">Smart-Nudge</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buyRangeMin">Minimum (₹)</Label>
                      <Input
                        id="buyRangeMin"
                        type="number"
                        placeholder="400"
                        value={formData.buyRangeMin}
                        onChange={(e) => setFormData({ ...formData, buyRangeMin: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buyRangeMax">Maximum (₹)</Label>
                      <Input
                        id="buyRangeMax"
                        type="number"
                        placeholder="410"
                        value={formData.buyRangeMax}
                        onChange={(e) => setFormData({ ...formData, buyRangeMax: e.target.value })}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Clients will receive nudges when price is within this range
                  </p>
                </div>

                {/* Cutoff Price */}
                <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="font-medium text-sm">Cutoff Price (₹)</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="420"
                    value={formData.cutoffPrice}
                    onChange={(e) => setFormData({ ...formData, cutoffPrice: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Nudges stop when price exceeds this value to prevent bad entries
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stopLoss">Stop Loss (₹)</Label>
                    <Input
                      id="stopLoss"
                      type="number"
                      placeholder="380"
                      value={formData.stopLoss}
                      onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetPrice">Target Price (₹)</Label>
                    <Input
                      id="targetPrice"
                      type="number"
                      placeholder="450"
                      value={formData.targetPrice}
                      onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart-Nudge Engine Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Smart-Nudge Engine
                </CardTitle>
                <CardDescription>
                  Automated WhatsApp nudges based on live market prices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Enable Smart Nudges</Label>
                    <p className="text-sm text-muted-foreground">
                      Send automated "Buy Zone" reminders via WhatsApp
                    </p>
                  </div>
                  <Switch
                    checked={formData.enableSmartNudge}
                    onCheckedChange={(checked) => setFormData({ ...formData, enableSmartNudge: checked })}
                  />
                </div>

                {formData.enableSmartNudge && (
                  <div className="space-y-2">
                    <Label>Price Check Interval</Label>
                    <Select
                      value={formData.nudgeInterval}
                      onValueChange={(value) => setFormData({ ...formData, nudgeInterval: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="font-medium">Profit Lock Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Auto-send "BOOK PROFIT NOW" when target is hit
                    </p>
                  </div>
                  <Switch
                    checked={formData.enableProfitLock}
                    onCheckedChange={(checked) => setFormData({ ...formData, enableProfitLock: checked })}
                  />
                </div>

                {/* Preview Box */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-sm">Nudge Preview</h4>
                  <div className="bg-background border rounded-lg p-3 text-sm">
                    <p className="text-success font-medium mb-1">📈 Buy Zone Alert!</p>
                    <p className="text-muted-foreground">
                      {formData.stockName || "Stock"} is currently at ₹{formData.buyRangeMin || "XXX"} — still in the Buy Zone! 
                      Don't miss out on this opportunity.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="messageScript">Message Template</Label>
                  <Textarea
                    id="messageScript"
                    rows={4}
                    placeholder="🚀 New Buy Call: {stock_name}&#10;&#10;Buy Range: ₹{buy_min} - ₹{buy_max}&#10;Target: ₹{target}&#10;Stop Loss: ₹{stop_loss}&#10;&#10;Reply 'BOUGHT' after purchasing!"
                    value={formData.messageScript}
                    onChange={(e) => setFormData({ ...formData, messageScript: e.target.value })}
                  />
                </div>

                <Button variant="outline" className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  Preview Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">Start Date</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={formData.scheduleDate}
                    onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleTime">Initial Alert Time</Label>
                  <Select
                    value={formData.scheduleTime}
                    onValueChange={(value) => setFormData({ ...formData, scheduleTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="09:15">9:15 AM</SelectItem>
                      <SelectItem value="09:30">9:30 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk-Based Targeting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Risk Level of This Call</Label>
                  <Select
                    value={formData.riskLevel}
                    onValueChange={(value) => setFormData({ ...formData, riskLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-success" />
                          Conservative (Large Cap)
                        </div>
                      </SelectItem>
                      <SelectItem value="moderate">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-warning" />
                          Moderate (Mid Cap)
                        </div>
                      </SelectItem>
                      <SelectItem value="aggressive">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-destructive" />
                          Aggressive (Small Cap)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Auto-Filter Active:</span> High-risk calls are hidden from conservative clients
                  </p>
                </div>

                <RadioGroup
                  value={formData.customerSegment}
                  onValueChange={(value) => setFormData({ ...formData, customerSegment: value })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="font-normal cursor-pointer">
                      All Matching Clients
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="font-normal cursor-pointer">
                      Premium Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="font-normal cursor-pointer">
                      Select Manually
                    </Label>
                  </div>
                </RadioGroup>

                {formData.customerSegment === "custom" && (
                  <Button variant="outline" className="w-full">
                    Select Customers
                  </Button>
                )}

                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>42 clients</strong> will receive this recommendation
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CreateRecommendation;