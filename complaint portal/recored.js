// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD85I5rIPzsfZ7JX_LAachui0iwxzDy98s",
  authDomain: "online-complain-portal.firebaseapp.com",
  databaseURL: "https://online-complain-portal-default-rtdb.firebaseio.com",
  projectId: "online-complain-portal",
  storageBucket: "online-complain-portal.appspot.com",
  messagingSenderId: "1019541538165",
  appId: "1:1019541538165:web:9c8fd57d8149766a18ff3c",
};

firebase.initializeApp(firebaseConfig);

// Reference to your Firebase Realtime Database
const database = firebase.database();
/*--------------------------------------Compaint fetch the table ------------------------------*/
// Function to convert ISO string date to a more readable format
function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}

// Function to fetch complaint details and populate table
function fetchComplaintDetails() {
  const complaintId = document.getElementById('complaintIdInput').value;

  // Reference to the complaint in the database
  const complaintRef = database.ref('complaints/' + complaintId);

  complaintRef.once('value', function(snapshot) {
    const complaintData = snapshot.val();

    if (complaintData) {
      // If complaint details exist, populate table
      const complaintTableBody = document.querySelector('#complaintTableBody tbody');

      // Check if complaint ID already exists in the table
      const existingRow = document.querySelector(`#complaintTableBody tbody tr[data-complaint-id="${complaintId}"]`);
      if (existingRow) {
        // Update existing row with new data
        existingRow.innerHTML = `
          <td>${complaintData.complaintId}</td>
          <td>${complaintData.complainantName}</td>
          <td>${complaintData.complainantEmail}</td>
          <td>${complaintData.complainantPhone}</td>
          <td>${formatDate(complaintData.date)}</td> <!-- Display formatted date -->
          <td><button class="delete-button" data-complaint-id="${snapshot.key}">❌</button></td>
          <td><img src="copy.gif" class="copy-icon" data-complaint-id="${snapshot.key}"></td>
        `;
      } else {
        // Populate new row if complaint ID doesn't exist in the table
        const newRow = document.createElement('tr');
        newRow.dataset.complaintId = complaintId;
        newRow.innerHTML = `
          <td>${complaintData.complaintId}</td>
          <td>${complaintData.complainantName}</td>
          <td>${complaintData.complainantEmail}</td>
          <td>${complaintData.complainantPhone}</td>
          <td>${formatDate(complaintData.date)}</td> <!-- Display formatted date -->
          <td><button class="delete-button" data-complaint-id="${snapshot.key}">❌</button></td>
          <td><img src="copy.gif" class="copy-icon" data-complaint-id="${snapshot.key}"></td>
        `;
        complaintTableBody.appendChild(newRow);
      }

      // Sort the table rows based on date/time
      sortTableByDateTime(complaintTableBody);

      // Save table content in localStorage
      localStorage.setItem('complaintTableBody', complaintTableBody.innerHTML);
    } else {
      // If complaint details do not exist, display an error message
      alert("No details found for the provided complaint ID.");
    }
  });
}

// Function to sort table rows based on date/time
function sortTableByDateTime(tableBody) {
  const rows = Array.from(tableBody.children);
  rows.sort((a, b) => {
    const dateA = new Date(a.children[4].textContent); // Index 4 is the date/time column
    const dateB = new Date(b.children[4].textContent);
    return dateA - dateB;
  });
  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
}

// Function to listen for new complaint additions
function listenForNewComplaints() {
  database.ref('complaints').on('child_added', function(snapshot) {
    const newComplaintData = snapshot.val();
    const complaintTableBody = document.querySelector('#complaintTableBody tbody');

    // Create a new row for the newly added complaint
    const newRow = document.createElement('tr');
    newRow.dataset.complaintId = snapshot.key; // Assuming complaintId is the key in the database
    newRow.innerHTML = `
      <td>${newComplaintData.complaintId}</td>
      <td>${newComplaintData.complainantName}</td>
      <td>${newComplaintData.complainantEmail}</td>
      <td>${newComplaintData.complainantPhone}</td>
      <td>${formatDate(newComplaintData.date)}</td> <!-- Display formatted date -->
      <td><button class="delete-button" data-complaint-id="${snapshot.key}">❌</button></td>
      <td><img src="copy.gif" class="copy-icon" data-complaint-id="${snapshot.key}"></td>
    `;
    complaintTableBody.appendChild(newRow);

    // Sort the table rows based on date/time
    sortTableByDateTime(complaintTableBody);

    // Optionally, you can update localStorage here if needed
    // localStorage.setItem('complaintTableBody', complaintTableBody.innerHTML);
  });
}


