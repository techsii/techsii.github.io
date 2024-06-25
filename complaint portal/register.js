/*--------------------------------------Global Variables--------------------------------------*/
let timerInterval; // Declare timerInterval in the global scope
let session_id; // Declare session_id variable in the global scope

/*--------------------------------------Slider Function--------------------------------------*/
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

/*--------------------------------------Email OTP Functions--------------------------------------*/
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
function sendOTPEmail() {
    document.getElementById("send-otp-btn").disabled = true;
    const newEmailOrPhone = document.getElementById('phone-email').value;

    // Check if the email/phone already exists in the Firebase database
    database.ref('userCredentials').orderByChild('username').equalTo(newEmailOrPhone)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                // Username (email/phone) already exists
                alert('Email/phone already exists. Please use a different one.');
                document.getElementById("send-otp-btn").disabled = false;
            } else {
                // Username doesn't exist, proceed with sending OTP
                var seconds = 120;
                timerInterval = setInterval(function () {
                    seconds--;
                    var minutes = Math.floor(seconds / 60);
                    var remainingSeconds = seconds % 60;
                    if (remainingSeconds < 10) {
                        remainingSeconds = "0" + remainingSeconds;
                    }
                    document.getElementById("timer").innerHTML = minutes + ":" + remainingSeconds;
                    if (seconds <= 0) {
                        clearInterval(timerInterval);
                        document.getElementById("send-otp-btn").disabled = false;
                        document.getElementById("timer").innerHTML = "";
                        sessionStorage.removeItem('otp');
                    }
                }, 1000);

                const otp = Math.floor(100000 + Math.random() * 900000);
                console.log("Generated OTP:", otp);

                let emailBody = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #007bff; border-radius: 10px; background-color: #f9f9f9;">
                        <h2 style="color: #007bff; margin-bottom: 20px;">OTP Verification</h2>
                        <p style="color: #333; font-size: 16px;">Your OTP is: <strong>${otp}</strong></p>
                    </div>
                `;

                Email.send({
                    SecureToken: "84b376b9-c826-434f-a560-e92c65aa608d",
                    To: newEmailOrPhone,
                    From: "neelbhattacharjee09@gmail.com",
                    Subject: "OTP Verification",
                    Body: emailBody,
                    ContentType: 'text/html; charset=utf-8' // Set content type to HTML
                }).then(
                    message => {
                        if (message === 'OK') {
                            alert("OTP sent successfully. Check your email.");
                            sessionStorage.setItem('otp', otp);
                        } else {
                            alert("Error sending OTP. Please try again later.");
                            clearInterval(timerInterval);
                            document.getElementById("timer").innerHTML = "";
                            document.getElementById("send-otp-btn").disabled = false;
                        }
                    }
                );
            }
        })
        .catch((error) => {
            console.error('Error checking username existence:', error);
            alert('An error occurred. Please try again later.');
            document.getElementById("send-otp-btn").disabled = false;
        });
}


function verifyOTPEmail() {
    playClickSound();
    const enteredOTP = document.getElementById('otp').value;
    const storedOTP = sessionStorage.getItem('otp');

    if (enteredOTP === storedOTP) {
        alert("OTP verified successfully. You can now create your account.");
        togglePasswordFieldsVisibility();

        clearInterval(timerInterval); // Stop the timer interval
        document.getElementById("timer").innerHTML = "";

    } else {
        alert("Invalid OTP. Please try again.");
        sessionStorage.removeItem('otp');
        document.getElementById('otp').value = ''; // Clear the input field for re-entering OTP
        document.getElementById('otp').focus(); // Set focus back to OTP input field

    }
}


/*--------------------------------------SMS OTP Functions--------------------------------------*/
/*--------------------------------------SMS OTP Functions--------------------------------------*/
function sendOTPSMS() {
    const api_key = "880a60a1-0c46-11ef-8cbb-0200cd936042";
    let phoneOrEmail = document.getElementById("phone-email").value;
    let formattedPhoneNumber = phoneOrEmail.startsWith("+91") ? phoneOrEmail : "+91" + phoneOrEmail;

    // Check if the email/phone already exists in the Firebase database
    database.ref('userCredentials').orderByChild('username').equalTo(phoneOrEmail)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                // Username (email/phone) already exists
                alert('Email/phone already exists. Please use a different one.');
                return;
            } else {
                let url = `https://2factor.in/API/V1/${api_key}/SMS/${formattedPhoneNumber}/AUTOGEN`;
                
                fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("API response:", data);
                    if (data.Status === "Success") {
                        session_id = data.Details; // Store session_id for later use
                        alert("OTP sent successfully via SMS");
                    } else {
                        throw new Error(data.Details);
                    }
                })
                .catch((err) => {
                    console.error("Error sending OTP:", err);
                    alert("Error sending OTP. Please try again later.");
                });
            }
        })
        .catch((error) => {
            console.error('Error checking username existence:', error);
            alert('An error occurred. Please try again later.');
        });
}


