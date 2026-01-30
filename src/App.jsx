import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateOrder from './pages/createOrder.jsx';
import OrdersList from './pages/OrderList';
import OrderDetails from './pages/OrderDetails';
import VendorOrders from './pages/VendorOrders';
import { AuthContext } from './content/AuthContext';
import OrderDashboard from "./pages/OrderDashboard";
import './App.css';


export default function App() {
  return (
    <AuthContext.Provider value={{ user: { id: 1, role: 'student' } }}>
      <BrowserRouter>
        <Routes>
  <Route path="/" element={<OrderDashboard />} />
  <Route path="/" element={<h1>Welcome to Order Management System</h1>} />
  <Route path="/orders/create" element={<CreateOrder />} />
  <Route path="/orders" element={<OrdersList />} />
  <Route path="/orders/:id" element={<OrderDetails />} />
  <Route path="/vendor/orders" element={<VendorOrders />} />
</Routes>

      </BrowserRouter>
    </AuthContext.Provider>
  );
}
