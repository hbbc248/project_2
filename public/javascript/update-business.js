import {string30Val, phoneVal, emailVal, stringVal} from './validators.js';
// update business contact function
async function updateFormHandler(event) {
    event.preventDefault();

    const business_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const name = document.querySelector('#name').value;
    if (!stringVal(name)) {
      window.alert("Name field can't be empty. Please enter a valid Business name.");
      return false;
    }
    const type = document.querySelector('#type').value;
    if (!string30Val(type)) {
      window.alert("Please enter a valid Business type.");
      return false;
    }
    const email = document.querySelector('#email').value;
    if (!emailVal(email)) {
      window.alert("You entered an invalid email please try again.");
      return false;
    }
    const phone = document.querySelector('#phone').value;
    if (!phoneVal(phone)) {
      window.alert("You entered an invalid phone number please try again. Valid format 555-555-5555.");
      return false;
    }
    const address = document.querySelector('#address').value;
    if (!stringVal(address)) {
      window.alert("Address field can't be empty. Please enter a valid address.");
      return false;
    }
    const webpage = document.querySelector('#webpage').value;
    const linkedin = document.querySelector('#linkedin').value;
    
    const response = await fetch('/api/business/' + business_id, {
      method: "PUT",
      body: JSON.stringify({
        name,
        type,
        email,
        phone,
        address,
        webpage,
        linkedin
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
        window.alert("Business Data has been updated!");
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    } 
}

document.querySelector("#update").addEventListener("click", updateFormHandler);

// delete busciness contact function
async function deleteHandler(event) {
    event.preventDefault();

    const business_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
     
    const response = await fetch('/api/business/' + business_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
        window.alert("Business Contact has been deleted!");
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }   
}

document.querySelector("#delete").addEventListener("click", deleteHandler);



// cancel button function
function cancelHandler(event) {
    event.preventDefault();
      document.location.replace("/dashboard");      
}

document.querySelector("#cancel").addEventListener("click", cancelHandler);