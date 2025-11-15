import { AppLayout } from "@/components/Layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, TrendingUp, Phone, Clock, CheckCircle, XCircle, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecommendationDetails = () => {
  const navigate = useNavigate();

  const callLogs = [
    { customer: "Rajesh Kumar", phone: "+91 98765 43210", attempt1: "Delivered", attempt2: "-", attempt3: "-", status: "completed", duration: "2:35" },
    { customer: "Priya Sharma", phone: "+91 98765 43211", attempt1: "Delivered", attempt2: "-", attempt3: "-", status: "completed", duration: "2:42" },
    { customer: "Amit Patel", phone: "+91 98765 43212", attempt1: "Missed", attempt2: "Delivered", attempt3: "-", status: "completed", duration: "2:28" },
    { customer: "Neha Singh", phone: "+91 98765 43213", attempt1: "Missed", attempt2: "Missed", attempt3: "Failed", status: "failed", duration: "-" },
  ];

  const holdings = [
    { customer: "Rajesh Kumar", broker: "Zerodha", bought: true, qty: 10, avgPrice: 2510, syncTime: "10:30 AM" },
    { customer: "Priya Sharma", broker: "Angel One", bought: true, qty: 5, avgPrice: 2505, syncTime: "10:35 AM" },
    { customer: "Amit Patel", broker: "Zerodha", bought: false, qty: 0, avgPrice: 0, syncTime: "10:40 AM" },
  ];

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
              <h1 className="text-3xl font-bold text-foreground">Reliance Industries - BUY</h1>
              <p className="text-muted-foreground">
                Recommendation #REC-2024-0015 • Scheduled for Jan 15, 2024 at 9:00 AM
              </p>
            </div>
          </div>
          <Badge className="bg-success-light text-success">Completed</Badge>
        </div>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="calls">Call Execution</TabsTrigger>
            <TabsTrigger value="holdings">Broker Confirmation</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Stock Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Stock Name</p>
                        <p className="text-xl font-bold">Reliance Industries</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <Badge className="bg-success-light text-success">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          BUY
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Entry Price</p>
                        <p className="text-lg font-semibold">₹2,500</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Target Price</p>
                        <p className="text-lg font-semibold text-success">₹2,700</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stop Loss</p>
                        <p className="text-lg font-semibold text-destructive">₹2,400</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Message Script</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Hello, this is a stock recommendation from our research team. We recommend
                      buying Reliance Industries at ₹2,500 with a target price of ₹2,700 and
                      stop loss at ₹2,400. The stock shows strong fundamentals with quarterly
                      revenue growth of 15%. For more details, please check your client portal.
                    </p>
                    <Button variant="outline">
                      <Play className="mr-2 h-4 w-4" />
                      Play Audio Message
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Customers</p>
                      <p className="text-3xl font-bold">50</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Calls Delivered</p>
                      <p className="text-3xl font-bold text-success">47</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Buy Confirmation</p>
                      <p className="text-3xl font-bold text-primary">38</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-3xl font-bold">76%</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Created:</span>
                      <span className="font-medium">Jan 14, 2024</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Scheduled:</span>
                      <span className="font-medium">Jan 15, 2024 9:00 AM</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">Jan 15, 2024 9:25 AM</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Call Execution Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Attempt 1</TableHead>
                      <TableHead>Attempt 2</TableHead>
                      <TableHead>Attempt 3</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {callLogs.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{log.customer}</TableCell>
                        <TableCell>{log.phone}</TableCell>
                        <TableCell>
                          <Badge variant={log.attempt1 === "Delivered" ? "default" : "outline"}>
                            {log.attempt1}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {log.attempt2 !== "-" ? (
                            <Badge variant={log.attempt2 === "Delivered" ? "default" : "outline"}>
                              {log.attempt2}
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          {log.attempt3 !== "-" ? (
                            <Badge variant={log.attempt3 === "Delivered" ? "default" : "destructive"}>
                              {log.attempt3}
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              log.status === "completed"
                                ? "bg-success-light text-success"
                                : "bg-destructive-light text-destructive"
                            }
                          >
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holdings">
            <Card>
              <CardHeader>
                <CardTitle>Broker Holdings Confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Broker</TableHead>
                      <TableHead>Bought Stock?</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Avg Price</TableHead>
                      <TableHead>Last Synced</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holdings.map((holding, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{holding.customer}</TableCell>
                        <TableCell>{holding.broker}</TableCell>
                        <TableCell>
                          {holding.bought ? (
                            <div className="flex items-center gap-2 text-success">
                              <CheckCircle className="h-4 w-4" />
                              <span className="font-medium">Yes</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <XCircle className="h-4 w-4" />
                              <span>No</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {holding.qty > 0 ? holding.qty : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          {holding.avgPrice > 0 ? `₹${holding.avgPrice}` : "-"}
                        </TableCell>
                        <TableCell>{holding.syncTime}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "9:25 AM", event: "All calls completed", status: "success" },
                    { time: "9:20 AM", event: "Call retry #3 initiated for 3 customers", status: "info" },
                    { time: "9:15 AM", event: "Call retry #2 initiated for 5 customers", status: "info" },
                    { time: "9:10 AM", event: "Call retry #1 initiated for 8 customers", status: "info" },
                    { time: "9:05 AM", event: "Initial calls sent to 50 customers", status: "info" },
                    { time: "9:00 AM", event: "Recommendation scheduled execution started", status: "success" },
                    { time: "Jan 14, 8:30 PM", event: "Recommendation published and scheduled", status: "success" },
                    { time: "Jan 14, 8:25 PM", event: "Recommendation created", status: "info" },
                  ].map((log, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                      <div
                        className={`h-2 w-2 mt-2 rounded-full ${
                          log.status === "success" ? "bg-success" : "bg-primary"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{log.event}</p>
                        <p className="text-sm text-muted-foreground">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default RecommendationDetails;
