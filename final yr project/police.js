// Define a mapping object for district values and names
const districtMap = {
  "West Bengal": [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur (South Dinajpur)",
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata",
    "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur (West Medinipur)",
    "Paschim Bardhaman (West Bardhaman)", "Purba Bardhaman (East Bardhaman)", "Purba Medinipur (East Medinipur)",
    "Purulia", "South 24 Parganas", "Uttar Dinajpur (North Dinajpur)"
  ],
  "Andhra Pradesh": [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", 
    "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Visakhapatnam", 
    "Vizianagaram", "West Godavari", "Y.S.R. Kadapa"
  ],
  "Arunachal Pradesh": [
    "Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi",
    "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang",
    "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai",
    "Changlang", "Tirap", "Longding"
  ],
  "Assam": [
    "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang",
    "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat",
    "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong",
    "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari",
    "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar",
    "Darbhanga", "East Champaran (Motihari)", "Gaya", "Gopalganj", "Jamui", "Jehanabad",
    "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani",
    "Munger (Monghyr)", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia (Purnea)", "Rohtas",
    "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul",
    "Vaishali", "West Champaran"
  ],
  "Chhattisgarh": [
    "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada",
    "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham (Kawardha)", "Kanker",
    "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur",
    "Rajnandgaon", "Sukma", "Surajpur", "Surguja"
  ],

  "Goa": [
    "North Goa", "South Goa"
  ],

  "Gujarat": [
    "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha (Palanpur)", "Bharuch", "Bhavnagar",
    "Botad", "Chhota Udepur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath",
    "Jamnagar", "Junagadh", "Kheda (Nadiad)", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada",
    "Navsari", "Panchmahal (Godhra)", "Patan", "Porbandar", "Rajkot", "Sabarkantha (Himmatnagar)",
    "Surat", "Surendranagar", "Tapi (Vyara)", "Vadodara", "Valsad"
  ],

  "Haryana": [
    "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram (Gurgaon)", "Hisar",
    "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula",
    "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi",
    "Shimla", "Sirmaur", "Solan", "Una"
  ],

  "Karnataka": [
    "Bagalkot", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru (Bangalore) Rural", "Bengaluru (Bangalore) Urban",
    "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru (Chikmagalur)", "Chitradurga", "Dakshina Kannada",
    "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi (Gulbarga)", "Kodagu", "Kolar", "Koppal",
    "Mandya", "Mysuru (Mysore)", "Raichur", "Ramanagara", "Shivamogga (Shimoga)", "Tumakuru (Tumkur)", "Udupi",
    "Uttara Kannada (Karwar)", "Vijayapura (Bijapur)", "Yadgir"
  ],

  "Jharkhand": [
    "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda",
    "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
    "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"
  ],

  "Kerala": [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode",
    "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
  ],

  "Madhya Pradesh": [
    "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal",
    "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior",
    "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur",
    "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore",
    "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria",
    "Vidisha"
  ],

  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule",
    "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban",
    "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri",
    "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching",
    "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
  ],

  "Mizoram": [
    "Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"
  ],

  "Nagaland": [
    "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"
  ],

  "Meghalaya": [
    "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills",
    "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
  ],

  "Odisha": [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati",
    "Ganjam", "Jagatsinghapur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)",
    "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur",
    "Sonepur", "Sundargarh"
  ],

  "Rajasthan": [
    "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh",
    "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu",
    "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi",
    "Sri Ganganagar", "Tonk", "Udaipur"
  ],

  "Punjab": [
    "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur",
    "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala",
    "Rupnagar", "Sahibzada Ajit Singh Nagar (Mohali)", "Sangrur", "Shaheed Bhagat Singh Nagar (Nawanshahr)",
    "Sri Muktsar Sahib", "Tarn Taran"
  ],

  "Sikkim": [
    "East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"
  ],
  
  "Tamil Nadu": [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode",
    "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
    "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem",
    "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
    "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
  ],

  "Telangana": [
    "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalapally",
    "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar",
    "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal",
    "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad",
    "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"
  ],

  "Tripura": [
    "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"
  ],

  "Uttarakhand": [
    "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal",
    "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
  ],

  "Uttar Pradesh": [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi (Chatrapati Sahuji Mahraj Nagar)", "Amroha (J.P. Nagar)",
    "Auraiya", "Ayodhya (Faizabad)", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda",
    "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot",
    "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad",
    "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur (Panchsheel Nagar)", "Hardoi", "Hathras", "Jalaun",
    "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar (Padrauna)",
    "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut",
    "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj (Allahabad)", "Raebareli",
    "Rampur", "Saharanpur", "Sambhal (Bhim Nagar)", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti",
    "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
  ],
  
};

