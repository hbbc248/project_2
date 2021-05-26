import {string30Val, phoneVal, emailVal, stringVal} from './validators.js';
const delay = ms => new Promise(res => setTimeout(res, ms));

// update personal contact function
async function updateFormHandler(event) {
    event.preventDefault();

    const contact_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const first_name = document.querySelector('#first-name').value;
      if (!string30Val(first_name)) {
        document.querySelector('#Title').textContent = "Data input error";
        document.querySelector('#modal-text').textContent = "You entered an invalid first name please try again.";
        $('#myModal').modal()
        return false;
      }
    const last_name = document.querySelector('#last-name').value;
    if (!string30Val(last_name)) {
      document.querySelector('#Title').textContent = "Data input error";
      document.querySelector('#modal-text').textContent = "You entered an invalid last name please try again.";
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
    const instagram = document.querySelector('#instagram').value;
    const facebook = document.querySelector('#facebook').value;
    const tiktok = document.querySelector('#tiktok').value;
    const youtube = document.querySelector('#youtube').value;
    
    const response = await fetch('/api/contacts/' + contact_id, {
      method: "PUT",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        address,
        instagram,
        facebook,
        tiktok,
        youtube
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.querySelector('#Title').textContent = "Success!";
      document.querySelector('#modal-text').textContent = "Contact has been updated.";
      $('#myModal').modal()
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

    const contact_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
     
    const response = await fetch('/api/contacts/' + contact_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.querySelector('#Title').textContent = "Success!";
      document.querySelector('#modal-text').textContent = "Contact has been deleted.";
      $('#myModal').modal()
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