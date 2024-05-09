// Show the "Forgot Password" section initially
document.getElementById('forgot-password-section').style.display = 'block';
document.getElementById('email-or-username-forgot').style.display = 'block';

/*---------------------------Forgot function start --------------------------*/  
// Function to handle sending OTP email
function sendOTPEmail(email, otp) {
    const emailContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #007bff; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #007bff; margin-bottom: 20px;">Reset OTP Verification</h2>
    <p style="color: #333; font-size: 16px;">Your OTP is: <strong>${otp}</strong></p>
</div>
`;

    // SMTP server settings
    const smtpConfig = {
        SecureToken: "0a37ead9-1e6d-46da-aea3-d540b17b0005",
        To: email,
        From: "info.complainportal@gmail.com",
        Subject: "Your OTP",
        Body: emailContent,
        ContentType: 'text/html; charset=utf-8' // Set content type to HTML
    };

    // Send email
    Email.send(smtpConfig)
        .then(() => {
            alert("OTP sent successfully to your email.");
        })
        .catch(error => {
            console.error("Error sending email:", error);
            alert("Error sending OTP email. Please try again.");
        })
        .finally(() => {
            // Re-enable the send OTP button after email is sent
            document.getElementById('send-otp-btn').disabled = false;
        });
}

// Function to generate OTP (for simulation purpose)
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Password validation rules
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// Function to handle sending OTP
document.getElementById('send-otp-btn').addEventListener('click', function() {
    playClickSound();
    const emailOrUsername = document.getElementById('email-or-username-forgot').value.trim(); // Trim removes leading and trailing spaces

    // Check if emailOrUsername is empty
    if (emailOrUsername === '') {
        alert('Please enter your email.');
        return; // Exit function if email is empty
    }

    // Check if the entered value contains '@' and ends with '@gmail.com'
    if (!/@gmail\.com$/.test(emailOrUsername)) {
        alert('Please enter a valid Gmail address.');
        return; // Exit function if email is not valid
    }

    // Disable the send OTP button to prevent multiple submissions
    this.disabled = true;

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to sessionStorage
    sessionStorage.setItem('otp', otp);

    // Send OTP via email using SMTP.js
    sendOTPEmail(emailOrUsername, otp);

    // Show OTP input field and verify button
    document.getElementById('otp').style.display = 'block';
    document.getElementById('verify-otp-btn').style.display = 'block';

    // Hide send OTP button
    this.style.display = 'none';
});

// Function to verify OTP
document.getElementById('verify-otp-btn').addEventListener('click', function() {
    playClickSound();
    const enteredOTP = document.getElementById('otp').value;
    const storedOTP = sessionStorage.getItem('otp');

    if (enteredOTP === storedOTP) {
        // OTP verification successful
        alert('OTP verified successfully. You can now set a new password.');

        // Show new password fields and submit button
        document.getElementById('new-password-fogot').style.display = 'block';
        document.getElementById('confirm-password-forgot').style.display = 'block';
        document.getElementById('Submit').style.display = 'block';

        // Hide OTP input field and verify button
        document.getElementById('otp').style.display = 'none';
        this.style.display = 'none'; // Hide verify button
    } else {
        // OTP verification failed
        alert('Invalid OTP. Please try again.');
    }
});

// Function to handle the "Submit" button click for password reset
document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    playClickSound();
   
    event.preventDefault();

    // Retrieve input values
    const newUsername = document.getElementById('new-username-forgot').value; // Get new username
    const newPassword = document.getElementById('new-password-fogot').value;
    const confirmPassword = document.getElementById('confirm-password-forgot').value;

    // Validate new password
    if (!passwordRegex.test(newPassword)) {
        alert('Password must contain at least 8 characters, including one uppercase letter, one number, and one special character (!@#$%^&*)');
        // Highlight the password field in red
        document.getElementById('new-password').style.color = 'red';
        return;
    }

    // Check if passwords match
    if (newPassword === confirmPassword) {
        // Save new username and password to localStorage
        localStorage.setItem(newUsername, newPassword); // Save new username with new password

        alert('Password reset successfully.');

        // Redirect to login page
        window.location.href = 'index.html';
    } else {
        alert('New password and confirm password do not match.');
    }
});


/*------------------------------Click Sound -------------------------------------*/
function playClickSound() {
    const clickSound = document.getElementById('clickSound');
    if (clickSound) {
        clickSound.volume = 0.8; // Adjust volume (0.0 to 1.0)
        clickSound.play();
    }
}
/*------------------------------Click Sound -------------------------------------*/
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
  