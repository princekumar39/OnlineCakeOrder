const token = localStorage.getItem("token");

async function loadOrders() {
  const res = await fetch("https://onlinecakeorder-4.onrender.com/api/orders", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const orders = await res.json();

  const orderList = document.getElementById("orderList");
  orders.forEach(order => {
    const div = document.createElement("div");
    div.innerHTML = `<pre>${JSON.stringify(order, null, 2)}</pre>`;
    orderList.appendChild(div);
  });
}

loadOrders();