// 🔐 Navbar "Feature" button click handler
const featureLink = document.getElementById("feature-link");
if (featureLink) {
  featureLink.addEventListener("click", function (e) {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      // ✅ User logged in → Go to feature.html
      window.location.href = "feature.html";
    } else {
      // ❌ Not logged in → Send to login
      alert("Please log in to access the Feature page.");
      window.location.href = "login.html";
    }
  });
}
