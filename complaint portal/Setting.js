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

function deleteAccount() {
  // Create an audio element for the click sound
  const clickSound = new Audio('clicksound.mp3');
  clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)

  // Play the click sound
  clickSound.play();

  // Wait for the sound to finish playing before redirecting
  clickSound.onended = function() {
    setTimeout(function() {
      window.location.href = 'DeleteAccount.html';
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
