import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrderById, cancelOrder } from '../api/order.api.js';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then(res => setOrder(res.data));
  }, [id]);

  const handleCancel = async () => {
    await cancelOrder(order.order_id);
    setOrder({ ...order, status: 'cancelled' });
    alert('Order cancelled');
  };

  if (!order) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.page}>
      <form style={styles.form}>
        <h2 style={styles.title}>Order Details</h2>

        {/* Order Info */}
        <div style={styles.formGroup}>
          <label>Order ID:</label>
          <input type="text" value={order.order_id} readOnly />
        </div>

        <div style={styles.formGroup}>
          <label>Status:</label>
          <input
            type="text"
            value={order.status}
            readOnly
            style={styles.statusInput(order.status)}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Total Amount:</label>
          <input
            type="text"
            value={`${order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)} FCFA`}
            readOnly
          />
        </div>

        {/* Order Items */}
        <h3 style={styles.subtitle}>Items</h3>
        <div style={styles.itemsContainer}>
          {order.items.map((item) => (
            <div key={item.menu_id} style={styles.itemRow}>
              <img
                src={item.img || 'https://via.placeholder.com/80'}
                alt={item.name}
                style={styles.img}
              />
              <div style={styles.itemInfo}>
                <p><b>{item.name}</b></p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price} FCFA</p>
                <p>Total: {item.quantity * item.price} FCFA</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cancel Button */}
        {order.status === 'pending' && (
          <button type="button" style={styles.cancelBtn} onClick={handleCancel}>
            Cancel Order
          </button>
        )}
      </form>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: 30,
    background: '#f3f4f6', // new page background color
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  form: {
    background: '#ffffff',
    padding: 30,
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: 700,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  title: {
    textAlign: 'center',
    color: '#f97316',
    marginBottom: 20,
  },
  subtitle: {
    color: '#334155',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: 6,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  statusInput: (status) => ({
    color: '#fff',
    background:
      status === 'pending' ? '#f97316' :
      status === 'completed' ? '#16a34a' :
      status === 'cancelled' ? '#ef4444' : '#64748b',
    padding: '6px 12px',
    borderRadius: 6,
    border: 'none',
    fontWeight: 'bold',
  }),
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  itemRow: {
    display: 'flex',
    gap: 12,
    background: '#fef9f5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  img: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: 10,
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  cancelBtn: {
    padding: '10px 20px',
    background: '#f97316',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    alignSelf: 'center',
    marginTop: 10,
  },
  loading: {
    padding: 30,
    fontSize: 16,
    color: '#64748b',
  },
};
