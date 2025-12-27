import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Recommendations from "./pages/Recommendations";
import Customers from "./pages/Customers";
import Calls from "./pages/Calls";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Retention from "./pages/Retention";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<AnalystLogin />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/setup" element={<FirstTimeSetup />} />
          
          {/* Analyst Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/recommendations/create" element={<CreateRecommendation />} />
          <Route path="/recommendations/:id" element={<RecommendationDetails />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/customers/:id" element={<CustomerProfile />} />
          <Route path="/calls" element={<Calls />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/retention" element={<Retention />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Customer Portal Routes */}
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