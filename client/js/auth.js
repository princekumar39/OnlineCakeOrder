// Register
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Register - name:", name);
    console.log("Register - email:", email);
    console.log("Register - password:", password);

    const res = await fetch("https://onlinecakeorder-4.onrender.com/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message || "Registered successfully");
  });
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
     // Debug: log values
     console.log("Login - email:", email);
     console.log("Login - password:", password);
     
    const res = await fetch("https://onlinecakeorder-4.onrender.com/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "products.html";
    } else {
      alert("Login failed");
    }
  });
}