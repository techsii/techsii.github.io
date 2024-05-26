// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD85I5rIPzsfZ7JX_LAachui0iwxzDy98s",
    authDomain: "online-complain-portal.firebaseapp.com",
    databaseURL: "https://online-complain-portal-default-rtdb.firebaseio.com",
    projectId: "online-complain-portal",
    storageBucket: "online-complain-portal.appspot.com",
    messagingSenderId: "1019541538165",
    appId: "1:1019541538165:web:9c8fd57d8149766a18ff3c",
    measurementId: "G-3RC1F8674D"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the Firebase auth service
const auth = firebase.auth();

let timer; // Variable to hold the timer reference
const OTP_EXPIRATION_TIME = 120000; // 2 minutes in milliseconds

// Function to start the timer
function startTimer() {
let timeLeft = OTP_EXPIRATION_TIME / 1000; // Convert milliseconds to seconds
timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
        clearInterval(timer); // Clear the timer when it reaches 0
        document.getElementById("otp-verification-container").style.display = "none";
        alert("OTP expired. Please resend OTP.");
        // Show the phone number input and resend OTP button
        document.getElementById("phone-auth-container").style.display = "block";
    }
    document.getElementById("timer").innerText = `Time left: ${timeLeft} seconds`;
}, 1000); // Update every second
}

// Function to send OTP
function sendOTP() {
var phoneNumber = document.getElementById('phone-number').value;

// Check if the phone number already starts with "+91"
if (!phoneNumber.startsWith('+91')) {
    // If not, add "+91" prefix
    phoneNumber = '+91' + phoneNumber;
}

var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        document.getElementById("phone-auth-container").style.display = "none";
        document.getElementById("otp-verification-container").style.display = "block";
        startTimer(); // Start the timer when OTP is sent
    }).catch(function (error) {
        console.error("Error sending OTP: ", error);
    });
}

// Function to verify OTP
function verifyOTP() {
var otp = document.getElementById('verification-code').value;
clearInterval(timer); // Stop the timer when OTP is verified
window.confirmationResult.confirm(otp)
    .then(function (result) {
        console.log("OTP Verified");
        alert("OTP Verified");
        // OTP verified successfully, show the password fields
        document.getElementById("otp-verification-container").style.display = "none";
        document.getElementById("password-fields").style.display = "block";
    }).catch(function (error) {
        console.error("Error verifying OTP: ", error);
        alert("Error verifying OTP: " + error.message);
    });
}

// Function to toggle password visibility
function togglePasswordVisibility(inputId, eyeIconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(eyeIconId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = 'eyeopen.png'; // Change the eye icon to indicate password is visible
    } else {
        passwordInput.type = 'password';
        eyeIcon.src = 'eyehide.png'; // Change the eye icon to indicate password is hidden
    }
}

function toggleNewPasswordVisibility() {
    togglePasswordVisibility('new-password', 'toggle-new-password');
}

function toggleConfirmPasswordVisibility() {
    togglePasswordVisibility('confirm-password', 'toggle-confirm-password');
}

// Function to validate password
function validatePassword(password) {
    // Regular expressions to check for password requirements
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Check if the password meets the requirements
    if (!passwordRegex.test(password)) {
        // If not, return false
        return false;
    }
    return true;
}

// Function to create account
function createAccount() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (!validatePassword(newPassword)) {
        alert('Password must contain at least 8 characters, including one uppercase letter, one number, and one special character (!@#$%^&*)');
        return;
    }

    // Save to localStorage (for demonstration purposes)
    const newEmailOrPhone = document.getElementById('phone-number').value; // Assuming phone number is the identifier
    localStorage.setItem(newEmailOrPhone, newPassword);

    alert("Account created successfully!");

    // Redirect to index.html
    window.location.href = 'index.html';
}

