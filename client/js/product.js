let allProducts = [];

async function loadProducts() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/products", {
    headers: { Authorization: `Bearer ${token}` }
  });
  allProducts = await res.json();
  displayProducts(allProducts);
}

function displayProducts(products) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const min = parseFloat(document.getElementById("minPrice").value);
  const max = parseFloat(document.getElementById("maxPrice").value);

  let filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (!min || p.price >= min) &&
    (!max || p.price <= max)
  );

  displayProducts(filtered);
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

loadProducts();
