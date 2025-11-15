import { AppLayout } from "@/components/Layout/AppLayout";
import { RecommendationTable } from "@/components/Recommendations/RecommendationTable";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

const Recommendations = () => {
  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Recommendations</h1>
            <p className="text-muted-foreground">
              Manage your stock recommendations and call schedules
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary-dark">
            <Plus className="mr-2 h-4 w-4" />
            Create Recommendation
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              All
            </Button>
            <Button variant="outline" size="sm">
              Pending
            </Button>
            <Button variant="outline" size="sm">
              Scheduled
            </Button>
            <Button variant="outline" size="sm">
              Completed
            </Button>
          </div>
        </div>

        {/* Recommendations Table */}
        <RecommendationTable />
      </div>
    </AppLayout>
  );
};

export default Recommendations;
