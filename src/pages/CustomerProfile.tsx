import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Phone, Mail, Link as LinkIcon, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const CustomerProfile = () => {
  const navigate = useNavigate();

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
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Edit Profile</Button>
            <Button variant="outline" className="text-destructive">Delete</Button>
          </div>
        </div>

        {/* Customer Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary-light text-primary text-2xl">
                  RK
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">Rajesh Kumar</h2>
                  <Badge>Premium</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>rajesh@example.com</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Recommendations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">18</p>
                  <p className="text-sm text-muted-foreground">Followed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">75%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="calls">Call History</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="brokers">Connected Brokers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Last Call</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">Today</p>
                  <p className="text-sm text-muted-foreground">9:05 AM - Delivered</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Total Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">4 Stocks</p>
                  <p className="text-sm text-muted-foreground">Value: ₹1,23,450</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">6 Months</p>
                  <p className="text-sm text-muted-foreground">July 2023</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Today", action: "Received call for Reliance Industries", status: "success" },
                    { date: "Yesterday", action: "Bought TCS as recommended", status: "success" },
                    { date: "2 days ago", action: "Holdings synced from Zerodha", status: "info" },
                    { date: "3 days ago", action: "Received call for Wipro", status: "success" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-0">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.status === "success" ? "bg-success" : "bg-primary"
                      }`} />
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holdings">
            <Card>
              <CardHeader>
                <CardTitle>Current Holdings from Zerodha</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Avg Price</TableHead>
                      <TableHead className="text-right">Current Price</TableHead>
                      <TableHead className="text-right">P&L</TableHead>
                      <TableHead>Recommended?</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { stock: "Reliance Industries", qty: 10, avg: 2450, current: 2520, recommended: true },
                      { stock: "TCS", qty: 5, avg: 3200, current: 3350, recommended: true },
                      { stock: "HDFC Bank", qty: 15, avg: 1520, current: 1580, recommended: false },
                    ].map((holding, index) => {
                      const pl = (holding.current - holding.avg) * holding.qty;
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{holding.stock}</TableCell>
                          <TableCell className="text-right">{holding.qty}</TableCell>
                          <TableCell className="text-right">₹{holding.avg}</TableCell>
                          <TableCell className="text-right">₹{holding.current}</TableCell>
                          <TableCell className="text-right">
                            <span className={pl >= 0 ? "text-success" : "text-destructive"}>
                              {pl >= 0 ? "+" : ""}₹{pl.toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            {holding.recommended ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Call History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Recommendation</TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { date: "Jan 15, 9:05 AM", rec: "Reliance Industries - BUY", attempts: 1, duration: "2:35", status: "delivered" },
                      { date: "Jan 14, 9:03 AM", rec: "TCS - BUY", attempts: 1, duration: "2:42", status: "delivered" },
                      { date: "Jan 13, 9:07 AM", rec: "Wipro - SELL", attempts: 2, duration: "2:28", status: "delivered" },
                      { date: "Jan 12, 9:02 AM", rec: "Infosys - BUY", attempts: 3, duration: "-", status: "missed" },
                    ].map((call, index) => (
                      <TableRow key={index}>
                        <TableCell>{call.date}</TableCell>
                        <TableCell className="font-medium">{call.rec}</TableCell>
                        <TableCell>{call.attempts}</TableCell>
                        <TableCell>{call.duration}</TableCell>
                        <TableCell>
                          <Badge className={
                            call.status === "delivered" ? "bg-success-light text-success" : "bg-warning-light text-warning"
                          }>
                            {call.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Recommendations Received</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Entry</TableHead>
                      <TableHead className="text-right">Target</TableHead>
                      <TableHead>Followed?</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { date: "Jan 15", stock: "Reliance", type: "buy", entry: 2500, target: 2700, followed: true },
                      { date: "Jan 14", stock: "TCS", type: "buy", entry: 3200, target: 3400, followed: true },
                      { date: "Jan 13", stock: "Wipro", type: "sell", entry: 450, target: 420, followed: false },
                    ].map((rec, index) => (
                      <TableRow key={index}>
                        <TableCell>{rec.date}</TableCell>
                        <TableCell className="font-medium">{rec.stock}</TableCell>
                        <TableCell>
                          <Badge className={
                            rec.type === "buy" ? "bg-success-light text-success" : "bg-destructive-light text-destructive"
                          }>
                            <TrendingUp className="mr-1 h-3 w-3" />
                            {rec.type.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">₹{rec.entry}</TableCell>
                        <TableCell className="text-right">₹{rec.target}</TableCell>
                        <TableCell>
                          {rec.followed ? (
                            <div className="flex items-center gap-1 text-success">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm">Yes</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <XCircle className="h-4 w-4" />
                              <span className="text-sm">No</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brokers">
            <Card>
              <CardHeader>
                <CardTitle>Connected Brokers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-success-light/10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-success-light flex items-center justify-center">
                      <LinkIcon className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Zerodha</p>
                      <p className="text-sm text-muted-foreground">
                        Connected • Last synced 5 mins ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Sync Now</Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Disconnect
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <LinkIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Angel One</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <LinkIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">Dhan</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default CustomerProfile;
