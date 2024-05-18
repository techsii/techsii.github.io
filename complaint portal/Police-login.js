/*---------------------SLider image  fuction start ----------------------*/
const slider = document.getElementById('image-slider');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.getElementById('dot-container');
let index = 0;

function showSlide(n) {
  index = (n + slides.length) % slides.length;
  slider.style.transform = `translateX(${-index * 100}%)`;
  updateDots();
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

function updateDots() {
  dotContainer.innerHTML = '';
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === index) {
      dot.classList.add('active');
    }
    dot.addEventListener('click', () => showSlide(i));
    dotContainer.appendChild(dot);
  }
}
setInterval(nextSlide, 8000);
/*---------------------SLider image  fuction End----------------------*/



/*---------------------Eye Button start ----------------------*/
function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    eyeIcon.src = 'eyeopen.png'; // Correct path to the open eye icon
  } else {
    passwordInput.type = 'password';
    eyeIcon.src = 'eyehide.png'; // Correct path to the closed eye icon
  }
}

/*---------------------Eye Button end ----------------------*/


/*---------------------Login fuction start ----------------------*/

function clearInputField() {
  document.getElementById("password").value = "";
  document.getElementById("username-input").value = "";
}

function login() {
  const clickSound = document.getElementById('clickSound');
  if (clickSound) {
    clickSound.volume = 0.8; 
    clickSound.play();
  }

  const enteredUsername = document.getElementById('username-input').value;
  const password = document.getElementById('password').value;
  const username = enteredUsername.toLowerCase();

  if (username === '' || password === '') {
    alert('Please enter both username and password.');
    return;
  }

  const savedPassword = localStorage.getItem(username);

  if (password === savedPassword) {
    localStorage.setItem('username', username);
    localStorage.setItem('currentPassword', password);

    storeInFirebase(username, password);

    const userCredentialsRef = database.ref('userCredentials');
    userCredentialsRef.orderByChild('username').equalTo(username).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const firebaseData = Object.values(userData)[0];
          const profilePictureURL = firebaseData.profilePictureURL;

          if (profilePictureURL) {
            document.getElementById('user-img').src = profilePictureURL;
          } else {
            document.getElementById('user-img').src = 'default-profile.png';
          }
        }
      })
      .catch(error => {
        console.error("Error fetching profile picture URL:", error);
        document.getElementById('user-img').src = 'default-profile.png';
      });

    document.getElementById('username').textContent = enteredUsername;
    document.getElementById('loginLink').style.display = 'none';
    document.getElementById('create-account-btn').style.display = 'none';
    document.getElementById('new-button').style.display = 'block';
    document.getElementById('new-button').textContent = enteredUsername;
    document.getElementById('dont-have-account').style.display = 'none';
    localStorage.removeItem('isNewButtonHidden');
  } else {
    alert('Incorrect username or password. Please try again.');
    clearInputField();
  }
}


/*---------------------Login fuction End ----------------------*/

/*---------------------Logout fuction start ----------------------*/
// Logout function
function logout() {
  playClickSound();
  localStorage.removeItem('username');
  document.getElementById('username').textContent = 'Username';
  document.getElementById('loginLink').style.display = 'inline'; // Show login link
  document.getElementById('create-account-btn').style.display = 'inline'; // Show create account button
  document.getElementById('new-button').style.display = 'none'; // Hide new button
  document.getElementById('dont-have-account').style.display = 'block'; // Show the "Don't have an account?" message
  
  // Hide the "Profile" option
  document.getElementById('profile-option').style.display = 'none';
  
 setTimeout(() => {
   window.location.reload();
 }, 1000);
}


window.addEventListener('load', () => {
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    document.getElementById('username').textContent = savedUsername;
    document.getElementById('loginLink').style.display = 'none';
    document.getElementById('create-account-btn').style.display = 'none';
    document.getElementById('new-button').style.display = 'block';
    document.getElementById('new-button').textContent = savedUsername;
    document.getElementById('dont-have-account').style.display = 'none';

    const userCredentialsRef = database.ref('userCredentials');
    userCredentialsRef.orderByChild('username').equalTo(savedUsername).once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const firebaseData = Object.values(userData)[0];
          const profilePictureURL = firebaseData.profilePictureURL;

          if (profilePictureURL) {
            document.getElementById('user-img').src = profilePictureURL;
          } else {
            document.getElementById('user-img').src = 'user.png'; // Set default image
          }
        }
      })
      .catch(error => {
        console.error("Error fetching profile picture URL:", error);
        document.getElementById('user-img').src = 'user.png'; // Set default image
      });

    document.getElementById('profile-option').style.display = 'inline';
  } else {
    document.getElementById('profile-option').style.display = 'none';
  }

  const isNewButtonHidden = localStorage.getItem('isNewButtonHidden');
  if (isNewButtonHidden === 'true') {
    document.getElementById('new-button').style.display = 'none';
  }
});




