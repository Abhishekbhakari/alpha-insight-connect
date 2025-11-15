import { AppLayout } from "@/components/Layout/AppLayout";
import { CustomerTable } from "@/components/Customers/CustomerTable";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download } from "lucide-react";

const Customers = () => {
  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground">
              Manage your client base and broker integrations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary-dark">
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              All Customers
            </Button>
            <Button variant="outline" size="sm">
              Holdings Linked
            </Button>
            <Button variant="outline" size="sm">
              Bought Stock
            </Button>
          </div>
        </div>

        {/* Customer Table */}
        <CustomerTable />
      </div>
    </AppLayout>
  );
};

export default Customers;
