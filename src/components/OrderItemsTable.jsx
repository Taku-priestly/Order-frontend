export default function OrderItemsTable({ items }) {
  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Menu ID</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.order_item_id}>
            <td>{item.menu_id}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
