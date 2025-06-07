import { useMemo, useState } from "react";
import paymentsMock from "../mocks/payments";
import "./PaymentsPage.css";

const statusOptions = ["All", "Completed", "Pending", "Failed", "Refunded"];

const PaymentsPage = ({ collapsed }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredPayments = useMemo(() => {
    return paymentsMock.filter(payment => {
      const matchesSearch =
        payment.id.toLowerCase().includes(search.toLowerCase()) ||
        payment.payer.toLowerCase().includes(search.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "All" || payment.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <main className={`paymentsPageContainer ${collapsed ? "collapsed" : ""}`}>
      <h2 className="paymentsTitle">Payments</h2>
      <div className="paymentsFilters">
        <input
          type="search"
          placeholder="Search by payer, payment ID, or order ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="paymentsSearchInput"
        />
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="paymentsStatusSelect"
        >
          {statusOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="paymentsTableWrapper">
        <table className="paymentsTable">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Payer</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan={9} className="noPayments">No payments found.</td>
              </tr>
            ) : (
              filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.orderId}</td>
                  <td>{payment.payer}</td>
                  <td>{payment.email}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.currency}</td>
                  <td>{payment.method}</td>
                  <td>
                    <span className={`paymentStatusTag status-${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default PaymentsPage;