// Function to show districts based on the selected state
function showDistricts() {
  var stateSelect = document.getElementById("state");
  var districtGroup = document.getElementById("districtGroup");
  var districtSelect = document.getElementById("district");

  // Remove the required attribute temporarily
  districtSelect.removeAttribute("required");

  // Hide district select initially
  districtGroup.style.display = "none";

  // Reset district options
  districtSelect.innerHTML = '<option value="" selected disabled>Select District</option>';

  // Get the selected state
  var selectedState = stateSelect.value;

  // If the selected state is found in the districtMap
  if (selectedState in districtMap) {
    var districts = districtMap[selectedState];

    // Add districts to the select options
    districts.forEach(function(district) {
      var option = document.createElement("option");
      option.text = district;
      option.value = district;
      districtSelect.add(option);
    });

    // Show district select
    districtGroup.style.display = "block";
  }

  // Restore the required attribute after updating options
  districtSelect.setAttribute("required", true);
}

// Function to generate a random complaint ID
function generateComplaintId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let complaintId = '';
  for (let i = 0; i < length; i++) {
    complaintId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return complaintId;
}

// Function to verify Aadhaar number
function verifyAadhaarNumber(aadhaarNumber) {
  return aadhaarNumber.length === 12;
  
}

// Function to reset Aadhaar input field
function resetAadhaarInputField() {
  document.getElementById("aadhaar").value = "";
}

// Function to enable Complainant Message Box if Aadhaar and phone number are valid
function enableComplainantMessageBox() {
  const aadhaarInput = document.getElementById("aadhaar");
  const validationMessage = document.getElementById("aadhaarValidationMessage");
  const complainantDetailsContainer = document.querySelector(".container1");
  const complainantMessageBox = document.getElementById("complainantMessageBox");

  // Check if Aadhaar and phone number are valid
  const isAadhaarValid = verifyAadhaarNumber(aadhaarInput.value);
  const isPhoneValid = validateComplainerPhone();

  if (isAadhaarValid && isPhoneValid) {
    complainantDetailsContainer.style.display = "none";
    complainantMessageBox.style.display = "block";
    validationMessage.textContent = "";

    // Enable other form elements
    const incidentFormElements = complainantMessageBox.querySelectorAll("input, select, textarea, button");
    incidentFormElements.forEach(element => {
      element.disabled = false;
    });
  } else {
    // If Aadhaar or phone number is invalid, display appropriate message
    if (!isAadhaarValid) {
      validationMessage.textContent = "Invalid Aadhaar number. Please enter a valid 12-digit Aadhaar number.";
      resetAadhaarInputField();
    }
    // Check if phone number is invalid and show alert message accordingly
    if (!isPhoneValid) {
      alert("Please enter a valid 10-digit phone number.");
    }

    // Remove the validation message after 5 seconds
    setTimeout(() => {
      validationMessage.textContent = "";
    }, 6000);
  }
}



// Function to show Complainant Details section
function showComplainantDetails() {
  const complainantDetailsContainer = document.querySelector(".container1");
  const complainantMessageBox = document.getElementById("complainantMessageBox");

  complainantDetailsContainer.style.display = "block";
  complainantMessageBox.style.display = "none";
}

