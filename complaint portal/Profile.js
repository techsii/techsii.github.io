// Get the profile-details element
const profileDetails = document.getElementById('profile-details');
// Get the account icon image element
const accountIcon = document.getElementById('account-icon');

// Function to display user details
function displayUserDetails() {
    // Retrieve the username and password from local storage
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('currentPassword');

    // Check if both username and password exist
    if (username && password) {
        // Create paragraph elements to display the username and password
        const usernamePara = document.createElement('p');
        usernamePara.textContent = `Username: ${username}`;

        const passwordPara = document.createElement('p');
        passwordPara.textContent = `Password: ********`; // Placeholder text for password
        passwordPara.classList.add('password'); // Add a class for the password paragraph

        // Append the username and password paragraphs to the profile-details element
        profileDetails.appendChild(usernamePara);
        profileDetails.appendChild(passwordPara);

        // Add click event listener to the password paragraph
        passwordPara.addEventListener('click', revealPassword);

        // Check if there's a profile picture stored in localStorage for the current user
        const profilePictureData = localStorage.getItem(`${username}_${password}_profilePicture`);
        if (profilePictureData) {
            // Parse the profile picture data
            const profilePicture = JSON.parse(profilePictureData).profilePicture;

            // Set the profile picture as the source of the account icon image element
            accountIcon.src = profilePicture;
            accountIcon.classList.add('profile-picture'); // Add a class for styling
        }
    } else {
        // If username or password doesn't exist in local storage, display a message
        profileDetails.textContent = 'User details not found.';
    }
}



// Function to reveal the password
function revealPassword() {
    // Prompt the user to enter the current password
    const currentPassword = prompt('Enter your current password:');
    const savedPassword = localStorage.getItem('currentPassword');

    // Check if the entered password matches the saved password
    if (currentPassword === savedPassword) {
        // Get the password paragraph and update its text content to display the actual password
        const passwordPara = document.querySelector('.password');
        passwordPara.textContent = `Password: ${savedPassword}`;
    } else {
        // If the entered password is incorrect, display an alert
        alert('Incorrect password. Please try again.');
    }
}

    // Function to upload profile picture
function uploadProfilePicture() {
    // Trigger click event on hidden file input
    const profilePictureInput = document.getElementById('profile-picture-input');
    profilePictureInput.click();

    // Listen for changes in the file input
    profilePictureInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            // Read the uploaded file as data URL
            const reader = new FileReader();
            reader.onload = function(event) {
                // Retrieve username and password from localStorage
                const username = localStorage.getItem('username');
                const password = localStorage.getItem('currentPassword');
                
                // Delete old profile picture data if it exists
                localStorage.removeItem(`${username}_${password}_profilePicture`);

                // Save the new profile picture link to local storage
                const profilePictureData = {
                    username: username,
                    password: password,
                    profilePicture: event.target.result
                };
                localStorage.setItem(`${username}_${password}_profilePicture`, JSON.stringify(profilePictureData));

                // Update the profile picture display
                const profilePicture = document.createElement('img');
                profilePicture.src = event.target.result;
                profilePicture.width = 100; // Set width as needed
                profilePicture.height = 100; // Set height as needed
                profilePicture.classList.add('profile-picture'); // Add a class for styling

                // Get the parent node of the account icon
                const accountIconParent = accountIcon.parentNode;

                // Replace the account icon with the uploaded profile picture
                if (accountIconParent) {
                    accountIconParent.replaceChild(profilePicture, accountIcon);
                }

                // Show the edit icon if needed
                const editIcon = document.getElementById('edit-icon');
                if (editIcon) {
                    editIcon.style.display = 'inline-block';
                }
            };
            reader.readAsDataURL(file);
        }
    });
}



// Call the function to display user details when the page loads
window.addEventListener('load', displayUserDetails);