// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOHKfARpobVRd7QLY1BcQMyXjMg6eSDMI",
  authDomain: "profile-database-fa673.firebaseapp.com",
  databaseURL: "https://profile-database-fa673-default-rtdb.firebaseio.com",
  projectId: "profile-database-fa673",
  storageBucket: "profile-database-fa673.appspot.com",
  messagingSenderId: "349540949644",
  appId: "1:349540949644:web:7b99ddd5acac93588265a9",
  measurementId: "G-V34HW6CGGK"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Send OTP to the email
document.getElementById('send-otp').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    auth.sendSignInLinkToEmail(email, {
      url: 'https://register-email.vercel.app/',
      handleCodeInApp: true
    }).then(() => {
      window.localStorage.setItem('emailForSignIn', email);
      showSuccess('Link sent to your email. Please check your email for the link and follow the instructions.');
    }).catch(error => {
      showError('Error sending email: ' + error.message);
    });
  });
  
  // Check for sign-in link
  window.addEventListener('load', () => {
    if (auth.isSignInWithEmailLink(window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      auth.signInWithEmailLink(email, window.location.href)
        .then(result => {
          showSuccess('Successfully signed in!');
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch(error => {
          showError('Error signing in: ' + error.message);
        });
    }
  });
  
  function showError(message) {
    const alertBox = document.getElementById('alert');
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 5000);
  }
  
  function showSuccess(message) {
    const successBox = document.getElementById('success');
    successBox.textContent = message;
    successBox.style.display = 'block';
    setTimeout(() => {
      successBox.style.display = 'none';
    }, 5000);
  }