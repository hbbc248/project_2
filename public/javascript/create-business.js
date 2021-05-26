import {string30Val, phoneVal, emailVal, stringVal} from './validators.js';

async function newFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    if (!stringVal(name)) {
      document.querySelector('#Title').textContent = "Data input error";
      document.querySelector('#modal-text').textContent = "Name field can't be empty. Please enter a valid Business name.";
      $('#myModal').modal()
      return false;
    }
    const type = document.querySelector('#type').value;
    if (!string30Val(type)) {
      document.querySelector('#Title').textContent = "Data input error";
      document.querySelector('#modal-text').textContent = "Please enter a valid Business type.";
      $('#myModal').modal()
      return false;
    }
    const email = document.querySelector('#email').value;
    if (!emailVal(email)) {
      document.querySelector('#Title').textContent = "Data input error";
      document.querySelector('#modal-text').textContent = "You entered an invalid email please try again.";
      $('#myModal').modal()
      return false;
    }
    const phone = document.querySelector('#phone').value;
    if (!phoneVal(phone)) {
      document.querySelector('#Title').textContent = "Data input error";
      document.querySelector('#modal-text').textContent = "You entered an invalid phone number please try again. Valid format 555-555-5555.";
      $('#myModal').modal()
      return false;
    }
    const address = document.querySelector('#address').value;
    if (!stringVal(address)) {
      document.querySelector('#Title').textContent = "Data input error";
      document.querySelector('#modal-text').textContent = "Address field can't be empty. Please enter a valid address.";
      $('#myModal').modal()
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
      const data = await response.json();
      if (data.errors[0].message === "Validation isEmail on email failed") {
      document.querySelector('#Title').textContent = "Server error";
      document.querySelector('#modal-text').textContent = "Server email validation failed. Please enter a valid email";
      $('#myModal').modal()
      return
      } else {
        document.querySelector('#Title').textContent = "Server error";
        document.querySelector('#modal-text').textContent = response.statusText;
        $('#myModal').modal()
      }
    }
}

document.querySelector("#create").addEventListener("click", newFormHandler);

// cancel button function
function cancelHandler(event) {
  event.preventDefault();
    document.location.replace("/dashboard");      
}

document.querySelector("#cancel").addEventListener("click", cancelHandler);