// Call the function to start listening for new complaints
listenForNewComplaints();

// Add event listener to copy icon
document.addEventListener('click', function(event) {
  if (event.target && event.target.classList.contains('copy-icon')) {
    const complaintId = event.target.dataset.complaintId;
    copyComplaintId(complaintId);
  }
});

// Function to copy complaint ID to clipboard
function copyComplaintId(complaintId) {
  // Create a temporary input element
  const tempInput = document.createElement('input');
  tempInput.value = complaintId;
  document.body.appendChild(tempInput);
  
  // Select the text inside the input element
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); /* For mobile devices */

  // Copy the text to the clipboard
  document.execCommand('copy');

  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Provide feedback to the user
  alert('Complaint ID copied to clipboard: ' + complaintId);
}

/*-----------------------------------------------------Compaint fetch the paragrah------------------------------------------------*/
// Function to fetch total details for a complaint ID
function fetchComplaintDetails2() {
  const input = document.getElementById('complaintIdInput').value.trim();
  let queryField, queryValue;

  // Determine if the input is a complaint ID or a phone number
  if (/^\d{10}$/.test(input)) {
    queryField = 'complainantPhone';
    queryValue = input;
  } else {
    queryField = 'complaintId';
    queryValue = input;
  }

  // Reference to the complaints in the database
  const complaintRef = database.ref('complaints').orderByChild(queryField).equalTo(queryValue);

  complaintRef.once('value', function(snapshot) {
    const complaintData = snapshot.val();

    if (complaintData) {
      // If complaint details exist, display the details
      const complaintDetailsDiv = document.getElementById('complaintDetails');
      const complaintId = Object.keys(complaintData)[0]; // Get the complaint ID from the object keys
      const complaint = complaintData[complaintId];

      complaintDetailsDiv.innerHTML = `
        <p><strong>Complaint ID:</strong> ${complaint.complaintId}</p>
        <p><strong>Complainant Name:</strong> ${complaint.complainantName}</p>
        <p><strong>Complainant Email:</strong> ${complaint.complainantEmail}</p>
        <p><strong>Complainant Phone:</strong> ${complaint.complainantPhone}</p>
        <p><strong>State:</strong> ${complaint.state}</p>
        <p><strong>District:</strong> ${complaint.district}</p>
        <p><strong>Address:</strong> ${complaint.address}</p>
        <p><strong>Landmark:</strong> ${complaint.landmark || 'N/A'}</p>
        <p><strong>Pin Code:</strong> ${complaint.pinCode}</p>
        <p><strong>Incident Type:</strong> ${complaint.incidentType}</p>
        <p><strong>Summary:</strong> ${complaint.summary}</p>
        <p><strong>Incident Description:</strong> ${complaint.incidentDescription}</p>
      `;
    } else {
      // If no complaint details found, display an error message
      alert("No details found for the provided input.");
    }
  });
}

// Get reference to the input field
const inputField = document.getElementById('complaintIdInput');

// Add event listener for keypress event
inputField.addEventListener('keypress', function(event) {
  // Check if the key pressed is Enter (key code 13)
  if (event.keyCode === 13) {
    // Call fetchComplaintDetails2() function when Enter is pressed
    fetchComplaintDetails2();
  }
});


document.addEventListener('keydown', function(event) {
  // Check if the pressed key is the "Esc" key (key code 27)
  if (event.keyCode === 27) {
    // Trigger a click event on the "X" button
    document.getElementById('clearButton').click();
  }
});
function clearComplaintDetails() {
  // Clear the input field
  document.getElementById("complaintIdInput").value = "";

  // Clear the displayed complaint details
  document.getElementById("complaintDetails").innerHTML = "";

  // If the overlay is displayed, hide it
  document.getElementById("overlay").style.display = "none";

  // If a white screen class is added to the body, remove it
  document.body.classList.remove("white-screen");
}





// Function to load saved table content from localStorage
window.onload = function() {
  const savedTableContent = localStorage.getItem('complaintTableBody');
  if (savedTableContent) {
    const complaintTableBody = document.querySelector('#complaintTableBody tbody');
    complaintTableBody.innerHTML = savedTableContent;
  }
};