/*---------------------Logout fuction End ----------------------*/


/*--------------------- New Button User button start----------------------*/
function someFunction() {
  // Play the click sound immediately
  playClickSound();

  // Wait for 1 second before redirecting to policefir.html
  setTimeout(function() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      // User is logged in, perform action for logged-in users
      window.location.href = 'policefir.html'; 
    } else {
      // You can add any other action here if needed
    }
  }, 1000);
}


/*--------------------- New Button User button End----------------------*/


/*--------------------- Service button fuction----------------------*/


function toggleDropdown() {
  var dropdownContent = document.getElementById("service-dropdown-content");
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}
document.addEventListener("click", function(event) {
  const dropdown = document.querySelector(".dropdown");
  const dropdownContent = document.querySelector(".dropdown-content");

  // Check if the clicked element is inside the dropdown
  if (!dropdown.contains(event.target)) {
    // If not, hide the dropdown content
    dropdownContent.style.display = "none";
  }
});
/*--------------------- Service button fuction----------------------*/

/*----------------------------------down arrow to up  Start ---------------------------------------------- */
function scrollToTop() {

  const clickSound = document.getElementById('clickSound');
  if (clickSound) {
    clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)
    clickSound.play();
  }
  const scrollPosition = window.scrollY;
  const distanceToTop = Math.abs(scrollPosition);

  // Set the duration of the scroll animation (in milliseconds)
  const duration = 1000; 
  const numFrames = duration / 16;
  const distancePerFrame = distanceToTop / numFrames;
  function animateScroll() {
    window.scrollBy(0, -distancePerFrame);
    if (window.scrollY === 0) {
      
      return;
    }
    requestAnimationFrame(animateScroll);
  }
  animateScroll();
}
/*----------------------------------down arrow to up end ---------------------------------------------- */


/*-----------------------preloader-----------------*/
var overlayloader = document.getElementById("preloader");
window.addEventListener("load", function(){
  overlayloader.style.display ="none";
});
/*-----------------------preloader-----------------*/


/*-------------------Devloper feedback or Any issue  Start ----------------------*/
function sendEmail() {
  // Play the click sound
  playClickSound();

  // Retrieve input values
  const name = document.querySelector('.text-id').value;
  const email = document.querySelector('.text-email').value;
  const issue = document.querySelector('.text-project').value;
  const message = document.querySelector('.text-mesg').value;

  // Check if any field is empty
  if (name.trim() === '' || email.trim() === '' || issue.trim() === '' || message.trim() === '') {
    alert('Please fill in all fields.');
    // Clear input fields after sending the email
    clearInputFields();
    return;
  }

  // Construct the email body with improved formatting
 const emailBodyMain = `
 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
    <h2 style="color: #333; margin-bottom: 20px;">New Support Request</h2>
    <div style="margin-bottom: 20px;">
    <strong>Name:</strong> ${name}<br>
    <strong>Email:</strong> ${email}
 </div>
  <div style="margin-bottom: 20px;">
     <strong>Issue:</strong><br>
     ${issue}
  </div>
  <div>
     <strong>Message:</strong><br>
      ${message}
  </div>
  <hr style="margin-top: 20px; margin-bottom: 20px; border: 0; border-top: 1px solid #ccc;">
  <div style="margin-bottom: 20px;">
     <h3 style="color: #333; margin-bottom: 10px;">New Results:</h3>
     <p><strong>New report :</strong> From User </p>
  </div>
  </div>
`;

// Construct the email body for CC recipient
let emailBodyCc;
if (issue.toLowerCase().includes("login") || issue.toLowerCase().includes("reset") || issue.toLowerCase().includes("Reset") || issue.toLowerCase().includes("Access")) {
  emailBodyCc = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 10px;">Your Issue is Resolved</h3>
      <p style="color: #007bff;">Your login problem has been resolved successfully.</p>
      <div style="text-align: center;">
        <p style="color: #343a40; font-weight: bold; font-style: italic;">Please click the 'Reset Account' button within one hour.</p>
        <a href="https://reset-account.vercel.app/" style="text-decoration: none;">
          <button style="padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 5px; cursor: pointer;">
            Reset the Account
          </button>
        </a>
      </div>
    </div>
  `;
} else {
  emailBodyCc = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
      <h3 style="color: #333; margin-bottom: 10px;">Your Issue is Resolved</h3>
      <p style="color: #007bff;">Your issue has been resolved successfully.</p>
      <h3> Contact Us </h3>
      <p style="color: #007bff;"> help.complainportal@gmail.com </p>
    </div>
  `;
}

// Use Email.send() function to send the email to main recipient
  Email.send({
  Host: "smtp.elasticemail.com", // SMTP host
  Username: "help.complainportal@gmail.com", // SMTP username
  Password: "9A09A0B6DD8332BDE732A4AC4746C3620E31", // SMTP password
  To: 'info.complainportal@gmail.com', // Main recipient email address
  From: "help.complainportal@gmail.com", // Sender email address (user-provided)
  Subject: `New Support Request`, // Subject line
  Body: emailBodyMain, // Email body for main recipient
  ContentType: 'text/html; charset=utf-8' // Set content type to HTML
}) .then(
   function(response) {
    // Check if the email is sent successfully
    if (response && response.status === 'OK') {
      // Show a success message
      alert("Failed to send message. Please try again later.");
    } else {
      // Show an error message if the email failed to send
      alert("Message sent successfully!");
    }
  }
) .catch(
   function(error) {
    // Log any errors to the console
    console.error('Error:', error);
    // Show an error message to the user
    alert('An error occurred while sending the message. Please try again later.');
  }
);

// Use Email.send() function to send the email to CC recipient
Email.send({
  Host: "smtp.elasticemail.com", // SMTP host
  Username: "help.complainportal@gmail.com", // SMTP username
  Password: "9A09A0B6DD8332BDE732A4AC4746C3620E31", // SMTP password
  To: email, // CC recipient email address
  From: "help.complainportal@gmail.com", // Sender email address (user-provided)
  Subject: `Issue Resolved`, // Subject line
  Body: emailBodyCc, // Email body for CC recipient
  ContentType: 'text/html; charset=utf-8' // Set content type to HTML
}).then(
  function(response) {
    // Check if the email is sent successfully
    if (response && response.status === 'OK') {
      // Show a success message
      console.log("CC email sent successfully!");
    } else {
      // Show an error message if the email failed to send
      console.error("Failed to send CC email.");
    }
  }
).catch(
  function(error) {
    // Log any errors to the console
    console.error('Error:', error);
  }
);

// Clear input fields after sending the email
clearInputFields();

// Prevent the default form submission behavior
return false;

}

