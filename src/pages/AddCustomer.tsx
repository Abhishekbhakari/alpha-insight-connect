import { AppLayout } from "@/components/Layout/AppLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Upload, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    segment: "",
    riskProfile: "moderate",
    tags: "",
    broker: "",
    referredBy: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting customer:", formData);
    navigate("/customers");
  };

  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/customers")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Add Customer</h1>
              <p className="text-muted-foreground">
                Add a new client with risk profile for smart broadcasting
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="single" className="w-full">
          <TabsList>
            <TabsTrigger value="single">Single Customer</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            placeholder="Rajesh Kumar"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">WhatsApp Number *</Label>
                          <Input
                            id="phone"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="rajesh@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="segment">Subscription Plan</Label>
                          <Select
                            value={formData.segment}
                            onValueChange={(value) => setFormData({ ...formData, segment: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="trial">Trial (7 Days)</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tags">Tags</Label>
                          <Input
                            id="tags"
                            placeholder="active, high-value"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                          />
                          <p className="text-sm text-muted-foreground">
                            Comma-separated tags for filtering
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="referredBy">Referred By (Optional)</Label>
                          <Input
                            id="referredBy"
                            placeholder="Client name or code"
                            value={formData.referredBy}
                            onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => navigate("/customers")}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          <Save className="mr-2 h-4 w-4" />
                          Add Customer
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Risk Profile Sidebar */}
              <div className="space-y-6">
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Risk Profile
                    </CardTitle>
                    <CardDescription>
                      Used for smart broadcasting - high-risk calls won't go to conservative clients
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup
                      value={formData.riskProfile}
                      onValueChange={(value) => setFormData({ ...formData, riskProfile: value })}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="conservative" id="conservative" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="conservative" className="font-medium cursor-pointer flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-success" />
                            Conservative
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Only receives Large Cap, Blue Chip calls
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="moderate" id="moderate" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="moderate" className="font-medium cursor-pointer flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-warning" />
                            Moderate
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Receives Large & Mid Cap calls
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="aggressive" id="aggressive" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="aggressive" className="font-medium cursor-pointer flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-destructive" />
                            Aggressive
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Receives all calls including Small Cap
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferred Broker</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select
                      value={formData.broker}
                      onValueChange={(value) => setFormData({ ...formData, broker: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select broker" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zerodha">Zerodha</SelectItem>
                        <SelectItem value="angel">Angel One</SelectItem>
                        <SelectItem value="dhan">Dhan</SelectItem>
                        <SelectItem value="upstox">Upstox</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-2">
                      Client can connect their broker for Shadow Portfolio tracking
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Upload Customers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Download the template file and fill in customer details
                    </p>
                    <Button variant="outline">
                      Download Template (CSV)
                    </Button>
                  </div>

                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">
                      Drop your CSV file here or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">
                      File should contain: Name, Phone, Email, Risk Profile, Segment
                    </p>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Upload Guidelines:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Maximum 1000 customers per upload</li>
                      <li>• Phone numbers must include country code</li>
                      <li>• Risk Profile: conservative, moderate, aggressive</li>
                      <li>• Duplicate phone numbers will be skipped</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AddCustomer;