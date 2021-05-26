import {string20Val, emailVal, passwordVal} from './validators.js';

async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    if (!string20Val(username)) {
      document.querySelector('#Title').textContent = "Data input error";
      document.querySelector('#modal-text').textContent = "Please enter a user name";
      $('#myModal').modal()
      return false;
    }

    const email = document.querySelector('#email-signup').value.trim();
    if (!emailVal(email)) {
      document.querySelector('#Title').textContent = "Data input error";
      document.querySelector('#modal-text').textContent = "You entered an invalid email please try again.";
      $('#myModal').modal()
      return false;
    }

    const password = document.querySelector('#password-signup').value.trim();
    if (!passwordVal(password)) {
        document.querySelector('#Title').textContent = "Data input error";
        document.querySelector('#modal-text').textContent = "Invalid password. Please enter a password between 6 & 16 characters.";
        $('#myModal').modal()
        return false;
      }
      
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        const data = await response.json();
        if (data.errors[0].message === "user.email must be unique") {
        document.querySelector('#Title').textContent = "Error signing up";
        document.querySelector('#modal-text').textContent = "There is already a registered user using email " + data.errors[0].value + ". Please enter a diferrent email.";
        $('#myModal').modal()
        return
        }

        if (data.errors[0].message === "user.username must be unique") {
          document.querySelector('#Title').textContent = "Error signing up";
          document.querySelector('#modal-text').textContent = "There is already a registered user with username " + data.errors[0].value + ". Please enter a diferrent user name.";
          $('#myModal').modal()
        return
        }
      }
    }
  }

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