// Function to show Complainant Message BOX section
function showComplainantMessageBox() {
  const complainantDetailsContainer = document.querySelector(".container1");
  const complainantMessageBox = document.getElementById("complainantMessageBox");

  complainantDetailsContainer.style.display = "none";
  complainantMessageBox.style.display = "block";
}

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD85I5rIPzsfZ7JX_LAachui0iwxzDy98s",
  authDomain: "online-complain-portal.firebaseapp.com",
  databaseURL: "https://online-complain-portal-default-rtdb.firebaseio.com",
  projectId: "online-complain-portal",
  storageBucket: "online-complain-portal.appspot.com",
  messagingSenderId: "1019541538165",
  appId: "1:1019541538165:web:9c8fd57d8149766a18ff3c",
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Function to initialize the script
function init() {
  const complainantMessageBox = document.getElementById("complainantMessageBox");
  complainantMessageBox.style.display = "none";

  const verifyAadhaarBtn = document.getElementById("verifyAadhaarBtn");
  verifyAadhaarBtn.addEventListener("click", function(event) {
    event.preventDefault();
    playClickSound();
    enableComplainantMessageBox();
    aadhaarVerified = verifyAadhaarNumber(document.getElementById("aadhaar").value);
    enableRightArrow();
  });

  const leftArrowBtn = document.getElementById("leftArrowBtn");
  const rightArrowBtn = document.getElementById("rightArrowBtn");

  leftArrowBtn.addEventListener("click", function(event) {
    event.preventDefault();
    showComplainantDetails();
    playClickSound();
  });

  rightArrowBtn.addEventListener("click", function(event) {
    event.preventDefault();
    playClickSound();
  
    // Verify Aadhaar and validate phone number
    const isAadhaarValid = verifyAadhaarNumber(document.getElementById("aadhaar").value);
    const isPhoneValid = validateComplainerPhone();
  
    if (!isAadhaarValid && !isPhoneValid) {
      alert("Please enter a valid Aadhaar number and a valid 10-digit phone number.");
    } else if (!isAadhaarValid) {
      alert("Please verify Aadhaar first.");
    } else if (!isPhoneValid) {
      alert("Please enter a valid 10-digit phone number.");
    } else {
      // Proceed to next step if both Aadhaar and phone number are valid
      showComplainantMessageBox();
    }
  });
  

  const complainantForm = document.getElementById('complainantForm');
  const incidentForm = document.getElementById('incidentForm');
  const trackForm = document.getElementById('trackForm');
  const submitBtn = document.getElementById('submitBtn');
  const trackBtn = document.getElementById('trackBtn');

  submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    overlayloader.style.display = "block"; // Display preloader at the beginning

    playClickSound();

    const maxFileSizeInBytes = 8 * 1024 * 1024; // 8.0 MB in bytes
    const incidentImageInput = document.getElementById('incidentImage');
    const incidentImageInput2 = document.getElementById('incidentImage2');

    if (!incidentImageInput || !incidentImageInput2) {
        console.error("Error: Unable to find incident image input elements.");
        return;
    }

    const incidentImageFiles1 = Array.from(incidentImageInput.files);
    const incidentImageFiles2 = Array.from(incidentImageInput2.files);

    const totalSize = incidentImageFiles1.reduce((acc, file) => acc + file.size, 0) +
        incidentImageFiles2.reduce((acc, file) => acc + file.size, 0);

    if (totalSize > maxFileSizeInBytes) {
        const confirmation = confirm('Attachment size exceeds the limit of 8.0 MB. Do you want to continue and clear the form?');

        if (confirmation) {
            // Clear file input fields
            incidentImageInput.value = null;
            incidentImageInput2.value = null;

            // Clear other input fields except Aadhaar
            document.getElementById('complainantName').value = '';
            document.getElementById('complainantEmail').value = '';
            document.getElementById('complainantPhone').value = '';
            document.getElementById('state').value = '';
            document.getElementById('district').value = '';
            document.getElementById('addressLine1').value = '';
            document.getElementById('pinCode').value = '';
            document.getElementById('landmark').value = ''; // Clear landmark field
            document.getElementById('incident').value = '';
            document.getElementById('summary').value = '';
            document.getElementById('incidentDescription').value = '';

            overlayloader.style.display = "none"; // Hide preloader after form is cleared
            return; // Prevent form submission
        } else {
            overlayloader.style.display = "none"; // Hide preloader if user cancels
            return; // Prevent form submission
        }
    }


    const attachments = [];

    Promise.all(
        incidentImageFiles1.map(file => {
            return new Promise(resolve => {
                const reader = new FileReader();
                reader.onload = function () {
                    attachments.push({
                        name: file.name,
                        data: reader.result.split(',')[1],
                        type: file.type,
                        inline: true,
                    });
                    resolve();
                };
                reader.readAsDataURL(file);
            });
        }).concat(
            incidentImageFiles2.map(file => {
                return new Promise(resolve => {
                    const reader = new FileReader();
                    reader.onload = function () {
                        attachments.push({
                            name: file.name,
                            data: reader.result.split(',')[1],
                            type: file.type,
                            inline: true,
                        });
                        resolve();
                    };
                    reader.readAsDataURL(file);
                });
            })
        )
    ).then(() => {
      // Capture user input
        const complainantName = document.getElementById('complainantName').value;
        const complainantEmail = document.getElementById('complainantEmail').value;
        const complainantPhone = document.getElementById('complainantPhone').value;
        const state = document.getElementById('state').value;
        const districtValue = document.getElementById('district').value;
        const addressLine1 = document.getElementById('addressLine1').value;
        const pinCode = document.getElementById('pinCode').value;
        const landmark = document.getElementById('landmark').value;
        const incidentType = document.getElementById('incident').value;
        const summary = document.getElementById('summary').value;
        const incidentDescription = document.getElementById('incidentDescription').value;

        if (
            !complainantName || !complainantEmail || !complainantPhone ||
            !state || !districtValue || !addressLine1 || !pinCode ||
            !incidentType || !summary || !incidentDescription || !incidentImageInput2.files[0]
        ) {
            let missingFields = [];
            if (!complainantName) missingFields.push("Complainant Name");
            if (!complainantEmail) missingFields.push("Complainant Email");
            if (!complainantPhone) missingFields.push("Complainant Phone");
            if (!state) missingFields.push("State");
            if (!districtValue) missingFields.push("District");
            if (!addressLine1) missingFields.push("Address Line 1");
            if (!pinCode) missingFields.push("Pin Code");
            if (!incidentType) missingFields.push("Incident Type");
            if (!summary) missingFields.push("Summary");
            if (!incidentDescription) missingFields.push("Incident Description");
            if (!incidentImageInput2.files[0]) missingFields.push("Attach Govt. Id proof");

            // Hide preloader before showing alert
            overlayloader.style.display = "none";

            alert(`Please fill in all the required fields: ${missingFields.join(", ")}.`);
            return;
        }

        const complaintId = generateComplaintId();
        const subject = "Online Complaint Portal - Complaint ID: " + complaintId; // Construct email subject line with complaint ID
        const emailBody = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        background-color: #f9f9f9;
                        padding: 20px;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    h2 {
                        color: #333;
                        border-bottom: 2px solid #333;
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                    }
                    .info {
                        margin-bottom: 20px;
                    }
                    .info-item {
                        margin-bottom: 10px;
                    }
                    strong {
                        color: #333;
                    }
                    .footer {
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 1px solid #ccc;
                        text-align: center;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <h2> Issue details </h2>
                <div class="info">
                    <div class="info-item">
                        <strong>Complainant Name:</strong> ${complainantName}
                    </div>
                    <div class="info-item">
                        <strong>Complainant Email:</strong> ${complainantEmail}
                    </div>
                    <div class="info-item">
                        <strong>Complainant Phone:</strong> ${complainantPhone}
                    </div>
                    <div class="info-item">
                        <strong>State:</strong> ${state}
                    </div>
                    <div class="info-item">
                        <strong>District:</strong> ${districtValue}
                    </div>
                    <div class="info-item">
                        <strong>Address Line 1:</strong> ${addressLine1}
                    </div>
                    <div class="info-item">
                        <strong>Landmark:</strong> ${landmark || 'Not provided'}
                    </div>
                    <div class="info-item">
                        <strong>Pin Code:</strong> ${pinCode}
                    </div>
                    <div class="info-item">
                        <strong>Incident Type:</strong> ${incidentType}
                    </div>
                    <div class="info-item">
                        <strong>Summary:</strong> ${summary}
                    </div>
                    <div class="info-item">
                        <strong>Incident Description:</strong> ${incidentDescription}
                    </div>
                    <div class="info-item">
                        <strong>Complaint ID:</strong> ${complaintId}
                    </div>
                </div>
                <div class="footer">
                    <p>
                        The message is written from the perspective of the sender, providing general information about the email's subject and inviting further inquiries. Thank you.
                    </p>
                </div>
            </body>
            </html>
        `;

        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "info.complainportal@gmail.com",
            Password: "4B3B60DB7FAFA5EB7E83516B9D464053FBC6",
            To: 'help.complainportal@gmail.com',
            From: "info.complainportal@gmail.com",
            Subject: subject, // Use the constructed subject line
            Body: emailBody,
            Attachments: attachments,
            Cc: complainantEmail, // Adding complainant email as CC recipient
        }).then(
            message => {
                // Hide preloader after email is sent
                overlayloader.style.display = "none";
                if (message === "OK") {
                    // If email is sent successfully, save data to Firebase
                    const complaintData = {
                        complainantName: complainantName,
                        complainantEmail: complainantEmail,
                        complainantPhone: complainantPhone,
                        state: state,
                        district: districtValue,
                        address: addressLine1,
                        landmark: landmark,
                        pinCode: pinCode,
                        incidentType: incidentType,
                        summary: summary,
                        incidentDescription: incidentDescription,
                        date: getCurrentDate(),
                        complaintId: complaintId // Link complaint ID to user input
                    };

                    // Save data to Firebase Realtime Database
                    database.ref('complaints/' + complaintId).set(complaintData)
                        .then(() => {
                            // If data is successfully saved
                            alert("Complaint successfully recorded in our database. A copy of the report has been sent to your email.");

                            // Redirect after 5 seconds
                            setTimeout(function () {
                                window.location.href = "index.html";
                            }, 5000);
                        })
                        .catch(error => {
                            // If an error occurs while saving data to Firebase
                            console.error("Error saving data to Firebase:", error);
                            alert("Failed to submit complaint. Please try again later.");
                        });
                } else {
                    // If email sending fails
                    alert("Failed to submit complain. Please try again later.");
                }
            }
        );
    });
});

  trackBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const complaintId = document.getElementById('complaintId').value;

    fetch(`/api/complaints/status/${complaintId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch complaint status');
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('statusResult').innerText = `Status for complaint ID ${complaintId}: ${data.status}`;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('statusResult').innerText = `Error fetching status. Please try again later.`;
      });
  });
}