// Function to handle delete button click
function handleDeleteButtonClick(event) {
  // Prompt password for confirmation
  const password = prompt("Enter password to confirm deletion:");
  // Verify password
  if (password === "Neel@2002") {
    // If password is correct, proceed with deletion
    const complaintId = event.target.dataset.complaintId;
    deleteComplaint(complaintId);
  } else {
    // If password is incorrect, show error message
    alert("Incorrect password. Deletion canceled.");
  }
}

// Function to delete complaint record from database and table
function deleteComplaint(complaintId) {
  const complaintRef = database.ref('complaints/' + complaintId);
  complaintRef.remove()
    .then(() => {
      // Remove row from table
      const tableRow = document.querySelector(`#complaintTableBody tbody tr[data-complaint-id="${complaintId}"]`);
      if (tableRow) {
        tableRow.remove();
      }
      // Optionally, remove complaint data from localStorage if complaint is deleted
      localStorage.removeItem('complaintTableBody');
    })
    .catch(error => {
      console.error("Error removing complaint:", error);
      // Display error message if deletion fails
      alert("Error removing complaint. Please try again later.");
    });
}

// Add event listener to handle delete button clicks
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    handleDeleteButtonClick(event);
  }
});

// Add an event listener to the document for keydown events
document.addEventListener('keydown', function(event) {
  // Check if the pressed key is the Enter key (key code 13)
  if (event.key === "Enter") {
    // Trigger a click event on the "Submit" button
    document.getElementById('submitButton').click();
  }
});

// Function to check the entered password
function checkPassword() {
  var password = document.getElementById("passwordInput").value;

  // Replace "your_password_here" with your actual password
  if (password === "Neel@2002") {
    // If the password is correct, hide the overlay
    document.getElementById("overlay").style.display = "none";
    // Add a class to the body to display a white screen
    document.body.classList.add("white-screen");
  } else {
    // If the password is incorrect, display an error message
    alert("Incorrect password. Please try again.");
  }
}

/*--------------------------------------------Light Dark--------------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
  // Get the body, header, container, close button, h2, and table elements
  let body = document.querySelector("body");
  let header = document.querySelector("header");
  let container = document.querySelector(".container");
  let closeButton = document.querySelector("#clearButton");
  let h2Element = document.querySelector(".H2");
  let tableElement = document.querySelector(".complaint-table");

  // Function to toggle mode
  function toggleMode() {
      body.classList.toggle("Light");
      body.classList.toggle("Dark");
      header.classList.toggle("LightHeader");
      header.classList.toggle("DarkHeader");
      container.classList.toggle("LightContainer");
      h2Element.classList.toggle("TextBlack2");
      closeButton.classList.toggle("LightCloseButton");
      closeButton.classList.toggle("DarkCloseButton");
      container.classList.toggle("TextBlack");
      tableElement.classList.toggle("TextBlack"); // Toggle table text color

      let mode = body.classList.contains("Dark") ? "Dark" : "Light";
      localStorage.setItem("mode", mode);
  }

  // Function to set mode based on local storage
  function setModeFromLocalStorage() {
      let savedMode = localStorage.getItem("mode");
      if (savedMode === "Dark") {
          toggleMode();
      }
  }

  // Add event listener to the switch
  let switchInput = document.querySelector(".bTn");
  switchInput.addEventListener("change", function() {
      toggleMode();
  });

  // Set mode from local storage on page load
  setModeFromLocalStorage();

  // Check the switch based on the initial mode
  let savedMode = localStorage.getItem("mode");
  switchInput.checked = savedMode === "Dark";
});


/*-----------------------------eye open/ close -----------------------*/
function togglePasswordVisibility() {
  var passwordInput = document.getElementById("passwordInput");
  var togglePassword = document.getElementById("togglePassword");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.src = "eyeopen.png"; // Change to open eye image
  } else {
    passwordInput.type = "password";
    togglePassword.src = "eyehide.png"; // Change to closed eye image
  }
}

// Set initial state to hide password and show closed eye icon
document.addEventListener("DOMContentLoaded", function() {
  var passwordInput = document.getElementById("passwordInput");
  var togglePassword = document.getElementById("togglePassword");
  passwordInput.type = "password";
  togglePassword.src = "eyehide.png"; // Set to closed eye image
});



