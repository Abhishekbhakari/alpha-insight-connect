import { AppLayout } from "@/components/Layout/AppLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, Play, Save, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateRecommendation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    stockName: "",
    type: "buy",
    entryPrice: "",
    stopLoss: "",
    targetPrice: "",
    messageScript: "",
    scheduleDate: "",
    scheduleTime: "09:00",
    customerSegment: "all",
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
              <h1 className="text-3xl font-bold text-foreground">Create Recommendation</h1>
              <p className="text-muted-foreground">
                Create a new stock recommendation for your clients
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
              Publish & Schedule
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stock Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stockName">Stock Name</Label>
                  <Input
                    id="stockName"
                    placeholder="e.g., Reliance Industries"
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

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="entryPrice">Entry Price (₹)</Label>
                    <Input
                      id="entryPrice"
                      type="number"
                      placeholder="2500"
                      value={formData.entryPrice}
                      onChange={(e) => setFormData({ ...formData, entryPrice: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stopLoss">Stop Loss (₹)</Label>
                    <Input
                      id="stopLoss"
                      type="number"
                      placeholder="2400"
                      value={formData.stopLoss}
                      onChange={(e) => setFormData({ ...formData, stopLoss: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetPrice">Target Price (₹)</Label>
                    <Input
                      id="targetPrice"
                      type="number"
                      placeholder="2700"
                      value={formData.targetPrice}
                      onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Call Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="messageScript">Message Script</Label>
                  <Textarea
                    id="messageScript"
                    rows={6}
                    placeholder="Hello, this is a stock recommendation from our research team. We recommend buying Reliance Industries at ₹2500 with a target price of ₹2700 and stop loss at ₹2400..."
                    value={formData.messageScript}
                    onChange={(e) => setFormData({ ...formData, messageScript: e.target.value })}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Audio
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Auto-Generate Voice
                  </Button>
                </div>

                <Button variant="outline" className="w-full">
                  <Play className="mr-2 h-4 w-4" />
                  Preview Call
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
                  <Label htmlFor="scheduleDate">Date</Label>
                  <Input
                    id="scheduleDate"
                    type="date"
                    value={formData.scheduleDate}
                    onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scheduleTime">Time</Label>
                  <Select
                    value={formData.scheduleTime}
                    onValueChange={(value) => setFormData({ ...formData, scheduleTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="09:30">9:30 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="10:30">10:30 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Target Customers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.customerSegment}
                  onValueChange={(value) => setFormData({ ...formData, customerSegment: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="font-normal cursor-pointer">
                      All Customers
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="font-normal cursor-pointer">
                      Premium Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active" className="font-normal cursor-pointer">
                      Active Traders
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
                    <strong>50 customers</strong> will receive this recommendation
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
