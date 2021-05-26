async function loginFormHandler(event) {
    event.preventDefault();
  
    const input = document.querySelector('#input').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
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
  

  
