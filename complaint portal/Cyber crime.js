// Get all the "Read More" buttons
const readMoreButtons = document.querySelectorAll('.article-link');

// Loop through each button and add an event listener
readMoreButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        // Prevent the default link behavior
        event.preventDefault();
        // Get the corresponding article content
        const content = this.previousElementSibling;
        // Toggle the visibility of the content
        content.classList.toggle('visible');
        // Change the text of the button based on the visibility of the content
        this.textContent = content.classList.contains('visible') ? 'Read Less' : 'Read More';
    });
});
// Get all the "Read More" buttons for news items
const readMoreNewsButtons = document.querySelectorAll('.news-link');

// Loop through each button and add an event listener
readMoreNewsButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        // Prevent the default link behavior
        event.preventDefault();
        // Get the corresponding news content
        const content = this.previousElementSibling;
        // Toggle the visibility of the content
        content.classList.toggle('visible');
        // Change the text of the button based on the visibility of the content
        this.textContent = content.classList.contains('visible') ? 'Read Less' : 'Read More';
    });
});
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
  