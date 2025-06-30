document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // ✅ Save to Local Storage
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);

  alert("✅ Login Successful!\nEmail: " + email);

  // ✅ Example redirect (optional)
  // window.location.href = "dashboard.html";
});
// Show/Hide Password
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const toggleIcon = document.querySelector('.toggle-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    toggleIcon.textContent = '👁️';
  }
}

// ✅ Clear inputs after submit
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (email && password) {
    alert(`Logged in as: ${email}`);
    this.reset(); // Clear form inputs
  } else {
    alert('Please enter email and password.');
  }
});
