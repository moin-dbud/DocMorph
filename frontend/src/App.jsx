import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Pricing from "./pages/Pricing";
import Home from "./pages/Home";
import Convert from "./pages/Convert";
import PaymentSuccess from "./pages/PaymentSuccess";
import Billing from "./pages/Billing";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/admin/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminPayments from "./pages/admin/PAyments";
import AdminConversions from "./pages/admin/Conversions";
import Contact from "./pages/Contact";
import WhatsAppCTA from "./components/WhatsAppCTA";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/convert"
          element={
            <>
              <Navbar />
              <Convert />
            </>
          }
        />
        <Route
          path="/pricing"
          element={
            <>

              <Pricing />
            </>
          }
        />
        <Route
          path="/payment-success"
          element={
            <PaymentSuccess />
          }
        />
        <Route
          path="/billing"
          element={
            <>
              <Navbar />
              <Billing />
            </>
          }
        />
        <Route 
          path="/contact-us" 
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
            } 
        />
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="conversions" element={<AdminConversions />} />
          </Route>
        </Route>
      </Routes>

      <WhatsAppCTA />

    </BrowserRouter>

  );
}
