import {string30Val, phoneVal, emailVal, stringVal} from './validators.js';
const delay = ms => new Promise(res => setTimeout(res, ms));

// update business contact function
async function updateFormHandler(event) {
    event.preventDefault();

    const business_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
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
      document.querySelector('#Title2').textContent = "Success!";
      document.querySelector('#modal-text2').textContent = "Business Data has been updated.";
      $('#myModalUpdate').modal()
      await delay(1500);
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
      document.querySelector('#Title2').textContent = "Success!";
      document.querySelector('#modal-text2').textContent = "Business has been deleted.";
      $('#myModalUpdate').modal()
      await delay(1500);
      document.location.replace("/dashboard");
    } else {
      document.querySelector('#Title').textContent = "Server error";
      document.querySelector('#modal-text').textContent = response.statusText;
      $('#myModal').modal()
    }     
}

document.querySelector("#delete").addEventListener("click", deleteHandler);



// cancel button function
function cancelHandler(event) {
    event.preventDefault();
      document.location.replace("/dashboard");      
}

document.querySelector("#cancel").addEventListener("click", cancelHandler);