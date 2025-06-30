function toggleWhatsappBox() {
  var box = document.getElementById("whatsappBox");
  box.style.display = (box.style.display === "none" || box.style.display === "") ? "block" : "none";
}

function sendMessage() {
  var message = document.getElementById("whatsappMessage").value;
  var phone = "923410219550"; // ✅ Your WhatsApp number
  var url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}
function sendContactMessage(event) {
  event.preventDefault();
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var mobile = document.getElementById("mobile").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var fullMessage = `Name: ${firstName} ${lastName}\nMobile: ${mobile}\nEmail: ${email}\nMessage: ${message}`;
  var phone = "923410219550"; // ✅ Your WhatsApp number
  var url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(fullMessage);

  window.open(url, "_blank");
}
// ✅ WhatsApp Floating Button Functions
function toggleWhatsappBox() {
  var box = document.getElementById("whatsappBox");
  box.style.display = (box.style.display === "none" || box.style.display === "") ? "block" : "none";
}

function sendMessage() {
  var message = document.getElementById("whatsappMessage").value;
  var phone = "923410219550"; // ✅ Your WhatsApp number
  var url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank");
}
function sendContactMessage(event) {
  event.preventDefault();

  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var mobile = document.getElementById("mobile").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // ✅ Save data to localStorage
  const contactData = {
    firstName,
    lastName,
    mobile,
    email,
    message,
    time: new Date().toISOString()
  };
  localStorage.setItem("lastContactData", JSON.stringify(contactData));

  alert("Your message has been saved locally!");

  // ✅ Optional: Clear the form after saving
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
  document.getElementById("captcha").value = "";
}

// ✅ Autofill form if data exists
window.onload = function () {
  const savedData = localStorage.getItem("lastContactData");
  if (savedData) {
    const data = JSON.parse(savedData);
    document.getElementById("firstName").value = data.firstName || "";
    document.getElementById("lastName").value = data.lastName || "";
    document.getElementById("mobile").value = data.mobile || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("message").value = data.message || "";
  }
};
const firebaseConfig = {
  apiKey: "AIzaSy.....",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "0123456789",
  appId: "1:0123456789:web:abcd1234efgh5678"
};

window.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logoutBtn");
  const registerBtn = document.getElementById("registerBtn");

  const user = localStorage.getItem("currentUser");

  if (user) {
    logoutBtn.classList.remove("d-none");
    registerBtn.classList.add("d-none");
  } else {
    logoutBtn.classList.add("d-none");
    registerBtn.classList.remove("d-none");
  }
});

function logout() {
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}


    if (location.pathname.includes("feature.html")) {
      const user = localStorage.getItem("currentUser");
      if (!user) {
        window.location.href = "login.html";
      }
    }
    sessionStorage.removeItem("accessByNav");
