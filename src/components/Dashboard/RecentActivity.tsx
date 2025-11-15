import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, TrendingUp, UserPlus, CheckCircle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "call",
    title: "Call completed to Rajesh Kumar",
    time: "2 minutes ago",
    icon: Phone,
    status: "success",
  },
  {
    id: 2,
    type: "recommendation",
    title: "New recommendation: TCS Buy",
    time: "15 minutes ago",
    icon: TrendingUp,
    status: "info",
  },
  {
    id: 3,
    type: "customer",
    title: "New customer added: Priya Sharma",
    time: "1 hour ago",
    icon: UserPlus,
    status: "default",
  },
  {
    id: 4,
    type: "confirmation",
    title: "Buy confirmation from Amit Patel",
    time: "2 hours ago",
    icon: CheckCircle,
    status: "success",
  },
];

const statusVariants = {
  success: "bg-success-light text-success",
  info: "bg-info-light text-info",
  default: "bg-muted text-muted-foreground",
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div
                className={`rounded-full p-2 ${
                  statusVariants[activity.status as keyof typeof statusVariants]
                }`}
              >
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-card-foreground">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
