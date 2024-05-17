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

function uploadProfilePicture(event) {
    const file = event.target.files[0]; // Get the selected file
    const savedUsername = localStorage.getItem('username');
    
    if (file && savedUsername) {
        const storageRef = storage.ref();
        const userProfilePicRef = storageRef.child('profile_pictures/' + savedUsername + '/' + file.name);
        
        // Retrieve the URL of the current profile picture
        const userCredentialsRef = database.ref('userCredentials');
        userCredentialsRef.orderByChild('username').equalTo(savedUsername).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const firebaseData = Object.values(userData)[0];
                    const currentProfilePicURL = firebaseData.profilePictureURL;
                    
                    // If a previous profile picture exists, delete it
                    if (currentProfilePicURL) {
                        const previousPicRef = storage.refFromURL(currentProfilePicURL);
                        previousPicRef.delete().then(() => {
                            console.log("Previous profile picture deleted successfully.");
                        }).catch((error) => {
                            console.error("Error deleting previous profile picture:", error);
                        });
                    }

                    // Upload the new profile picture
                    userProfilePicRef.put(file).then((snapshot) => {
                        return snapshot.ref.getDownloadURL();
                    }).then((downloadURL) => {
                        document.getElementById('account-icon').src = downloadURL; // Set the src attribute of account icon to the selected image
                        return updateProfilePictureURL(savedUsername, downloadURL);
                    }).then(() => {
                        // Display success message
                        alert("Profile picture successfully updated!");
                    }).catch((error) => {
                        console.error("Error uploading profile picture:", error);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching user credentials from Firebase:', error);
            });
    }
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
