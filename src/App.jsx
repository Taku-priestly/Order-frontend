import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateOrder from "./pages/createOrder.jsx";
import OrdersList from "./pages/OrderList";
import OrderDetails from "./pages/OrderDetails";
import VendorOrders from "./pages/VendorOrders";
import OrderDashboard from "./pages/OrderDashboard";
import { AuthContext } from "./content/AuthContext";
import "./App.css";

export default function App() {
  return (
    <AuthContext.Provider value={{ user: { id: 1, role: "student" } }}>
      <BrowserRouter>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<OrderDashboard />} />

          {/* Student routes */}
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/my-orders" element={<OrdersList />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />

          {/* Vendor routes */}
          <Route path="/vendor-orders" element={<VendorOrders />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
