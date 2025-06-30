// ✅ Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXX",
  authDomain: "car-sale-contact.firebaseapp.com",
  databaseURL: "https://car-sale-contact-default-rtdb.firebaseio.com/",
  projectId: "car-sale-contact",
  storageBucket: "car-sale-contact.appspot.com",
  messagingSenderId: "XXXXXXXXX",
  appId: "1:XXXXXXXX:web:XXXXXXXX"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ✅ Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!firstName || !lastName || !mobile || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const contactRef = database.ref("contacts").push();
  contactRef
    .set({
      firstName,
      lastName,
      mobile,
      email,
      message,
      time: new Date().toISOString()
    })
    .then(() => {
      alert("✅ Your message has been sand!");
      document.getElementById("contactForm").reset();
    })
    .catch((error) => {
      console.error("❌ Error saving data:", error);
      alert("❌ Error saving your message. Please try again.");
    });
});
