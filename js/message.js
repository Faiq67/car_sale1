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
firebase.initializeApp(firebaseConfig);

window.onload = function () {
  const tbody = document.getElementById("messageTableBody");

  firebase.database().ref("contacts").once("value", snapshot => {
    if (!snapshot.exists()) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="6" class="text-center text-danger">No messages found</td>`;
      tbody.appendChild(row);
      return;
    }

    snapshot.forEach(child => {
      const msg = child.val();
      const key = child.key;

      const fullName = `${msg.firstName || ''} ${msg.lastName || ''}`.trim();

      const date = msg.time
        ? new Date(msg.time).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
          })
        : 'N/A';

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${fullName}</td>
        <td>${msg.email || 'N/A'}</td>
        <td>${msg.mobile || 'N/A'}</td>
        <td>${msg.message || 'N/A'}</td>
        <td>${date}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteMessage('${key}')">
            🗑
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  });
};

function deleteMessage(key) {
  if (confirm("Delete this message?")) {
    firebase.database().ref("contacts").child(key).remove()
      .then(() => {
       
        location.reload();
      })
      .catch(err => {
        console.error(err);
        alert("Failed to delete message.");
      });
  }
}
