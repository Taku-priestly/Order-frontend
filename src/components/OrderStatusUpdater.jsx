import { updateOrderStatus } from '../Api/order.api.js';

export default function OrderStatusUpdater({ orderId }) {
  const statuses = ['accepted', 'preparing', 'completed'];

  return (
    <div>
      {statuses.map(status => (
        <button
          key={status}
          onClick={() => updateOrderStatus(orderId, status)}
          style={{ marginRight: '5px' }}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
