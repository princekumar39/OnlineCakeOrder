let allProducts = [];

// Function to load products from the API
async function loadProducts() {
  const token = localStorage.getItem("token");
  const res = await fetch("https://onlinecakeorder-4.onrender.com/api/products", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.ok) {
    allProducts = await res.json();
    displayProducts(allProducts);
  } else {
    alert("Failed to load products. Please try again later.");
  }
}

// Function to display the products dynamically
function displayProducts(products) {
  const container = document.getElementById("productList");
  container.innerHTML = ""; // Clear previous content

  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("cake-card");  // Add a class for styling

    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="cake-image"/>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    `;

    container.appendChild(div);
  });
}

// Function to apply filters (search, min price, max price)
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

// Function to add product to the cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// Call loadProducts to initially load products when page is loaded
loadProducts();
