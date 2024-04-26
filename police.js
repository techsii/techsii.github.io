// JavaScript code for the main page (police.js)

// Define a mapping object for district values and names
const districtMap = {
  district1: 'Birbhum',
  district2: 'Cooch Behar',
  district3: 'Purulia',
  district4: 'Murshidabad',
  district5: 'Hooghly',
  // Add more districts as needed
};

// Get reference to the form elements
const complainantForm = document.getElementById('complainantForm');
const incidentForm = document.getElementById('incidentForm');

// Get reference to the button element
const submitBtn = document.getElementById('submitBtn');

// Listen for button click
submitBtn.addEventListener('click', function (event) {
  event.preventDefault();

  // Get values from the complainant form
  const complainantName = document.getElementById('complainantName').value;
  const complainantEmail = document.getElementById('complainantEmail').value;
  const complainantPhone = document.getElementById('complainantPhone').value;
  const state = document.getElementById('state').value;
  const districtValue = document.getElementById('district').value; // Get the district value

  // Map the district value to its name
  const districtName = districtMap[districtValue];

  const addressLine1 = document.getElementById('addressLine1').value;
  const landmark = document.getElementById('landmark').value;
  const pinCode = document.getElementById('pinCode').value;

  // Get values from the incident form
  const incidentType = document.getElementById('incident').value;
  const summary = document.getElementById('summary').value;
  const incidentDescription = document.getElementById('incidentDescription').value;
  const incidentImageInput = document.getElementById('incidentImage');

  // Perform basic form validation
  if (!complainantName || !complainantEmail || !complainantPhone || !state || !districtName || !addressLine1 || !landmark || !pinCode || !incidentType || !summary || !incidentDescription || !incidentImageInput.files[0]) {
    alert('Please fill in all the required fields.');
    return;
  }

  const incidentImageFile = incidentImageInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    // Compose the email body
    const emailBody = `
        Complainant Name: ${complainantName}<br>
        Complainant Email: ${complainantEmail}<br>
        Complainant Phone: ${complainantPhone}<br>
        State: ${state}<br>
        District: ${districtName}<br>
        Address Line 1: ${addressLine1}<br>
        Landmark: ${landmark}<br>
        Pin Code: ${pinCode}<br>
        Incident Type: ${incidentType}<br>
        Summary: ${summary}<br>
        <br>
        Incident Description: ${incidentDescription}<br>
    `;

    // Send the email using SMTP.js
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "neelbhattacharjee09@gmail.com",
      Password: "81867AF96829CFF18E7CD059EBD437FC2DAA",
      To: 'neel04735@gmail.com',
      From: "neelbhattacharjee09@gmail.com",
      Subject: "FIR Report",
      Body: emailBody,
      Attachments: [
        {
          name: incidentImageFile.name,
          data: reader.result.split(',')[1],
          type: incidentImageFile.type,
          inline: true,
        },
      ],
    }).then(
      message => {
        if (message === "OK") {
          // Reset the forms after successful submission
          complainantForm.reset();
          incidentForm.reset();
          alert("FIR filed successfully! A copy of the report has been sent to your email.");
        } else {
          alert("Failed to file FIR. Please try again later.");
        }
      }
    );
  };

  reader.readAsDataURL(incidentImageFile);
});