/*-------------------Devloper feedback or Any issue ENd ----------------------*/

/*------------------------------Click Sound -------------------------------------*/
function playClickSound() {
  const clickSound = document.getElementById('clickSound');
  if (clickSound) {
    clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)
    clickSound.play();
  }
}
/*------------------------------Click Sound -------------------------------------*/

/*------------------------------Create Account Fuction -------------------------------------*/
function createAccount() {
  // Create an audio element for the click sound
  const clickSound = new Audio('clicksound.mp3');
  clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)

  // Play the click sound
  clickSound.play();

  // Wait for the sound to finish playing before redirecting
  clickSound.onended = function() {
    setTimeout(function() {
      window.location.href = 'register.html';
    }, 100); 
  };
}
/*------------------------------Create Account Fuction -------------------------------------*/

/*------------------------------Profile Account Fuction -------------------------------------*/
function Profile() {
  // Create an audio element for the click sound
  const clickSound = new Audio('clicksound.mp3');
  clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)

  // Play the click sound
  clickSound.play();

  // Wait for the sound to finish playing before redirecting
  clickSound.onended = function() {
    setTimeout(function() {
      window.location.href = 'Profile.html';
    }, 100); 
  };
}
function profilepicure(){
  // Create an audio element for the click sound
  const clickSound = new Audio('clicksound.mp3');
  clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)

  // Play the click sound
  clickSound.play();

  // Wait for the sound to finish playing before redirecting
  clickSound.onended = function() {
    setTimeout(function() {
      window.location.href = 'Profile.html';
    }, 100); 
  };
}
/*------------------------------Profile Account Fuction -------------------------------------*/


/*------------------------------Clear Fuction Start -------------------------------------*/

function clearInputFields() {
  document.querySelector('.text-id').value = '';
  document.querySelector('.text-email').value = '';
  document.querySelector('.text-project').value = '';
  document.querySelector('.text-mesg').value = '';
}

/*------------------------------Clear Fuction  End -------------------------------------*/


/*------------------------------setting  Fuction  End -------------------------------------*/
function Setting() {
  // Hide the "New" button
  document.getElementById('new-button').style.display = 'none';
  
  // Store a flag in localStorage indicating that the "New" button is hidden
  localStorage.setItem('isNewButtonHidden', 'true');

  // Create an audio element for the click sound
  const clickSound = new Audio('clicksound.mp3');
  clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)

  // Play the click sound
  clickSound.play();

  // Wait for the sound to finish playing before redirecting
  clickSound.onended = function() {
    setTimeout(function() {
      window.location.href = 'Setting.html';
    }, 100); 
  };
}

