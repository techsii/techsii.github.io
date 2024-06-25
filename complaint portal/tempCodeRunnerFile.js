
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
     