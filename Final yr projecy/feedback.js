document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    var formData = new FormData(this);
    var name = formData.get('name');
    var email = formData.get('email');
    var rating = document.querySelectorAll('.rating > span.checked').length;
    var review = formData.get('review');
    
    // Send email using SMTP.js
    Email.send({
      Host: "smtp.elasticemail.com", // SMTP host
      Username: "help.complainportal@gmail.com", // SMTP username
      Password: "9A09A0B6DD8332BDE732A4AC4746C3620E31", // SMTP password
      To: 'help.complainportal@gmail.com', // Recipient email address
      From: "help.complainportal@gmail.com", // Sender email address
      Subject: `New Review from ${name}`, // Subject line
      Body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #007bff; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #007bff; margin-bottom: 20px;">New Review</h2>
          <div style="margin-bottom: 20px;">
            <strong style="color: #333;">Name:</strong> ${name}<br>
            <strong style="color: #333;">Email:</strong> ${email}
          </div>
          <div style="margin-bottom: 20px;">
            <strong style="color: #333;">Rating:</strong> 
            <span style="color: #f1c40f; font-size: 1.2em;">${rating}</span> 
            <span style="color: #f1c40f; font-size: 1.2em;">★</span>
          </div>
          <div>
            <strong style="color: #333;">Review:</strong><br>
            <p style="color: #333;">${review}</p>
          </div>
        </div>
      `, // Email body
      ContentType: 'text/html; charset=utf-8' // Set content type to HTML
    }).then(function(message) {
      alert('Review sent successfully!');
      // Reset form fields
      document.getElementById('feedbackForm').reset();
      // Clear the rating stars
      document.querySelectorAll('.rating > span').forEach(function(star) {
        star.classList.remove('checked');
      });
    }).catch(function(error) {
      console.error('Error:', error);
      alert('Failed to send review. Please try again later.');
    });
  });
  
  document.querySelectorAll('.rating > span').forEach(function(star) {
    star.addEventListener('click', function() {
      var clickedIndex = Array.prototype.indexOf.call(this.parentElement.children, this);
      for (var i = 4; i >= 0; i--) {
        if (i >= clickedIndex) {
          this.parentElement.children[i].classList.add('checked');
        } else {
          this.parentElement.children[i].classList.remove('checked');
        }
      }
    });
  });
});
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
    
    // Add or remove class for text color based on mode
    let statusResult = document.getElementById('statusResult');
    if (body.classList.contains("Dark")) {
      statusResult.classList.add("BlackText");
    } else {
      statusResult.classList.remove("BlackText");
    }

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


// Function to clear complaint details
function clearComplaintDetails() {
    document.getElementById('complaintId').value = ""; // Clear the input field
    // Clear the displayed complaint details
  document.getElementById("statusResult").innerHTML = "";
}

