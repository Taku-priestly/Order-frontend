import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../content/AuthContext.jsx';
import { getUserOrders } from '../Api/order.api.js';
import OrderCard from '../components/OrderCard';

export default function OrdersList() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getUserOrders(user.id).then(res => setOrders(res.data));
  }, [user.id]);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(order => (
        <OrderCard key={order.order_id} order={order} />
      ))}
    </div>
  );
}
