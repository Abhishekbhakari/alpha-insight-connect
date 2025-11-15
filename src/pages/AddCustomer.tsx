import { AppLayout } from "@/components/Layout/AppLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    segment: "",
    tags: "",
    broker: "",
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
                Add a new client to your database
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
                      <Label htmlFor="phone">Mobile Number *</Label>
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
                      <Label htmlFor="segment">Customer Segment</Label>
                      <Select
                        value={formData.segment}
                        onValueChange={(value) => setFormData({ ...formData, segment: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select segment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retail">Retail Investor</SelectItem>
                          <SelectItem value="hni">High Net Worth</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="trial">Trial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="active, premium, long-term"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      />
                      <p className="text-sm text-muted-foreground">
                        Comma-separated tags for filtering
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="broker">Preferred Broker</Label>
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
                      File should contain: Name, Phone, Email, Segment, Broker
                    </p>
                  </div>

                  <div className="bg-info-light border border-info rounded-lg p-4">
                    <h4 className="font-medium mb-2">Upload Guidelines:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Maximum 1000 customers per upload</li>
                      <li>• Phone numbers must include country code</li>
                      <li>• Duplicate phone numbers will be skipped</li>
                      <li>• Invalid entries will be reported after upload</li>
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
