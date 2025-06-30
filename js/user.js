// ✅ Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "car-sale-contact.firebaseapp.com",
  databaseURL: "https://car-sale-contact-default-rtdb.firebaseio.com/",
  projectId: "car-sale-contact",
  storageBucket: "car-sale-contact.appspot.com",
  messagingSenderId: "XXXXXXXXXX",
  appId: "1:XXXXXXXX:web:XXXXXXXX"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.onload = function () {
  const tbody = document.getElementById("userTableBody");

  firebase.database().ref("users").once("value", snapshot => {
    if (!snapshot.exists()) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="5" class="text-center text-danger">No users found</td>`;
      tbody.appendChild(row);
      return;
    }

    snapshot.forEach(child => {
      const user = child.val();
      const key = child.key;

      // Format the date
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
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  });
};

// ✅ Delete user function
function deleteUser(key) {
  if (confirm("Are you sure you want to delete this user?")) {
    firebase.database().ref("users").child(key).remove()
      .then(() => {
        alert("User deleted!");
        location.reload();
      })
      .catch(err => {
        console.error(err);
        alert("Failed to delete user!");
      });
  }
}
