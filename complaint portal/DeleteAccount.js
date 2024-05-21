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
const storage = firebase.storage();

function deleteUserAccount(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.toLowerCase().trim();
    const emailOrPhone = document.getElementById('emailOrPhone').value.toLowerCase().trim();
    const password = document.getElementById('password').value;

    if (username && emailOrPhone && password) {
        if (username !== emailOrPhone) {
            alert("Entered email/phone does not match the registered email/phone. Please try again.");
            return;
        }

        const userCredentialsRef = database.ref('userCredentials');

        userCredentialsRef.orderByChild('username').equalTo(username).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    const userKey = Object.keys(snapshot.val())[0];
                    const userData = snapshot.val()[userKey];
                    const savedPassword = userData.password;
                    const profilePictureURL = userData.profilePictureURL;

                    if (password === savedPassword) {
                        // Delete profile picture from storage
                        if (profilePictureURL) {
                            const profilePicRef = storage.refFromURL(profilePictureURL);
                            profilePicRef.delete().then(() => {
                                console.log("Profile picture deleted successfully.");
                            }).catch(error => {
                                console.error("Error deleting profile picture:", error);
                            });
                        }

                        // Delete user data from database
                        userCredentialsRef.child(userKey).remove()
                            .then(() => {
                                console.log("User data deleted successfully from database.");
                                
                                // Clear localStorage
                                localStorage.removeItem('username');
                                localStorage.removeItem('emailOrPhone');
                                localStorage.removeItem(username);
                                localStorage.removeItem(emailOrPhone);

                                // Wait for 1 second before redirecting
                                setTimeout(() => {
                                    window.location.href = "index.html";
                                }, 1000);
                            })
                            .catch(error => {
                                console.error("Error deleting user data from database:", error);
                            });

                        alert("Your account has been deleted successfully.");
                    } else {
                        alert("Password is incorrect. Please try again.");
                    }
                } else {
                    alert("User not found in the database.");
                }
            })
            .catch(error => {
                console.error("Error fetching user data from Firebase:", error);
            });
    } else {
        alert("Please fill in all fields.");
    }
}
