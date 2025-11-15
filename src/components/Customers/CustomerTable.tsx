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
import { Eye, Phone, CheckCircle, XCircle } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  broker: string;
  holdingsLinked: boolean;
  lastCallStatus: "completed" | "missed" | "pending";
  boughtStock: boolean;
}

const customers: Customer[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    broker: "Zerodha",
    holdingsLinked: true,
    lastCallStatus: "completed",
    boughtStock: true,
  },
  {
    id: "2",
    name: "Priya Sharma",
    phone: "+91 98765 43211",
    broker: "Angel One",
    holdingsLinked: true,
    lastCallStatus: "completed",
    boughtStock: false,
  },
  {
    id: "3",
    name: "Amit Patel",
    phone: "+91 98765 43212",
    broker: "Dhan",
    holdingsLinked: false,
    lastCallStatus: "missed",
    boughtStock: false,
  },
];

const callStatusConfig = {
  completed: { label: "Completed", className: "bg-success-light text-success" },
  missed: { label: "Missed", className: "bg-destructive-light text-destructive" },
  pending: { label: "Pending", className: "bg-warning-light text-warning" },
};

export const CustomerTable = () => {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Broker</TableHead>
            <TableHead>Holdings</TableHead>
            <TableHead>Last Call</TableHead>
            <TableHead>Buy Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {customer.phone}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{customer.broker}</Badge>
              </TableCell>
              <TableCell>
                {customer.holdingsLinked ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                )}
              </TableCell>
              <TableCell>
                <Badge className={callStatusConfig[customer.lastCallStatus].className}>
                  {callStatusConfig[customer.lastCallStatus].label}
                </Badge>
              </TableCell>
              <TableCell>
                {customer.boughtStock ? (
                  <Badge className="bg-success-light text-success">Bought</Badge>
                ) : (
                  <Badge className="bg-muted text-muted-foreground">Not Bought</Badge>
                )}
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
