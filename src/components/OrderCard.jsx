import { Link } from 'react-router-dom';

export default function OrderCard({ order }) {
  return (
    <div className="border p-4 mb-3 rounded">
      <p><strong>Order ID:</strong> {order.order_id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> {order.total_amount}</p>

      <Link to={`/orders/${order.order_id}`} className="text-blue-600">
        View Details
      </Link>
    </div>
  );
}
