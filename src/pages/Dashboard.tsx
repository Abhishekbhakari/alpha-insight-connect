import { AppLayout } from "@/components/Layout/AppLayout";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { RecentActivity } from "@/components/Dashboard/RecentActivity";
import { Users, Phone, CheckCircle, PhoneOff } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your stock recommendations and client engagement
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Clients"
            value="50"
            icon={Users}
            trend={{ value: "+5 this month", positive: true }}
            variant="info"
          />
          <StatsCard
            title="Calls Completed"
            value="145"
            icon={Phone}
            trend={{ value: "+12 today", positive: true }}
            variant="success"
          />
          <StatsCard
            title="Buy Confirmations"
            value="38"
            icon={CheckCircle}
            trend={{ value: "76% conversion", positive: true }}
            variant="success"
          />
          <StatsCard
            title="Missed Calls"
            value="7"
            icon={PhoneOff}
            trend={{ value: "-3 vs yesterday", positive: true }}
            variant="warning"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark">
                  Create Recommendation
                </button>
                <button className="w-full rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted">
                  Add Customer
                </button>
                <button className="w-full rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-muted">
                  View Call Logs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
