import {string30Val, phoneVal, emailVal, stringVal} from './validators.js';

async function newFormHandler(event) {
    event.preventDefault();

    const first_name = document.querySelector('#first-name').value;
      if (!string30Val(first_name)) {
        window.alert("You entered an invalid first name please try again.");
        return false;
      }
    const last_name = document.querySelector('#last-name').value;
    if (!string30Val(last_name)) {
      window.alert("You entered an invalid last name please try again.");
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
    const instagram = document.querySelector('#instagram').value;
    const facebook = document.querySelector('#facebook').value;
    const tiktok = document.querySelector('#tiktok').value;
    const youtube = document.querySelector('#youtube').value;

    
    const response = await fetch(`/api/contacts`, {
      method: "POST",
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