// Call the init function when the page loads
document.addEventListener("DOMContentLoaded", function() {
  init();
});


var overlayloader = document.getElementById("preloader");
window.addEventListener("load",function(){
  overlayloader.style.display ="none";
});

function getUrlParameter(name) {a
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const complaintIdFromUrl = getUrlParameter('complaintId');
document.getElementById('complaintId').value = complaintIdFromUrl;

// Function to play click sound
function playClickSound() {
  const clickSound = document.getElementById("clickSound");
  clickSound.play();
}

// Function to clear the file input field
function clearFileInput(input) {
  // Reset the file input field
  input.value = '';

  // Remove the preview container
  var previewContainer = input.nextElementSibling;
  if (previewContainer && previewContainer.classList.contains('preview-container')) {
      previewContainer.parentNode.removeChild(previewContainer);
  }

  // Play click sound
  clickSound.play();
}

// Event listener for incidentImage2 file input change
document.getElementById('incidentImage2').addEventListener('change', function() {
  handleFileSelection(this, '.form-group5');
});

// Function to handle file selection and display preview container
function handleFileSelection(input, containerSelector) {
  var file = input.files[0];

  // Remove any existing preview container for this input
  var existingPreview = input.nextElementSibling;
  if (existingPreview && existingPreview.classList.contains('preview-container')) {
      existingPreview.parentNode.removeChild(existingPreview);
  }

  // Create a new preview container
  var previewContainer = document.createElement('div');
  previewContainer.classList.add('preview-container');

  // Create an element to display the file name
  var fileNameElement = document.createElement('p');
  fileNameElement.textContent = file.name;

  // Create a clear button
  var clearButton = document.createElement('span');
  clearButton.classList.add('clear-button');
  clearButton.textContent = '✖';
  clearButton.onclick = function() {
      clearFileInput(input);
  };

  // Append the file name element and clear button to the preview container
  previewContainer.appendChild(fileNameElement);
  previewContainer.appendChild(clearButton);

  // Append the preview container to the respective form group container
  var formGroupContainer = input.closest(containerSelector);
  formGroupContainer.appendChild(previewContainer);
}
// Function to clear file input field
function clearFileInput(input) {
  input.value = null;
}
// Function to play click sound
function playClickSound() {
  const clickSound = document.getElementById("clickSound");
  clickSound.play();
}

// Function to validate Complainer Phone number
function validateComplainerPhone() {
  var complainerPhone = document.getElementById("complainantPhone").value;
  // Regular expression to match exactly 10 digits
  var phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(complainerPhone)) {
      return false; // Return false to indicate validation failure
  }
  return true; // Return true to indicate validation success
}
// Function to get the current date in ISO string format
function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toISOString();
}
