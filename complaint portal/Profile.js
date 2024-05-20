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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

document.addEventListener('DOMContentLoaded', function() {
    // Fetch current login details from local storage
    const savedUsername = localStorage.getItem('username');

    // Fetch current login details from Firebase database
    if (savedUsername) {
        const userCredentialsRef = database.ref('userCredentials');
        userCredentialsRef.orderByChild('username').equalTo(savedUsername).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const firebaseData = Object.values(userData)[0];
                    const firebasePassword = firebaseData.password;
                    document.getElementById('username-firebase').textContent = savedUsername;
                    document.getElementById('password-firebase').textContent = '*'.repeat(firebasePassword.length);
                    
                    // Load profile picture if exists
                    if (firebaseData.profilePictureURL) {
                        document.getElementById('account-icon').src = firebaseData.profilePictureURL;
                    }

                    // Add click event listener to reveal password
                    document.getElementById('password-firebase').addEventListener('click', function() {
                        // Prompt user for current password
                        const enteredPassword = prompt("Enter your current password to reveal:");
                        // Check if entered password matches the actual password
                        if (enteredPassword === firebasePassword) {
                            // Reveal the actual password
                            document.getElementById('password-firebase').textContent = firebasePassword;
                        } else {
                            alert("Incorrect password. Please try again.");
                        }
                    });

                    // Show image preview container and save button when the edit button is clicked
                    document.getElementById('edit-icon').addEventListener('click', function() {
                        document.getElementById('image-preview-container').style.display = 'block';
                        document.getElementById('save-btn').style.display = 'block';
                    });
                } else {
                    document.getElementById('username-firebase').textContent = 'Not found';
                    document.getElementById('password-firebase').textContent = 'Not found';
                }
            })
            .catch(error => {
                console.error('Error fetching user credentials from Firebase:', error);
            });
    } else {
        // If not logged in, display appropriate message
        document.getElementById('username-firebase').textContent = 'Not logged in';
        document.getElementById('password-firebase').textContent = 'Not logged in';
    }
});

// Define a global variable for the Cropper instance
let cropper;

function uploadProfilePicture(event) {
    const file = event.target.files[0]; // Get the selected file
    const savedUsername = localStorage.getItem('username');
    
    if (file && savedUsername) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Create an image element
            const img = document.createElement('img');
            img.src = e.target.result;

            // Append the image to the preview container
            const container = document.getElementById('image-preview-container');
            container.innerHTML = '';
            container.appendChild(img);

            // Initialize Cropper on the image
            cropper = new Cropper(img, {
                aspectRatio: 1, // Set aspect ratio as needed
                viewMode: 1, // Set view mode as needed
                // Add any other Cropper options as needed
            });
        };
        reader.readAsDataURL(file);
    }
}

// Handle 'Save' button click to set the cropped image as profile picture
document.getElementById('save-btn').addEventListener('click', function () {
    const savedUsername = localStorage.getItem('username');
    const file = document.getElementById('profile-picture-input').files[0]; // Get the selected file again

    if (cropper && file && savedUsername) {
        const canvas = cropper.getCroppedCanvas();
        if (canvas) {
            canvas.toBlob(function (blob) {
                // Upload the cropped image to Firebase
                const userProfilePicRef = storage.ref().child('profile_pictures/' + savedUsername + '/' + file.name);
                userProfilePicRef.put(blob).then((snapshot) => {
                    return snapshot.ref.getDownloadURL();
                }).then((downloadURL) => {
                    // Update profile picture URL in the database
                    return updateProfilePictureURL(savedUsername, downloadURL);
                }).then(() => {
                    // Delete the old profile picture from storage
                    deleteOldProfilePicture(savedUsername);
                    // Display success message
                    alert("Your Profile picture successfully uploaded and set!");
                    // Reload the window after clicking OK on the alert
                    window.location.reload();
                }).catch((error) => {
                    console.error("Error uploading profile picture:", error);
                });
            });
        }
    }
});

function deleteOldProfilePicture(username) {
    const userCredentialsRef = database.ref('userCredentials');
    userCredentialsRef.orderByChild('username').equalTo(username).once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                const userKey = Object.keys(snapshot.val())[0];
                const userData = snapshot.val()[userKey];
                const oldProfilePicURL = userData.profilePictureURL;
                if (oldProfilePicURL) {
                    // Get reference to the old profile picture in storage
                    const oldProfilePicRef = storage.refFromURL(oldProfilePicURL);
                    // Delete the old profile picture
                    oldProfilePicRef.delete().then(() => {
                        console.log("Old profile picture deleted successfully.");
                        // Update profile picture URL in the database to null
                        userCredentialsRef.child(userKey).update({ profilePictureURL: null });
                    }).catch((error) => {
                        console.error("Error deleting old profile picture:", error);
                    });
                } else {
                    console.log("No old profile picture found.");
                }
            } else {
                console.log("User not found in database.");
            }
        })
        .catch(error => {
            console.error('Error fetching user credentials from Firebase:', error);
        });
}

function updateProfilePictureURL(username, url) {
    const userCredentialsRef = database.ref('userCredentials');
    userCredentialsRef.orderByChild('username').equalTo(username).once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                const userKey = Object.keys(snapshot.val())[0];
                userCredentialsRef.child(userKey).update({
                    profilePictureURL: url
                }).then(() => {
                    console.log("Profile picture URL updated successfully.");
                }).catch((error) => {
                    console.error("Error updating profile picture URL:", error);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching user credentials from Firebase:', error);
        });
}


/*-----------------------preloader-----------------*/
var overlayloader = document.getElementById("preloader");
window.addEventListener("load", function(){
  overlayloader.style.display ="none";
});
/*-----------------------preloader-----------------*/
/*--------------------------------------------Light Dark--------------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
    // Get the body and header elements
    let body = document.querySelector("body");
    let header = document.querySelector("header");
    let head = document.querySelector("header");
  
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