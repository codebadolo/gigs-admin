import { useMemo, useState } from "react";
import ordersMock from "../mocks/orders";
import "./OrderPage.css";

const statuses = ["All", "In Progress", "Completed", "Cancelled"];

const OrderPage = ({ collapsed }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState([]);
  const [orderModal, setOrderModal] = useState(null);

  // Date filter (for demo, not implemented in mock)
  // const [dateFrom, setDateFrom] = useState("");
  // const [dateTo, setDateTo] = useState("");

  const filteredOrders = useMemo(() => {
    return ordersMock.filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.buyer.toLowerCase().includes(search.toLowerCase()) ||
        order.gig.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "All" || order.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  // Bulk selection
  const toggleSelect = (id) => {
    setSelected(sel =>
      sel.includes(id) ? sel.filter(i => i !== id) : [...sel, id]
    );
  };

  const selectAll = () => {
    if (selected.length === filteredOrders.length) setSelected([]);
    else setSelected(filteredOrders.map(o => o.id));
  };

  // Bulk action example
  const bulkCancel = () => {
    alert(`Cancel orders: ${selected.join(", ")}`);
    setSelected([]);
  };

  // Row actions
  const openOrder = (order) => setOrderModal(order);
  const closeOrder = () => setOrderModal(null);

  return (
    <main className={`ordersPageContainer ${collapsed ? "collapsed" : ""}`}>
      <h2 className="ordersTitle">Orders</h2>
      <div className="ordersFilters">
        <input
          type="search"
          placeholder="Search by client, gig, or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="ordersSearchInput"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="ordersStatusSelect"
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {/* <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} /> */}
      </div>

      {selected.length > 0 && (
        <div className="bulkActionsBar">
          <span>{selected.length} selected</span>
          <button className="bulkBtn cancel" onClick={bulkCancel}>Cancel</button>
          {/* Add more bulk actions here */}
        </div>
      )}

      <div className="ordersTableWrapper">
        <table className="ordersTable">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selected.length === filteredOrders.length && filteredOrders.length > 0}
                  onChange={selectAll}
                />
              </th>
              <th>ID</th>
              <th>Client</th>
              <th>Gig</th>
              <th>Country</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total (€)</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={10} className="noOrders">No orders found.</td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} className={selected.includes(order.id) ? "selectedRow" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(order.id)}
                      onChange={() => toggleSelect(order.id)}
                    />
                  </td>
                  <td>{order.id}</td>
                  <td>
                    <div className="buyerCell">
                      <div className="avatar">{order.buyer.charAt(0)}</div>
                      <span>{order.buyer}</span>
                    </div>
                  </td>
                  <td>{order.gig}</td>
                  <td>{order.country}</td>
                  <td>
                    <span className={`statusTag status-${order.status.replace(/\s/g, '').toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.total} €</td>
                  <td>{order.email}</td>
                  <td>
                    <button className="actionBtn view" onClick={() => openOrder(order)}>👁️</button>
                    <button className="actionBtn edit">✏️</button>
                    <button className="actionBtn cancel">✖️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {orderModal && (
        <div className="orderModalBackdrop" onClick={closeOrder}>
          <div className="orderModal" onClick={e => e.stopPropagation()}>
            <h3>Order Details: {orderModal.id}</h3>
            <p><strong>Client:</strong> {orderModal.buyer}</p>
            <p><strong>Gig:</strong> {orderModal.gig}</p>
            <p><strong>Status:</strong> {orderModal.status}</p>
            <p><strong>Date:</strong> {orderModal.date}</p>
            <p><strong>Total:</strong> {orderModal.total} €</p>
            <p><strong>Email:</strong> {orderModal.email}</p>
            <p><strong>Country:</strong> {orderModal.country}</p>
            <div className="modalActions">
              <button className="actionBtn edit">Edit</button>
              <button className="actionBtn cancel">Cancel</button>
              <button className="actionBtn close" onClick={closeOrder}>Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default OrderPage;
