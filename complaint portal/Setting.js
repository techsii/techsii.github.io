// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAOHKfARpobVRd7QLY1BcQMyXjMg6eSDMI",
  authDomain: "profile-database-fa673.firebaseapp.com",
  databaseURL: "https://profile-database-fa673-default-rtdb.firebaseio.com",
  projectId: "profile-database-fa673",
  storageBucket: "profile-database-fa673.appspot.com",
  messagingSenderId: "349540949644",
  appId: "1:349540949644:web:7b99ddd5acac93588265a9",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to handle form submission
document.getElementById('change-password-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  const newUsername = document.getElementById('new-username').value;
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (newPassword !== confirmPassword) {
    alert("New password and confirm password do not match.");
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

  changePassword(newUsername, currentPassword, newPassword);
});

// Function to change password
function changePassword(username, currentPassword, newPassword) {
  const userCredentialsRef = database.ref('userCredentials');

  userCredentialsRef.orderByChild('username').equalTo(username).once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0];
        const savedPassword = userData[userId].password;

        if (currentPassword === savedPassword) {
          // Update password in database
          userCredentialsRef.child(userId).update({ password: newPassword })
            .then(() => {
              alert('Password updated successfully.');
              // Wait for 1 second before redirecting
              setTimeout(() => {
                window.location.href = 'index.html';
              }, 1000);
            })
            .catch(error => {
              console.error("Error updating password in Firebase:", error);
              alert('An error occurred while updating password. Please try again.');
            });
        } else {
          alert('Current password is incorrect.');
        }
      } else {
        alert('Username does not exist.');
      }
    })
    .catch(error => {
      console.error("Error changing password:", error);
      alert('An error occurred. Please try again.');
    });
}


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
