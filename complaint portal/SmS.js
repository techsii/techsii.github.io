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

const auth = firebase.auth();
let timer;
const OTP_EXPIRATION_TIME = 120000; // 2 minutes in milliseconds

function startTimer() {
    let timeLeft = OTP_EXPIRATION_TIME / 1000; // Convert milliseconds to seconds
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("otp-verification-container").style.display = "none";
            alert("OTP expired. Please resend OTP.");
            document.getElementById("phone-auth-container").style.display = "block";
        }
        document.getElementById("timer").innerText = `Time left: ${timeLeft} seconds`;
    }, 1000); // Update every second
}

function sendOTP() {
    var phoneNumber = document.getElementById('phone-number').value;
    if (!phoneNumber.match(/^\d{10}$/)) {
        alert("Please enter a valid 10-digit Indian phone number.");
        return;
    }
    if (!phoneNumber.startsWith('+91')) {
        phoneNumber = '+91' + phoneNumber;
    }

    const userCredentialsRef = firebase.database().ref('userCredentials');
    userCredentialsRef.orderByChild('username').equalTo(phoneNumber).once('value')
    .then(snapshot => {
        if (snapshot.exists()) {
            alert("Account with this phone number already exists!");
        } else {
            var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then(function (confirmationResult) {
                    window.confirmationResult = confirmationResult;
                    document.getElementById("phone-auth-container").style.display = "none";
                    document.getElementById("otp-verification-container").style.display = "block";
                    startTimer();
                }).catch(function (error) {
                    console.error("Error sending OTP: ", error);
                });
        }
    }).catch(error => {
        console.error("Error checking account existence: ", error);
    });
}


function verifyOTP() {
    var otp = document.getElementById('verification-code').value;
    clearInterval(timer);
    window.confirmationResult.confirm(otp)
        .then(function (result) {
            console.log("OTP Verified");
            alert("OTP Verified");
            document.getElementById("otp-verification-container").style.display = "none";
            document.getElementById("password-fields").style.display = "block";
        }).catch(function (error) {
            console.error("Error verifying OTP: ", error);
            alert("Error verifying OTP: " + error.message);
        });
}

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

function validatePassword(password) {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
}

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

    let phoneNumber = document.getElementById('phone-number').value;
    if (!phoneNumber.startsWith('+91')) {
        phoneNumber = '+91' + phoneNumber;
    }

    const userCredentialsRef = firebase.database().ref('userCredentials');
    
    userCredentialsRef.orderByChild('username').equalTo(phoneNumber).once('value')
    .then(snapshot => {
        if (snapshot.exists()) {
            alert("Account with this phone number already exists!");
        } else {
            // If not, create a new account
            userCredentialsRef.child(phoneNumber).set({
                username: phoneNumber,
                password: newPassword
            }).then(() => {
                alert("Account created successfully!");
                window.location.href = 'index.html';
            }).catch(error => {
                console.error("Error creating account: ", error);
            });
        }
    }).catch(error => {
        console.error("Error checking account existence: ", error);
    });
}