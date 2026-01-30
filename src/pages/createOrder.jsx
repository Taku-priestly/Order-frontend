import React, { useState } from "react";
import { createOrder } from "../api/order.api";
import { FaPlus, FaMinus, FaSearch } from "react-icons/fa";

// MAIN DISHES
import ndole from "../assets/ndole.jpg";
import eru from "../assets/eru.jpg";
import fish from "../assets/fish.jpg";
import poulet from "../assets/poulet.jpg";

// SNACKS
import fishpie from "../assets/fishpie.jpg";
import groundnut from "../assets/groundnut.jpg";
import cakes from "../assets/cakes.jpg";

// DRINKS
import energydrink from "../assets/energydrink.jpg";
import milkcofee from "../assets/milkcofee.jpg";
import milshake from "../assets/milshake.jpg";

const FOOD_MENU = [
  { id: 1, name: "Ndole", price: 2500, img: ndole, category: "Main Dishes" },
  { id: 2, name: "Eru", price: 2500, img: eru, category: "Main Dishes" },
  { id: 3, name: "Fish Peppersoup", price: 3000, img: fish, category: "Drink" },
  { id: 4, name: "Poulet DG", price: 4000, img: poulet, category: "Main Dishes" },

  // SNACKS
  { id: 5, name: "Fishpie", price: 500, img: fishpie, category: "Snack" },
  { id: 6, name: "Groundnut", price: 700, img: groundnut, category: "Snack" },
  { id: 7, name: "Cake", price: 600, img: cakes, category: "Snack" },

  // DRINKS
  { id: 8, name: "Energydrink", price: 500, img: energydrink, category: "Drink" },
  { id: 9, name: "Milkcofee", price: 1000, img: milkcofee, category: "Drink" },
  { id: 10, name: "Milkshake", price: 800, img: milshake, category: "Drink" },
];

const CATEGORIES = ["All", "Main Dishes", "Snack", "Drink"];

export default function CreateOrder() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const addItem = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    if (exists) {
      setCart(cart.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const decreaseItem = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    if (!exists) return;

    if (exists.qty === 1) {
      setCart(cart.filter((i) => i.id !== item.id));
    } else {
      setCart(cart.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty - 1 } : i
      ));
    }
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  /**
   * 🔑 BACKEND-COMPATIBLE PAYLOAD
   */
  const submitOrder = async () => {
    const order_items = cart.map((item) => ({
      menu_id: item.id,
      quantity: item.qty,
      price: item.price,
    }));

    await createOrder({
      student_id: 2,
      vendor_id: 1,
      total_amount: total,
      order_items, // ✅ validator-compliant
    });

    alert("Order placed successfully (Pending)");
    setCart([]);
  };

  const filteredMenu = FOOD_MENU.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || f.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.headerRow}>
        <h2>Student Specials 🇨🇲</h2>
        <div style={styles.searchBox}>
          <FaSearch />
          <input
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div style={styles.filters}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            style={{
              ...styles.filterBtn,
              background: activeCategory === cat ? "#f97316" : "#fff",
              color: activeCategory === cat ? "#fff" : "#334155",
            }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={styles.layout}>
        {/* FOOD GRID */}
        <div style={styles.grid}>
          {filteredMenu.map((food) => (
            <div key={food.id} style={styles.card}>
              <img src={food.img} style={styles.img} />
              <h4>{food.name}</h4>
              <p style={styles.foodPrice}>{food.price} FCFA</p>
              <button style={styles.addBtn} onClick={() => addItem(food)}>
                <FaPlus />
              </button>
            </div>
          ))}
        </div>

        {/* ORDER PANEL */}
        <div style={styles.order}>
          <h3>Your Order</h3>

          {cart.length === 0 && <p style={styles.empty}>No items added</p>}

          {cart.map((i) => (
            <div key={i.id} style={styles.row}>
              <span>{i.name}</span>
              <div style={styles.qtyBox}>
                <FaMinus onClick={() => decreaseItem(i)} />
                <span>{i.qty}</span>
                <FaPlus onClick={() => addItem(i)} />
              </div>
              <span>{i.price * i.qty} FCFA</span>
            </div>
          ))}

          <hr />
          <h4>Total: {total} FCFA</h4>

          <button
            disabled={total === 0}
            onClick={submitOrder}
            style={{ ...styles.submit, opacity: total === 0 ? 0.6 : 1 }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: { padding: 30, background: "#fef9f5", minHeight: "100vh" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  searchBox: { display: "flex", alignItems: "center", gap: 6, background: "#fff", padding: "6px 12px", borderRadius: 20 },
  searchInput: { border: "none", outline: "none" },
  filters: { display: "flex", gap: 10, marginBottom: 20 },
  filterBtn: { padding: "6px 14px", borderRadius: 20, border: "1px solid #e2e8f0", cursor: "pointer" },
  layout: { display: "grid", gridTemplateColumns: "3fr 1fr", gap: 20 },
  grid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 },
  card: { background: "#fff", padding: 12, borderRadius: 12 },
  img: { width: "100%", height: 150, objectFit: "cover", borderRadius: 10 },
  foodPrice: { fontWeight: 600, color: "#f97316" },
  addBtn: { marginTop: 8, padding: 8, borderRadius: 8, border: "none", background: "#f97316", color: "#fff" },
  order: { background: "#fff", padding: 20, borderRadius: 12 },
  row: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  qtyBox: { display: "flex", gap: 8, cursor: "pointer" },
  empty: { fontSize: 13, color: "#64748b" },
  submit: { width: "100%", padding: 12, background: "#f97316", color: "#fff", border: "none", borderRadius: 8 }
};
