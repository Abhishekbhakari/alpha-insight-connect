import { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  Phone,
  User,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

type OnboardingStatus = "pending_send" | "in_progress" | "completed";

interface OnboardingClient {
  id: string;
  name: string;
  phone: string;
  registeredDate: string;
  sentDate?: string;
  signedDate?: string;
  status: OnboardingStatus;
  daysSinceSent?: number;
  nudgesSent: number;
  totalNudges: number;
}

const mockClients: OnboardingClient[] = [
  { id: "1", name: "Rajesh Kumar", phone: "+91 98765 43210", registeredDate: "2025-02-25", status: "pending_send", nudgesSent: 0, totalNudges: 3 },
  { id: "2", name: "Priya Sharma", phone: "+91 87654 32109", registeredDate: "2025-02-24", status: "pending_send", nudgesSent: 0, totalNudges: 3 },
  { id: "3", name: "Amit Patel", phone: "+91 76543 21098", registeredDate: "2025-02-23", sentDate: "2025-02-24", status: "in_progress", daysSinceSent: 1, nudgesSent: 1, totalNudges: 3 },
  { id: "4", name: "Deepa Reddy", phone: "+91 65432 10987", registeredDate: "2025-02-22", sentDate: "2025-02-23", status: "in_progress", daysSinceSent: 2, nudgesSent: 2, totalNudges: 3 },
  { id: "5", name: "Suresh Nair", phone: "+91 54321 09876", registeredDate: "2025-02-20", sentDate: "2025-02-21", status: "in_progress", daysSinceSent: 3, nudgesSent: 3, totalNudges: 3 },
  { id: "6", name: "Kavita Joshi", phone: "+91 43210 98765", registeredDate: "2025-02-18", sentDate: "2025-02-19", status: "in_progress", daysSinceSent: 4, nudgesSent: 3, totalNudges: 3 },
  { id: "7", name: "Vikram Singh", phone: "+91 32109 87654", registeredDate: "2025-02-15", sentDate: "2025-02-16", signedDate: "2025-02-17", status: "completed", nudgesSent: 1, totalNudges: 3 },
  { id: "8", name: "Neha Gupta", phone: "+91 21098 76543", registeredDate: "2025-02-14", sentDate: "2025-02-15", signedDate: "2025-02-16", status: "completed", nudgesSent: 2, totalNudges: 3 },
  { id: "9", name: "Rohit Mehta", phone: "+91 10987 65432", registeredDate: "2025-02-12", sentDate: "2025-02-13", signedDate: "2025-02-14", status: "completed", nudgesSent: 1, totalNudges: 3 },
];

function getCountdownBadge(daysSinceSent?: number) {
  if (daysSinceSent === undefined) return null;
  if (daysSinceSent <= 1) {
    return (
      <Badge className="bg-hsl(var(--success)) bg-[hsl(160,84%,39%)] text-white border-0 text-xs font-bold">
        Day {daysSinceSent}
      </Badge>
    );
  }
  if (daysSinceSent === 2) {
    return (
      <Badge className="bg-[hsl(38,92%,50%)] text-white border-0 text-xs font-bold">
        Day 2
      </Badge>
    );
  }
  if (daysSinceSent === 3) {
    return (
      <Badge className="bg-[hsl(0,84%,60%)] text-white border-0 text-xs font-bold animate-pulse">
        🚨 Expires Today
      </Badge>
    );
  }
  return (
    <Badge className="bg-[hsl(0,84%,60%)] text-white border-0 text-xs font-bold">
      ❌ Expired
    </Badge>
  );
}

function NudgeTracker({ sent, total }: { sent: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground mr-1">Nudges:</span>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2.5 w-2.5 rounded-full transition-colors ${
            i < sent
              ? "bg-[hsl(160,84%,39%)]"
              : "bg-border"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">
        {sent}/{total}
      </span>
    </div>
  );
}

function KanbanColumn({
  title,
  icon: Icon,
  count,
  color,
  children,
}: {
  title: string;
  icon: React.ElementType;
  count: number;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-[320px]">
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <Badge variant="secondary" className="ml-auto text-xs">{count}</Badge>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export default function Onboarding() {
  const [clients, setClients] = useState(mockClients);
  const [loading] = useState(false);

  const pendingSend = clients.filter((c) => c.status === "pending_send");
  const inProgress = clients.filter((c) => c.status === "in_progress");
  const completed = clients.filter((c) => c.status === "completed");

  const handleMarkSent = (id: string) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "in_progress" as OnboardingStatus, sentDate: new Date().toISOString().split("T")[0], daysSinceSent: 0, nudgesSent: 0 }
          : c
      )
    );
  };

  const handleMarkSigned = (id: string) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "completed" as OnboardingStatus, signedDate: new Date().toISOString().split("T")[0] }
          : c
      )
    );
  };

  const handleResendLink = (id: string) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, daysSinceSent: 0, nudgesSent: 0, sentDate: new Date().toISOString().split("T")[0] }
          : c
      )
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">E-Sign & Onboarding</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage client agreements with automated 3-day follow-up workflows
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingSend.length}</p>
                <p className="text-xs text-muted-foreground">Pending Send</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(38,92%,96%)] flex items-center justify-center">
                <Send className="h-5 w-5 text-[hsl(38,92%,50%)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgress.length}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(160,84%,95%)] flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-[hsl(160,84%,39%)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completed.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-[hsl(0,84%,96%)] flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-[hsl(0,84%,60%)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {inProgress.filter((c) => (c.daysSinceSent ?? 0) >= 3).length}
                </p>
                <p className="text-xs text-muted-foreground">Expiring / Expired</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {/* Pending Send */}
          <KanbanColumn
            title="Pending Send"
            icon={Clock}
            count={pendingSend.length}
            color="bg-muted-foreground"
          >
            {pendingSend.map((client) => (
              <Card key={client.id} className="border-l-4 border-l-muted-foreground">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-sm text-foreground">{client.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{client.phone}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">New</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Registered: {client.registeredDate}
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleMarkSent(client.id)}
                  >
                    <Send className="h-3.5 w-3.5 mr-2" />
                    Mark Document Sent
                  </Button>
                </CardContent>
              </Card>
            ))}
            {pendingSend.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-lg">
                No pending clients
              </div>
            )}
          </KanbanColumn>

          {/* In Progress */}
          <KanbanColumn
            title="In Progress (3-Day Window)"
            icon={Send}
            count={inProgress.length}
            color="bg-[hsl(38,92%,50%)]"
          >
            {inProgress.map((client) => {
              const isExpired = (client.daysSinceSent ?? 0) > 3;
              return (
                <Card
                  key={client.id}
                  className={`border-l-4 ${
                    isExpired
                      ? "border-l-[hsl(0,84%,60%)] bg-[hsl(0,84%,98%)]"
                      : (client.daysSinceSent ?? 0) >= 3
                      ? "border-l-[hsl(0,84%,60%)]"
                      : (client.daysSinceSent ?? 0) >= 2
                      ? "border-l-[hsl(38,92%,50%)]"
                      : "border-l-[hsl(160,84%,39%)]"
                  }`}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold text-sm text-foreground">{client.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{client.phone}</span>
                        </div>
                      </div>
                      {getCountdownBadge(client.daysSinceSent)}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Sent: {client.sentDate}</span>
                    </div>

                    <NudgeTracker sent={client.nudgesSent} total={client.totalNudges} />

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-[hsl(160,84%,39%)] hover:bg-[hsl(160,84%,35%)] text-white"
                        onClick={() => handleMarkSigned(client.id)}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        Mark Signed
                      </Button>
                      {isExpired && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleResendLink(client.id)}
                        >
                          <RotateCcw className="h-3.5 w-3.5 mr-1" />
                          Resend
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {inProgress.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-lg">
                No clients in progress
              </div>
            )}
          </KanbanColumn>

          {/* Completed */}
          <KanbanColumn
            title="Completed"
            icon={CheckCircle2}
            count={completed.length}
            color="bg-[hsl(160,84%,39%)]"
          >
            {completed.map((client) => (
              <Card key={client.id} className="border-l-4 border-l-[hsl(160,84%,39%)]">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold text-sm text-foreground">{client.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{client.phone}</span>
                      </div>
                    </div>
                    <Badge className="bg-[hsl(160,84%,39%)] text-white border-0 text-xs">
                      ✓ Signed
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Signed: {client.signedDate}</span>
                    <NudgeTracker sent={client.nudgesSent} total={client.totalNudges} />
                  </div>
                </CardContent>
              </Card>
            ))}
            {completed.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-lg">
                No completed signups yet
              </div>
            )}
          </KanbanColumn>
        </div>
      </div>
    </AppLayout>
  );
}
