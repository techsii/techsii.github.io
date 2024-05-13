// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyD85I5rIPzsfZ7JX_LAachui0iwxzDy98s",
    authDomain: "online-complain-portal.firebaseapp.com",
    databaseURL: "https://online-complain-portal-default-rtdb.firebaseio.com",
    projectId: "online-complain-portal",
    storageBucket: "online-complain-portal.appspot.com",
    messagingSenderId: "1019541538165",
    appId: "1:1019541538165:web:9c8fd57d8149766a18ff3c",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Function to generate a random complaint status
// Function to generate a random complaint status
function generateRandomStatus() {
  var statuses = ['Pending', 'In Progress', 'Resolved', 'Closed'];
  
  // Shuffle the array
  for (var i = statuses.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [statuses[i], statuses[j]] = [statuses[j], statuses[i]];
  }
  
  // Return the first status
  return statuses[0];
}


// Function to track complaint status
function trackStatus(complaintId) {
    var complaintRef = database.ref('complaints/' + complaintId);
  
    complaintRef.once('value', function(snapshot) {
        var complaintData = snapshot.val();
      
        if (complaintData) {
            // Generate a random status
            var randomStatus = generateRandomStatus();
            
            // Display the randomly generated status with complainant details
            var statusMessage = "<h3>Complaint Status: " + randomStatus + "</h3>";
            statusMessage += "<p><strong>Complainant Name:</strong> " + complaintData.complainantName + "</p>";
            statusMessage += "<p><strong>Complainant Email:</strong> " + complaintData.complainantEmail + "</p>";
            statusMessage += "<p><strong>Complainant Phone:</strong> " + complaintData.complainantPhone + "</p>";
            
            document.getElementById('statusResult').innerHTML = statusMessage;
        } else {
            // If complaint data doesn't exist, display an error message
            document.getElementById('statusResult').textContent = "Complaint ID not found";
        }
    });
}

// Event listener for the track button
document.getElementById('trackBtn').addEventListener('click', function(event) {
    event.preventDefault();
    // Play click sound
    var clickSound = document.getElementById('clickSound');
    clickSound.play();
    var complaintId = document.getElementById('complaintId').value.trim();
     
    // Check if the input field is empty
    if (complaintId === "") {
      alert("Input field is empty. Please enter a Complaint ID.");
      return; // Stop further execution
  }
  
    trackStatus(complaintId);
});

document.addEventListener("DOMContentLoaded", function() {
  // Get the body and header elements
  let body = document.querySelector("body");
  let header = document.querySelector("header");

  // Function to toggle mode
  function toggleMode() {
    body.classList.toggle("Light");
    body.classList.toggle("Dark");
    header.classList.toggle("LightHeader");
    header.classList.toggle("DarkHeader");
    
    // Add or remove class for text color based on mode
    let statusResult = document.getElementById('statusResult');
    let clearButton = document.getElementById('clearButton'); // Get the clear button
    if (body.classList.contains("Dark")) {
      statusResult.classList.add("BlackText");
      clearButton.classList.add("BlackText"); // Add black text class to clear button
    } else {
      statusResult.classList.remove("BlackText");
      clearButton.classList.remove("BlackText"); // Remove black text class from clear button
    }

    // Store the current mode in local storage
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


// Function to clear complaint details
function clearComplaintDetails() {
    document.getElementById('complaintId').value = ""; // Clear the input field
    // Clear the displayed complaint details
    document.getElementById("statusResult").innerHTML = "";
}
