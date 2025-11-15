import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, Eye, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Recommendation {
  id: string;
  stockName: string;
  type: "Buy" | "Sell";
  entryPrice: number;
  stopLoss: number;
  scheduledTime: string;
  status: "pending" | "scheduled" | "completed" | "followup";
  customersReached: number;
  totalCustomers: number;
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    stockName: "TCS",
    type: "Buy",
    entryPrice: 3650,
    stopLoss: 3500,
    scheduledTime: "Today, 9:00 AM",
    status: "completed",
    customersReached: 45,
    totalCustomers: 50,
  },
  {
    id: "2",
    stockName: "Reliance",
    type: "Buy",
    entryPrice: 2450,
    stopLoss: 2350,
    scheduledTime: "Today, 10:00 AM",
    status: "scheduled",
    customersReached: 0,
    totalCustomers: 50,
  },
  {
    id: "3",
    stockName: "HDFC Bank",
    type: "Sell",
    entryPrice: 1580,
    stopLoss: 1650,
    scheduledTime: "Yesterday, 9:00 AM",
    status: "followup",
    customersReached: 48,
    totalCustomers: 50,
  },
];

const statusConfig = {
  pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
  scheduled: { label: "Scheduled", className: "bg-info-light text-info" },
  completed: { label: "Completed", className: "bg-success-light text-success" },
  followup: { label: "Follow-up", className: "bg-warning-light text-warning" },
};

export const RecommendationTable = () => {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Stock</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Entry Price</TableHead>
            <TableHead>Stop Loss</TableHead>
            <TableHead>Scheduled</TableHead>
            <TableHead>Reach</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recommendations.map((rec) => (
            <TableRow key={rec.id}>
              <TableCell className="font-medium">{rec.stockName}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {rec.type === "Buy" ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                  <span
                    className={cn(
                      "font-medium",
                      rec.type === "Buy" ? "text-success" : "text-destructive"
                    )}
                  >
                    {rec.type}
                  </span>
                </div>
              </TableCell>
              <TableCell>₹{rec.entryPrice}</TableCell>
              <TableCell>₹{rec.stopLoss}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {rec.scheduledTime}
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {rec.customersReached}/{rec.totalCustomers}
                </span>
              </TableCell>
              <TableCell>
                <Badge className={statusConfig[rec.status].className}>
                  {statusConfig[rec.status].label}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
