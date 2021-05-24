

async function newFormHandler(event) {
    event.preventDefault();
    console.log("works")

    const first_name = document.querySelector('#first-name').value;
    const last_name = document.querySelector('#last-name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const address = document.querySelector('#address').value;
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