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
  const auth = firebase.auth();
  
  // Send OTP to the email
document.getElementById('send-otp').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    auth.sendSignInLinkToEmail(email, {
      url: 'http://127.0.0.1:5500/techsii.github.io/complaint%20portal/Create%20account.html',
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