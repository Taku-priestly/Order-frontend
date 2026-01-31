import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderDashboard() {
  const navigate = useNavigate();

  const pages = [
    { name: "Create Order", route: "/create-order" },
    { name: "My Orders", route: "/my-orders" },
    { name: "Vendor Orders", route: "/vendor-orders" },
    { name: "Order Details", route: "/order-details/1" },
  ];

  return (
    <div style={styles.page}>
      <h1 style={styles.header}>Order Dashboard</h1>

      <div style={styles.grid}>
        {pages.map((page) => (
          <div key={page.name} style={styles.card}>
            <h2>{page.name}</h2>

            <button
              style={styles.btn}
              onClick={() => navigate(page.route)}
            >
              Go
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: 30,
    minHeight: "100vh",
    background: "#fef9f5",
  },
  header: {
    marginBottom: 20,
    color: "#334155",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,.1)",
    textAlign: "center",
  },
  btn: {
    marginTop: 12,
    padding: "10px 16px",
    background: "#f97316",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
};
