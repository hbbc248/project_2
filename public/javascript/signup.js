import {string20Val, emailVal, passwordVal} from './validators.js';

async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    if (!string20Val(username)) {
      window.alert("Please enter a user name.");
      return false;
    }

    const email = document.querySelector('#email-signup').value.trim();
    if (!emailVal(email)) {
      window.alert("You entered an invalid email please try again.");
      return false;
    }

    const password = document.querySelector('#password-signup').value.trim();
    if (!passwordVal(password)) {
        window.alert("Please enter a password within 6 & 16 characters.");
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
        window.alert("There is already a registered user using email " + data.errors[0].value + ". Please enter a diferrent email.");
        return
        }

        if (data.errors[0].message === "user.username must be unique") {
          window.alert("There is already a registered user with username " + data.errors[0].value + ". Please enter a diferrent user name.");
        return
        }
      }
    }
  }

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

