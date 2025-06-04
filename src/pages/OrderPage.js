import "./OrderPage.css";

const ordersData = [
  { id: 101, gig: "Logo Design", buyer: "Eve", status: "Completed" },
  { id: 102, gig: "SEO Optimization", buyer: "Frank", status: "Pending" },
];

const OrderPage = () => {
  return (
    <div className="pageContainer">
      <h2>Orders</h2>
      <table className="dataTable">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Gig</th>
            <th>Buyer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.gig}</td>
              <td>{order.buyer}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
