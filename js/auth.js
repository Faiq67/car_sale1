// ✅ Firebase Config (Replace with your actual Firebase keys)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "car-sale-contact.firebaseapp.com",
  databaseURL: "https://car-sale-contact-default-rtdb.firebaseio.com/",
  projectId: "car-sale-contact",
  storageBucket: "car-sale-contact.appspot.com",
  messagingSenderId: "XXXXXXXXXX",
  appId: "1:XXXXXXXX:web:XXXXXXXX"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ✅ Password Show/Hide Toggle
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
}

// ✅ Register Handler → New user → Firebase + LocalStorage
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!name || !email || !password) return alert("Please fill in all fields.");

  // ✅ Save user to Firebase /users node
  const userRef = database.ref("users").push();
  userRef.set({
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  })
  .then(() => {
    // ✅ Save logged-in user to localStorage
    localStorage.setItem("currentUser", JSON.stringify({ name, email }));
    alert("✅ Registration successful! You are now logged in.");
    window.location.href = "index.html";
  })
  .catch(() => alert("❌ Registration failed. Please try again."));
});

// ✅ Login Handler → Check Firebase → Login or Alert for Register
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) return alert("Please fill in all fields.");

  // ✅ Check if email exists in Firebase /users
  database.ref("users").orderByChild("email").equalTo(email).once("value", (snapshot) => {
    if (snapshot.exists()) {
      let found = false;
      snapshot.forEach((child) => {
        const user = child.val();
        if (user.password === password) {
          // ✅ Save to localStorage
          localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
          alert("✅ Login successful!");
          window.location.href = "index.html";
          found = true;
        }
      });
      if (!found) alert("❌ Incorrect password. Please try again.");
    } else {
      alert("❗ No account found for this email. Please sign up first.");
    }
  });
});

function logout() {
  const shouldLogout = confirm("🚪 Are you sure you want to logout?");
  
  if (shouldLogout) {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  } else {
    // User pressed Cancel — do nothing
    console.log("❌ Logout cancelled");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const onHome = window.location.pathname.includes("index.html") || window.location.pathname === "/";

  if (user && onHome) {
    document.getElementById("loginBtn")?.classList.add("d-none");
    document.getElementById("registerBtn")?.classList.add("d-none");
    document.getElementById("logoutBtn")?.classList.remove("d-none");
  } else {
    document.getElementById("loginBtn")?.classList.remove("d-none");
    document.getElementById("registerBtn")?.classList.remove("d-none");
    document.getElementById("logoutBtn")?.classList.add("d-none");
  }
});


// ✅ Navbar buttons toggle → Runs on every page load
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    document.getElementById("loginBtn")?.classList.add("d-none");
    document.getElementById("registerBtn")?.classList.add("d-none");
    document.getElementById("logoutBtn")?.classList.remove("d-none");
  } else {
    document.getElementById("loginBtn")?.classList.remove("d-none");
    document.getElementById("registerBtn")?.classList.remove("d-none");
    document.getElementById("logoutBtn")?.classList.add("d-none");
  }
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const ADMIN_EMAIL = "faiqimran476@gmail.com";
  const ADMIN_PASS = "faiqimran";

  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    // Store login status
    localStorage.setItem("adminLoggedIn", "true");
    localStorage.setItem("currentUser", email);
     window.location.href = "dashboard.html";
    // Redirect to dashboard
   
  } 
});


