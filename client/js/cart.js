const token = localStorage.getItem("token");
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

async function loadCart() {
  const res = await fetch("https://onlinecakeorder-4.onrender.com/api/products", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const products = await res.json();

  const cartList = document.getElementById("cartItems");
  cartItems.forEach(id => {
    const p = products.find(item => item._id === id);
    if (p) {
      const div = document.createElement("div");
      div.innerHTML = `
        <h4>${p.name}</h4>
        <p>${p.price}</p>
      `;
      cartList.appendChild(div);
    }
  });
}

function placeOrder() {
  fetch("https://onlinecakeorder-4.onrender.com/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ items: cartItems })
  }).then(res => res.json()).then(data => {
    alert("Order placed successfully");
    localStorage.removeItem("cart");
    window.location.href = "order.html";
  });
}

loadCart();