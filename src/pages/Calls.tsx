import { AppLayout } from "@/components/Layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, PhoneCall, PhoneMissed, PhoneOff, Clock } from "lucide-react";

const callStats = [
  { label: "Total Calls", value: "145", icon: Phone, variant: "default" },
  { label: "Completed", value: "128", icon: PhoneCall, variant: "success" },
  { label: "Missed", value: "12", icon: PhoneMissed, variant: "warning" },
  { label: "Failed", value: "5", icon: PhoneOff, variant: "destructive" },
];

const recentCalls = [
  {
    id: "1",
    customer: "Rajesh Kumar",
    phone: "+91 98765 43210",
    status: "completed",
    time: "9:05 AM",
    attempts: 1,
  },
  {
    id: "2",
    customer: "Priya Sharma",
    phone: "+91 98765 43211",
    status: "completed",
    time: "9:07 AM",
    attempts: 1,
  },
  {
    id: "3",
    customer: "Amit Patel",
    phone: "+91 98765 43212",
    status: "missed",
    time: "9:10 AM",
    attempts: 2,
  },
  {
    id: "4",
    customer: "Neha Singh",
    phone: "+91 98765 43213",
    status: "ringing",
    time: "9:12 AM",
    attempts: 1,
  },
];

const statusConfig = {
  completed: { label: "Completed", className: "bg-success-light text-success" },
  missed: { label: "Missed", className: "bg-destructive-light text-destructive" },
  ringing: { label: "Ringing", className: "bg-info-light text-info" },
  failed: { label: "Failed", className: "bg-destructive-light text-destructive" },
};

const Calls = () => {
  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Call Management</h1>
          <p className="text-muted-foreground">
            Monitor automated voice calls and customer engagement
          </p>
        </div>

        {/* Call Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {callStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Calls */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-card-foreground">
                        {call.customer}
                      </p>
                      <p className="text-sm text-muted-foreground">{call.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {call.time}
                    </div>
                    <Badge
                      className={
                        statusConfig[call.status as keyof typeof statusConfig]
                          .className
                      }
                    >
                      {statusConfig[call.status as keyof typeof statusConfig].label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {call.attempts} attempt{call.attempts > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Calls;
