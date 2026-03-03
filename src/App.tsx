import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Clients from "./pages/Clients";
import Portfolio from "./pages/Portfolio";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import CreateRecommendation from "./pages/CreateRecommendation";
import AddCustomer from "./pages/AddCustomer";
import RecommendationDetails from "./pages/RecommendationDetails";
import CustomerProfile from "./pages/CustomerProfile";
import AnalystLogin from "./pages/auth/AnalystLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import FirstTimeSetup from "./pages/auth/FirstTimeSetup";
import CustomerLogin from "./pages/customer/CustomerLogin";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerHoldings from "./pages/customer/CustomerHoldings";
import CustomerHistory from "./pages/customer/CustomerHistory";
import ShadowPortfolio from "./pages/customer/ShadowPortfolio";
import Logs from "./pages/Logs";
import NotFound from "./pages/NotFound";

// eSign Module
import ESignDashboard from "./pages/esign/ESignDashboard";
import SendDocument from "./pages/esign/SendDocument";
import BulkUpload from "./pages/esign/BulkUpload";
import WorkflowManagement from "./pages/esign/WorkflowManagement";
import DocumentDetails from "./pages/esign/DocumentDetails";
import ESignSettings from "./pages/esign/ESignSettings";
import ESignReports from "./pages/esign/ESignReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/auth/login" element={<AnalystLogin />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/setup" element={<FirstTimeSetup />} />

          {/* Analyst */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/add" element={<AddCustomer />} />
          <Route path="/clients/:id" element={<CustomerProfile />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/recommendations/create" element={<CreateRecommendation />} />
          <Route path="/recommendations/:id" element={<RecommendationDetails />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logs" element={<Logs />} />

          {/* eSign Module */}
          <Route path="/esign" element={<ESignDashboard />} />
          <Route path="/esign/send" element={<SendDocument />} />
          <Route path="/esign/bulk" element={<BulkUpload />} />
          <Route path="/esign/workflows" element={<WorkflowManagement />} />
          <Route path="/esign/documents/:id" element={<DocumentDetails />} />
          <Route path="/esign/settings" element={<ESignSettings />} />
          <Route path="/esign/reports" element={<ESignReports />} />

          {/* Redirect old onboarding to eSign */}
          <Route path="/onboarding" element={<Navigate to="/esign" replace />} />

          {/* Customer Portal */}
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/holdings" element={<ShadowPortfolio />} />
          <Route path="/customer/history" element={<CustomerHistory />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;