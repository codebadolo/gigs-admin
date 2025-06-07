const paymentsMock = [
  {
    id: "PAY-001",
    orderId: "ORD-001",
    payer: "Alice Martin",
    amount: 120,
    currency: "EUR",
    method: "Credit Card",
    status: "Completed",
    date: "2025-06-01",
    email: "alice.martin@email.com",
  },
  {
    id: "PAY-002",
    orderId: "ORD-002",
    payer: "Bob Johnson",
    amount: 90,
    currency: "EUR",
    method: "PayPal",
    status: "Pending",
    date: "2025-05-28",
    email: "bob.johnson@email.com",
  },
  // ...more payments
];

export default paymentsMock;
