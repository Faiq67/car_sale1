
  window.addEventListener("DOMContentLoaded", () => {
    const userData = localStorage.getItem("currentUser");

    if (!userData) {
      // ❌ User is not logged in
      window.location.href = "login.html";
    } else {
      // ✅ User is logged in
      const user = JSON.parse(userData);
      alert(`✅ Welcome ${user.name}! You have accessed the feature page.`);
      console.log("✅ Access granted for:", user.email || user.name);

      // ✅ Show user's name in navbar
      const nameElement = document.getElementById("userNameDisplay");
      const userNameItem = document.getElementById("userNameItem");
      if (nameElement && userNameItem) {
        nameElement.textContent = `👤 ${user.name}`;
        userNameItem.classList.remove("d-none");
      }

      // ✅ Show logout button, hide register
      document.getElementById("logoutBtn")?.classList.remove("d-none");
      document.getElementById("registerBtn")?.classList.add("d-none");
    }
  });

  // ✅ Logout function
function logout() {
  const confirmLogout = confirm("🚪 Are you sure you want to logout?");
  
  if (confirmLogout) {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  } else {
    console.log("❌ Logout cancelled");
  }
}
  // ✅ Reusable page navigation function
  function goToPage(page) {
    window.location.href = page;
  }
  function goToPage(page) {
    // ✅ Feature page requires login
    if (page === "feature.html") {
      const user = localStorage.getItem("currentUser");
      if (!user) {
        window.location.href = "login.html";
        return;
      }
    }

    // ✅ Set flag to confirm this came via navbar
    sessionStorage.setItem("accessByNav", "true");
    window.location.href = page;
  }

    const firebaseConfig = {
      apiKey: "AIzaSyDGumCzKxsCKOKXwzgwjtHWYzmxZt78y8I",
      authDomain: "car-sale-contact.firebaseapp.com",
      databaseURL: "https://car-sale-contact-default-rtdb.firebaseio.com",
      projectId: "car-sale-contact",
      storageBucket: "car-sale-contact.appspot.com",
      messagingSenderId: "252895320993",
      appId: "1:252895320993:web:abc123"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    function loadCards() {
      const container = document.getElementById("cardContainer");
      db.ref("cards").once("value", snapshot => {
        container.innerHTML = "";
        snapshot.forEach(child => {
          const card = child.val();
          const cardHTML = `
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <img src="${card.image}" class="card-img-top" alt="${card.title}">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${card.title}</h5>
                  <p class="card-text">${card.text}</p>
                  <a href="#" class="btn btn-details mt-auto">Read More</a>
                </div>
              </div>
            </div>
          `;
          container.insertAdjacentHTML("beforeend", cardHTML);
        });
      });
    }

    function goToPage(page) {
      sessionStorage.setItem("accessByNav", "true");
      window.location.href = page;
    }

    window.onload = loadCards;
 