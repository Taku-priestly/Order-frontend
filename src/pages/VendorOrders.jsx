import { useEffect, useContext, useState } from 'react';
import { getUserOrders } from '../Api/order.api.js';
import { AuthContext } from '../content/AuthContext.jsx';
import OrderStatusUpdater from '../components/OrderStatusUpdater';

export default function VendorOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserOrders(user.id).then(res => setOrders(res.data));
  }, [user.id]);

  return (
    <div style={styles.page}>
      <h2 style={styles.header}>Vendor Orders</h2>

      <form style={styles.form}>
        {orders.length === 0 && <p style={styles.empty}>No orders yet.</p>}

        <div style={styles.grid}>
          {orders.map(order => (
            <div key={order.order_id} style={styles.card}>
              <div style={styles.row}>
                <span style={styles.orderLabel}>Order ID:</span>
                <span>#{order.order_id}</span>
              </div>

              <div style={styles.row}>
                <span style={styles.orderLabel}>Status:</span>
                <span>{order.status}</span>
              </div>

              <div style={styles.row}>
                <span style={styles.orderLabel}>Total Amount:</span>
                <span>{order.total_amount} FCFA</span>
              </div>

              <div style={styles.statusUpdater}>
                <OrderStatusUpdater orderId={order.order_id} />
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

const styles = {
  page: { padding: 30, minHeight: "100vh", background: "#fef9f5" },
  header: { marginBottom: 20, color: "#334155" },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  empty: { fontSize: 14, color: "#64748b" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
  card: { background: "#fff", padding: 20, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
  row: { display: "flex", justifyContent: "space-between", marginBottom: 10 },
  orderLabel: { fontWeight: 600, color: "#f97316" },
  statusUpdater: { marginTop: 12 }
};