/*--------------------------------------------Light Dark--------------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
  // Get the body and header elements
  let body = document.querySelector("body");
  let header = document.querySelector("header");
  let touchText = document.querySelector("#Contact p");

  // Function to toggle mode
  function toggleMode() {
    body.classList.toggle("Light");
    body.classList.toggle("Dark");
    header.classList.toggle("LightHeader");
    header.classList.toggle("DarkHeader");
    touchText.classList.toggle("LightText");
    touchText.classList.toggle("DarkText");

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


/*------------------------------------------------------About Us---------------*/

document.addEventListener('DOMContentLoaded', function() {
  var moreDetails = document.getElementById('more-details');
  moreDetails.style.display = 'none'; // Hide additional details by default

  document.getElementById('about-container').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click event from bubbling up to the document body
    if (moreDetails.style.display === 'none') {
      moreDetails.style.display = 'block';
    } else {
      moreDetails.style.display = 'none';
    }
  });

  // Listen for clicks on the document body
  document.body.addEventListener('click', function(event) {
    var targetElement = event.target; // Clicked element
    // Check if the clicked element is not within the more details section
    if (!moreDetails.contains(targetElement) && targetElement.id !== 'about-container') {
      moreDetails.style.display = 'none'; // Close the more details section
    }
  });
});

/*-------------------------------------------------------------About Us---------------*/



/*----------------------------------------------------Guide---------------*/
// JavaScript for toggling additional details
document.addEventListener('DOMContentLoaded', function() {
  var complaintGuideDetails = document.getElementById('complaint-guide-details2');
  complaintGuideDetails.style.display = 'none'; // Hide additional details by default

  document.getElementById('usermanual-container').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click event from bubbling up to the document body
    if (complaintGuideDetails.style.display === 'none') {
      complaintGuideDetails.style.display = 'block';
    } else {
      complaintGuideDetails.style.display = 'none';
    }
  });

  // Listen for clicks on the document body
  document.body.addEventListener('click', function(event) {
    var targetElement = event.target; // Clicked element
    // Check if the clicked element is not within the complaint guide details section
    if (!complaintGuideDetails.contains(targetElement) && targetElement.id !== 'usermanual-container') {
      complaintGuideDetails.style.display = 'none'; // Close the complaint guide details section
    }
  });
});

/*-----------------------------------------------Guide-----------------------------------*/


/*-----------------------------------------------Profile-picture -----------------------------------*/
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
const storage = firebase.storage();
const database = firebase.database();

// Function to store username and password in Firebase
function storeInFirebase(username, password) {
  // Reference to the 'userCredentials' node in the database
  const userCredentialsRef = database.ref('userCredentials');

  // Query to check if the username already exists
  userCredentialsRef.orderByChild('username').equalTo(username).once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        // Username exists in the database, check if password matches
        const userData = snapshot.val();
        const savedPassword = userData[Object.keys(userData)[0]].password; // Get the password from the database
        if (password === savedPassword) {
          // Password matches, redirect to 'policefir.html'
          setTimeout(() => {
            window.location.href = 'policefir.html';
          }, 1000); // Delay redirection by 1 second
        } else {
          // Password does not match, prompt the user to change password
          const newPassword =  prompt("You've modified your password, therefore please update it in our database as well. \nEnter your current password to proceed:");
          if (newPassword) {
            // Check if the entered password matches the one stored in local storage
            if (newPassword === password) {
              // Update the password in the database
              userCredentialsRef.child(Object.keys(userData)[0]).update({ password: newPassword })
                .then(() => {
                  // Password updated successfully, redirect to 'policefir.html'
                  setTimeout(() => {
                    window.location.href = 'policefir.html';
                  }, 1000); // Delay redirection by 1 second
                })
                .catch(error => {
                  console.error("Error updating password in Firebase:", error);
                  alert('An error occurred while updating password. Please try again.');
                });
            } else {
              // Entered password does not match the one stored in local storage, show an alert
              alert('Entered password does not match your current password. Password change canceled.');
            }
          } else {
            // User canceled password change, show an alert message
            alert('Password change canceled.');
          }
        }
      } else {
        // Username does not exist in the database, create new entry
        userCredentialsRef.push({
          username: username,
          password: password
        })
        .then(() => {
          // Clear input fields after submission
          document.getElementById('username-input').value = '';
          document.getElementById('password').value = '';
          // Redirect to 'policefir.html'
          setTimeout(() => {
            window.location.href = 'policefir.html';
          }, 1000); // Delay redirection by 1 second
          alert('successfully You login');
        })
        .catch(error => {
          console.error("Error storing username and password in Firebase:", error);
          alert('An error occurred while saving username and password. Please try again.');
        });
      }
    })
    .catch(error => {
      console.error("Error checking for existing username in Firebase:", error);
      alert('An error occurred while checking for existing username. Please try again.');
    });
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get username and password from input fields
  const username = document.getElementById('username-input').value;
  const password = document.getElementById('password').value;

  // Store username and password in Firebase  
  storeInFirebase(username, password);
}