// Function to verify OTP via SMS
function verifyOTPSMS() {
    playClickSound();
    let otp_entered_by_user = document.getElementById("otp").value;
    const api_key = "880a60a1-0c46-11ef-8cbb-0200cd936042";
    let url = `https://2factor.in/API/V1/${api_key}/SMS/VERIFY/${session_id}/${otp_entered_by_user}`;
    
    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        console.log("OTP verification response:", data);
        if (data.Status === "Success" && data.Details === "OTP Matched") {
            alert("OTP matched successfully");
            togglePasswordFieldsVisibility();
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML = "";
            const newUsername = document.getElementById('new-username').value;
            const newPassword = document.getElementById('new-password').value;
            localStorage.setItem(newUsername, newPassword); // Save username and password for login
        } else {
            throw new Error("Invalid OTP");
        }
    }) 
    .catch((err) => {
        console.error("Error verifying OTP:", err);
        alert("Invalid OTP. Please try again."); // Alert for invalid OTP
        // Clear stored OTP and prompt user to enter a new one
        sessionStorage.removeItem('otp');
        document.getElementById('otp').value = ''; // Clear the input field for re-entering OTP
        document.getElementById('otp').focus(); // Set focus back to OTP input field
    });
}
// Function to send OTP based on the selected delivery method
function sendOTP() {
    playClickSound();
    const newUsername = document.getElementById('new-username').value; 
    // Check if the full name field is empty
    if (!newUsername.trim()) { // trim() removes whitespace from both ends of a string
        alert('Please enter your full name.');
        return;
    }
    var deliveryMethod = document.getElementById("otp-delivery-method").value;
    if (deliveryMethod === "email") {
        sendOTPEmail();
    } else if (deliveryMethod === "sms") {
        sendOTPSMS();
    } else if (deliveryMethod === "dual") {
        sendOTPEmail();
        sendOTPSMS();
    }
}

function toggleVerifyButton() {
    var deliveryMethod = document.getElementById("otp-delivery-method").value;
    var emailVerifyBtn = document.getElementById("verify-otp-email-btn");
    var smsVerifyBtn = document.getElementById("verify-otp-sms-btn");
    var dualVerifyBtn = document.getElementById("verify-otp-dual-btn");

    if (deliveryMethod === "email") {
        emailVerifyBtn.style.display = "block";
        smsVerifyBtn.style.display = "none";
        dualVerifyBtn.style.display = "none";
    } else if (deliveryMethod === "sms") {
        emailVerifyBtn.style.display = "none";
        smsVerifyBtn.style.display = "block";
        dualVerifyBtn.style.display = "none";
    } else if (deliveryMethod === "NameSMS") {
        // Redirect to "SmS.html" when "Name SmS" is selected
        window.location.href = "SmS.html";
    }else if (deliveryMethod === "Namelink") {
        // Redirect to "SmS.html" when "Name SmS" is selected
        window.location.href = "Emailotp.html";
    }
}


// Add event listener to the "Verify OTP (SMS)" button
document.getElementById("verify-otp-sms-btn").addEventListener("click", verifyOTPSMS);

// Set default delivery method to email when the page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("otp-delivery-method").value = "email";
    toggleVerifyButton(); // Call the function to toggle verify buttons accordingly
});
/*------------------------------------------Password Visibility Functions---------------------------------------*/
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


function togglePasswordFieldsVisibility() {
    document.getElementById('password-fields').style.display = 'block';
}

/*--------------------------------------Create Account Function--------------------------------------*/
function createAccount() {
    playClickSound();

    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const newUsername = document.getElementById('new-username').value;
    const newEmailOrPhone = document.getElementById('phone-email').value;


    // Password validation rules
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Check if the password meets the validation criteria
    if (!passwordRegex.test(newPassword)) {
        alert('Password must contain at least 8 characters, including one uppercase letter, one number, and one special character (!@#$%^&*)');
        // Highlight the password field in red
        document.getElementById('new-password').style.Color = 'red';
        return;
    }

    // Check if the new password matches the confirmation password
    if (newPassword !== confirmPassword) {
        alert('New password & confirm password don\'t match');
        return;
    }

    // Save the new username and password to localStorage for later use
    localStorage.setItem(newUsername, newPassword);
    localStorage.setItem(newEmailOrPhone, newPassword); // Saving email/phone as key too for uniqueness

    // Send confirmation email to the user
    sendConfirmationEmail(newEmailOrPhone, newUsername, newPassword);

    setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
}

function sendConfirmationEmail(email, username, password) {
    const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #007bff; margin-bottom: 20px; text-align: center;">Registration Confirmation</h2>
        <p style="color: #333; font-size: 16px;">Dear ${username},</p>
        <p style="color: #333; font-size: 16px;">We are pleased to inform you that you have successfully registered on the Online Complaint Portal.</p>
        <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
            <p style="color: #333; font-size: 16px; margin: 0;">Your account details:</p>
            <ul style="list-style: none; padding: 0; margin-top: 5px;">
                <li><strong>Registered Email:</strong> ${email}</li>
                <li><strong>Password:</strong> ${password}</li>
            </ul>
        </div>
        <p style="color: #333; font-size: 16px;">Thank you for choosing our platform. We are excited to have you onboard!</p>
        <p style="color: #333; font-size: 16px;">Best regards,<br>The Online Complaint Portal Team</p>
    </div>
`;


    Email.send({
        SecureToken: "84b376b9-c826-434f-a560-e92c65aa608d",
        To: email,
        From: "neelbhattacharjee09@gmail.com",
        Subject: "Registration Confirmation",
        Body: emailBody,
        ContentType: 'text/html; charset=utf-8' // Set content type to HTML
    }).then(
        message => {
            if (message === 'OK') {
                console.log("Confirmation email sent successfully.");
            } else {
                console.error("Error sending confirmation email.");
            }
        }
    );
}

/*-----------------------preloader-----------------*/
     var overlayloader = document.getElementById("preloader");
     window.addEventListener("load",function(){
       overlayloader.style.display ="none";
     })


/*---------------------------- Click sound ---------------------------*/

function playClickSound() {
    const clickSound = document.getElementById("clickSound");
    clickSound.play();
  }
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


  