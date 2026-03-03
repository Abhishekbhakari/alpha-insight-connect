import { AppLayout } from "@/components/Layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Download, Upload, FileSpreadsheet, CheckCircle2, XCircle, AlertTriangle,
  ArrowLeft, Loader2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const validationResults = [
  { row: 1, name: "Rahul Sharma", email: "rahul@example.com", status: "valid" },
  { row: 2, name: "Priya Patel", email: "priya@example.com", status: "valid" },
  { row: 3, name: "", email: "invalid-email", status: "invalid", error: "Missing name, invalid email format" },
  { row: 4, name: "Amit Kumar", email: "amit@example.com", status: "valid" },
  { row: 5, name: "Sneha Reddy", email: "sneha@example.com", status: "valid" },
  { row: 6, name: "Vikram Singh", email: "", status: "invalid", error: "Missing email address" },
];

export default function BulkUpload() {
  const navigate = useNavigate();
  const [workflow, setWorkflow] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleUpload = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setUploaded(true);
    }, 2000);
  };

  const validCount = validationResults.filter(r => r.status === "valid").length;
  const invalidCount = validationResults.filter(r => r.status === "invalid").length;

  return (
    <AppLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/esign")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Bulk Upload</h1>
            <p className="text-sm text-muted-foreground">Send multiple documents using an Excel template</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Instructions */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { step: 1, title: "Select Workflow", desc: "Choose the signing workflow to apply to all documents." },
                  { step: 2, title: "Download Template", desc: "Get the Excel template pre-configured for the selected workflow." },
                  { step: 3, title: "Fill & Upload", desc: "Add recipient details and upload the completed file." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{s.title}</p>
                      <p className="text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 space-y-3">
                  <Select value={workflow} onValueChange={setWorkflow}>
                    <SelectTrigger><SelectValue placeholder="Select a workflow..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Agreement</SelectItem>
                      <SelectItem value="dual">Dual Signer</SelectItem>
                      <SelectItem value="quick">Quick Consent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="w-full gap-2" disabled={!workflow}>
                    <Download className="h-4 w-4" /> Download Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload Section */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Excel File</CardTitle>
                <CardDescription>Upload the completed template with recipient details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!uploaded && !processing && (
                  <div
                    onClick={handleUpload}
                    className="border-2 border-dashed border-primary/30 rounded-xl p-10 text-center cursor-pointer hover:border-primary/60 hover:bg-accent/50 transition-all"
                  >
                    <FileSpreadsheet className="h-12 w-12 text-primary/50 mx-auto mb-3" />
                    <p className="font-medium text-foreground">Drop your Excel file here</p>
                    <p className="text-sm text-muted-foreground">.xlsx or .xls only</p>
                  </div>
                )}

                {processing && (
                  <div className="text-center py-10 space-y-4">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
                    <p className="font-medium text-foreground">Processing file...</p>
                    <Progress value={65} className="max-w-xs mx-auto" />
                  </div>
                )}

                {uploaded && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/30 border">
                      <FileSpreadsheet className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">recipients_batch_march.xlsx</p>
                        <p className="text-sm text-muted-foreground">6 entries found</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-[hsl(var(--success-light))] text-[hsl(var(--success))]">{validCount} valid</Badge>
                        {invalidCount > 0 && <Badge className="bg-[hsl(var(--destructive-light))] text-[hsl(var(--destructive))]">{invalidCount} errors</Badge>}
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-muted-foreground">
                            <th className="text-left py-2 px-3 font-medium">Row</th>
                            <th className="text-left py-2 px-3 font-medium">Name</th>
                            <th className="text-left py-2 px-3 font-medium">Email</th>
                            <th className="text-left py-2 px-3 font-medium">Status</th>
                            <th className="text-left py-2 px-3 font-medium">Error</th>
                          </tr>
                        </thead>
                        <tbody>
                          {validationResults.map((r) => (
                            <tr key={r.row} className="border-b last:border-0">
                              <td className="py-2 px-3">{r.row}</td>
                              <td className="py-2 px-3">{r.name || <span className="text-[hsl(var(--destructive))]">Missing</span>}</td>
                              <td className="py-2 px-3">{r.email || <span className="text-[hsl(var(--destructive))]">Missing</span>}</td>
                              <td className="py-2 px-3">
                                {r.status === "valid" ? (
                                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-[hsl(var(--destructive))]" />
                                )}
                              </td>
                              <td className="py-2 px-3 text-xs text-[hsl(var(--destructive))]">{r.error || ""}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setUploaded(false)}>Fix Errors & Re-upload</Button>
                      <Button>Proceed with {validCount} Valid Entries</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}