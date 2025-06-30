document.getElementById("toggleSidebar").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("collapsed");
});
// Show/Hide Profile Box
function toggleProfileBox() {
  const box = document.getElementById("profileBox");
  box.style.display = (box.style.display === "block") ? "none" : "block";
}

// Load Admin Info
window.onload = function () {
  const name = localStorage.getItem("adminName") || "Admin";
  const email = localStorage.getItem("currentUser") || "admin@example.com";
  const firstLetter = name.charAt(0).toUpperCase();

  document.getElementById("adminName").textContent = name;
  document.getElementById("adminEmail").textContent = email;
  document.getElementById("profileInitial").textContent = firstLetter;

  // Dynamic colors for letters
  const colorMap = {
    A: "#3498db", B: "#2ecc71", C: "#f1c40f", D: "#e67e22", E: "#e74c3c",
    F: "#1abc9c", G: "#9b59b6", H: "#34495e", I: "#16a085", J: "#27ae60",
    K: "#2980b9", L: "#8e44ad", M: "#2c3e50", N: "#d35400", O: "#c0392b",
    P: "#7f8c8d", Q: "#bdc3c7", R: "#f39c12", S: "#00cec9", T: "#fd79a8",
    U: "#6c5ce7", V: "#00b894", W: "#d63031", X: "#e84393", Y: "#0984e3",
    Z: "#b71540"
  };

  const color = colorMap[firstLetter] || "#333";
  document.querySelector(".profile-badge").style.backgroundColor = color;
}

// Logout Function
function logout() {
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("adminName");
  window.location.href = "login.html";
}
localStorage.setItem("adminName", "Muhammad Faiq");
localStorage.setItem("currentUser", "faiq@example.com");
localStorage.setItem("adminLoggedIn", "true");
// Show user table
function showUserTable() {
  document.getElementById("userTableSection").style.display = "block";

  // Clear existing rows
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  // Firebase: read from database (assume node = "users")
  firebase.database().ref("users").once("value", snapshot => {
    snapshot.forEach(child => {
      const user = child.val();
      const key = child.key;
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.name || 'N/A'}</td>
        <td>${user.email || 'N/A'}</td>
        <td>${user.password || '********'}</td>
        <td>${user.date || new Date().toLocaleString()}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteUser('${key}')">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  });
}

// Delete user from Firebase
function deleteUser(key) {
  if (confirm("Are you sure you want to delete this user?")) {
    firebase.database().ref("users").child(key).remove()
      .then(() => {
        alert("User deleted successfully");
        showUserTable(); // refresh list
      })
      .catch(err => {
        console.error(err);
        alert("Error deleting user");
      });
  }
}
// ✅ Firebase Config (replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyDGumCzKxsCKOKXwzgwjtHWYzmxZt78y8I",
  authDomain: "car-sale-contact.firebaseapp.com",
  databaseURL: "https://car-sale-contact-default-rtdb.firebaseio.com",
  projectId: "car-sale-contact",
  storageBucket: "car-sale-contact.appspot.com",
  messagingSenderId: "252895320993",
  appId: "1:252895320993:web:xyz1234567890"
};


firebase.initializeApp(firebaseConfig);

window.onload = function () {
  const tbody = document.getElementById("userTableBody");

  firebase.database().ref("users").once("value", snapshot => {
    snapshot.forEach(child => {
      const user = child.val();
      const key = child.key;

      // ✅ Format date nicely from ISO
      const date = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
          })
        : 'N/A';

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name || 'N/A'}</td>
        <td>${user.email || 'N/A'}</td>
        <td>${user.password || '******'}</td>
        <td>${date}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteUser('${key}')">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  });
};

// ✅ Delete function
function deleteUser(key) {
  if (confirm("Are you sure you want to delete this user?")) {
    firebase.database().ref("users").child(key).remove()
      .then(() => {
        alert("User deleted!");
        location.reload();
      })
      .catch(err => alert("Error deleting user: " + err));
  }
}
// Replace with your Firebase config

// ✅ Replace with YOUR Firebase Config

firebase.initializeApp(firebaseConfig);

// ✅ Get Total User Count from Firebase
function getUserCount() {
  const userCountEl = document.getElementById("userCount");

  firebase.database().ref("users").once("value")
    .then(snapshot => {
      const total = snapshot.numChildren(); // 📊 Count how many users
      userCountEl.textContent = total;
    })
    .catch(error => {
      console.error("Failed to fetch user count:", error);
      userCountEl.textContent = "Error";
    });
}

// ✅ Call on Page Load
window.onload = () => {
  getUserCount();
};


 
    // ✅ Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // ✅ Fetch User Count
    function getUserCount() {
      const userCountEl = document.getElementById("userCount");

      firebase.database().ref("users").once("value")
        .then(snapshot => {
          const total = snapshot.numChildren(); // 👈 Counts all users
          console.log("📦 Total Users Found:", total);
          userCountEl.textContent = total;
        })
        .catch(error => {
          console.error("❌ Firebase Error:", error);
          userCountEl.textContent = "Error";
        });
    }
    // ✅ Run on page load
    window.onload = getUserCount;
 


  function getMessageCount() {
    const messageCountEl = document.getElementById("messageCount");

    firebase.database().ref("contacts").once("value")
      .then(snapshot => {
        const total = snapshot.numChildren(); // 📥 Count total messages
        console.log("📨 Total Messages Found:", total);
        messageCountEl.textContent = total;
      })
      .catch(error => {
        console.error("❌ Error fetching messages:", error);
        messageCountEl.textContent = "Error";
      });
  }

  // ✅ Run both on page load
  window.onload = () => {
    getUserCount();
    getMessageCount();
  };




    // ✅ Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    // ✅ Fetch card count
    firebase.database().ref("cards").once("value")
      .then(snapshot => {
        const data = snapshot.val();
        const count = data ? Object.keys(data).length : 0;
        document.getElementById("carCount").textContent = count;
        console.log("✅ Cards found:", count);
      })
      .catch(error => {
        console.error("🔥 Firebase Error:", error);
        document.getElementById("carCount").textContent = "Error";
      });
  

    
    document.addEventListener("DOMContentLoaded", function () {
      const sidebar = document.getElementById("sidebar");
      const toggleBtn = document.getElementById("toggleSidebar");
      const mainContent = document.querySelector(".main-content");

      toggleBtn.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          sidebar.classList.toggle("active");
        } else {
          sidebar.classList.toggle("collapsed");
          mainContent.classList.toggle("expanded");
        }
      });
    });

    function toggleProfileBox() {
      document.getElementById("profileBox").classList.toggle("show" );
    }

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
