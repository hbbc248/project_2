import {string30Val, phoneVal, emailVal, stringVal} from './validators.js';

async function newFormHandler(event) {
    event.preventDefault();

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
  

    const response = await fetch(`/api/business`, {
      method: "POST",
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
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
}

document.querySelector("#create").addEventListener("click", newFormHandler);

// cancel button function
function cancelHandler(event) {
  event.preventDefault();
    document.location.replace("/dashboard");      
}

document.querySelector("#cancel").addEventListener("click", cancelHandler);