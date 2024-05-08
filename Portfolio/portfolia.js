var typed = new Typed('#element', {
    strings: ['wed developer', 'Software developer'],
    typeSpeed: 50,
    
  });

  function sendEmail() {
    // Retrieve input values
    const name = document.querySelector('.text-id').value;
    const email = document.querySelector('.text-email').value;
    const issue = document.querySelector('.text-project').value;
    const message = document.querySelector('.text-mesg').value;

    // Check if any field is empty
    if (name.trim() === '' || email.trim() === '' || issue.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields.');
        return false; // Prevent the default form submission behavior
    }

    // Construct the email body with improved formatting
    const emailBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
      <h2 style="color: #333; margin-bottom: 20px;">New Support Request</h2>
      <div style="margin-bottom: 20px;">
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}
      </div>
      <div style="margin-bottom: 20px;">
        <strong>Issue:</strong><br>
        ${issue}
      </div>
      <div>
        <strong>Message:</strong><br>
        ${message}
      </div>
    </div>
  `;

    // Use Email.send() function to send the email
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "neelbhattacharjee09@gmail.com", // Replace with your SMTP username
        Password: "E60A0EE242F736679F36FA925469183CD71A", // Replace with your SMTP password
        To: 'neel04735@gmail.com', // Recipient email address
        From: "neelbhattacharjee09@gmail.com", // Sender email address (user-provided)
        Subject: `Project: ${issue}`, // Subject line (includes the issue)
        Body: emailBody, // Email body with improved formatting
        ContentType: 'text/html; charset=utf-8' // Set content type to HTML
    }).then(
        function(response) {
            // Check if the email is sent successfully
            if (response && response.status === 'OK') {
                // Show a success message
                alert("Failed to send message. Please try again later.");
            } else {
                // Show an error message if the email failed to send
                alert("Message sent successfully!");
            }
        }
    ).catch(
        function(error) {
            // Log any errors to the console
            console.error('Error:', error);
            // Show an error message to the user
            alert('An error occurred while sending the message. Please try again later.');
        }
    );

    // Clear input fields after sending the email
    clearInputFields();

    return false; // Prevent the default form submission behavior
}

// Function to clear input fields
function clearInputFields() {
    document.querySelector('.text-id').value = '';
    document.querySelector('.text-email').value = '';
    document.querySelector('.text-project').value = '';
    document.querySelector('.text-mesg').value = '';
}
