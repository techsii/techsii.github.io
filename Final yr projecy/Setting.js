// Function to retrieve the current password from local storage
function getCurrentPassword() {
  return localStorage.getItem('currentPassword');
}

// Function to check if the user is logged in
function isUserLoggedIn() {
  // Check if the user is logged in based on your application logic
  // For example, you might check if certain data is present in local storage to determine if the user is logged in
  return localStorage.getItem('username') !== null;
}

// Function to handle setting the password
function setPassword() {
  const newUsername = document.getElementById('new-username').value;
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Retrieve saved username and password from local storage
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem(savedUsername);

  // Retrieve the current password from local storage
  const currentStoredPassword = getCurrentPassword();

  // Validate current password
  if (currentPassword !== currentStoredPassword) {
    alert('Current password is incorrect.');
    return;
  }

  // Password validation rules
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  // Check if the password meets the validation criteria
  if (!passwordRegex.test(newPassword)) {
    alert('Password must contain at least 8 characters, including one uppercase letter, one number, and one special character (!@#$%^&*)');
    // Highlight the password field in red
    document.getElementById('new-password').style.color = 'red';
    return;
  }

  // Validate new password and confirm password match
  if (newPassword !== confirmPassword) {
    alert('New password and confirm password do not match.');
    return;
  }

  // Save new username and password to local storage
  localStorage.setItem('username', newUsername);
  localStorage.setItem(newUsername, newPassword);

  alert('Username and password changed successfully.');

  // Redirect to the Police-login.html page
  window.location.href = 'index.html';
}

// Add event listener to the change password form
document.getElementById('change-password-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  setPassword(); // Call the setPassword function when the form is submitted
});

// Function to play click sound
function playClickSound() {
  const clickSound = document.getElementById('clickSound');
  if (clickSound) {
    clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)
    clickSound.play();
  }
}

// Preloader
var overlayloader = document.getElementById("preloader");
window.addEventListener("load", function(){
  overlayloader.style.display ="none";
});

// Delete account button
function deleteAccount() {
  playClickSound();
  
  // Check if the user is logged in
  if (!isUserLoggedIn()) {
    alert("Please log in first before deleting your account.");
    return;
  }
  
  var deleteButton = document.getElementById("delete-account");
  var currentPasswordInput = document.getElementById("current-password-delete");
  var usernameInput = document.getElementById("username-delete");
  var phoneEmailInput = document.getElementById("phone-email-delete");
  var confirmDeleteButton = document.getElementById("confirm-delete-button");

  // Retrieve the current password from local storage
  var currentPassword = getCurrentPassword();

  // Set the value of the current password input field to the current password
  currentPasswordInput.value = currentPassword;

  // Hide the input fields initially
  currentPasswordInput.style.display = "none";
  usernameInput.style.display = "none";
  phoneEmailInput.style.display = "none";
  deleteButton.style.display = "none";

  // Show the delete container as a popup
  var deleteContainer = document.getElementById("delete-container");
  deleteContainer.style.display = "block";

  // When the delete container is shown, focus on the first input field
  usernameInput.focus();

  // Show the confirm delete button
  confirmDeleteButton.style.display = "block";
}

function confirmDelete() {
  playClickSound();
  var currentPasswordInput = document.getElementById("current-password-delete");
  var usernameInput = document.getElementById("username-delete");
  var phoneEmailInput = document.getElementById("phone-email-delete");
  var deleteButton = document.getElementById("delete-button");

  var currentPassword = currentPasswordInput.value;
  var enteredUsername = usernameInput.value.toLowerCase(); // Convert entered username to lowercase
  var emailOrPhone = phoneEmailInput.value;

  // Check if any of the input fields are empty
  if (currentPassword === '' || enteredUsername === '' || emailOrPhone === '') {
    // If any input fields are empty, show them and prompt the user to fill all fields
    currentPasswordInput.style.display = "block";
    usernameInput.style.display = "block";
    phoneEmailInput.style.display = "block";

    // Add additional styling to the input fields to highlight them
    currentPasswordInput.style.border = "2px solid red";
    usernameInput.style.border = "2px solid red";
    phoneEmailInput.style.border = "2px solid red";

    // Alert the user to fill in all required fields
    alert("Please fill in all the required fields.");
    return;
  }

  // Retrieve actual current password and username from local storage
  var actualCurrentPassword = localStorage.getItem('currentPassword');
  var actualUsername = localStorage.getItem('username');

  // Check if the entered password and username match the stored values
  if (currentPassword === actualCurrentPassword && enteredUsername === actualUsername) {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Remove user data from local storage
      localStorage.removeItem('username');
      localStorage.removeItem(actualUsername);
      localStorage.removeItem('currentPassword');

      // Iterate through local storage keys to find and delete email or phone number-associated data
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        // Check if the key looks like an email address or phone number
        if (key.includes('@') || /^\d+$/.test(key)) {
          // Check if the entered email/phone matches the key or vice versa
          if (emailOrPhone === key || key === localStorage.getItem(emailOrPhone)) {
            localStorage.removeItem(key);
          }
        }
      }

      // Alert success message
      alert("Account deleted successfully! Phone number or email removed from future use.");

      // Redirect to another page or perform any necessary actions
      // For demonstration, let's reload the current page
      window.location.href = "index.html";
    }
  } else {
    // Display an error message if the entered password or username is incorrect
    alert("Incorrect current password or username. Please try again.");
  }
}

function forgotpassword() {
  // Create an audio element for the click sound
  const clickSound = new Audio('clicksound.mp3');
  clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)

  // Play the click sound
  clickSound.play();

  // Wait for the sound to finish playing before redirecting
  clickSound.onended = function() {
    setTimeout(function() {
      window.location.href = 'forgot-password.html';
    }, 100); 
  };
}
/*--------------------------------------------Light Dark--------------------------------------------*/
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
