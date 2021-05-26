async function loginFormHandler(event) {
    event.preventDefault();
  
    const input = document.querySelector('#input').value.trim();
    if (!input) {
      document.querySelector('#Title').textContent = "Error logging in";
      document.querySelector('#modal-text').textContent = "Please enter your username or email.";
      $('#myModal').modal()
    }
    const password = document.querySelector('#password-login').value.trim();
    if (!password) {
      document.querySelector('#Title').textContent = "Error logging in";
      document.querySelector('#modal-text').textContent = "Please enter your password.";
      $('#myModal').modal()
    }
  
    if (input && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          input,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        const data = await response.json();
        document.querySelector('#Title').textContent = "Error logging in";
        document.querySelector('#modal-text').textContent = data.message;
        $('#myModal').modal()
      }
    }
  }
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  

  
