async function newFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const type = document.querySelector('#type').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const address = document.querySelector('#address').value;
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