// update business contact function
async function updateFormHandler(event) {
    event.preventDefault();

    const contact_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const first_name = document.querySelector('#first-name').value;
    const last_name = document.querySelector('#last-name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const address = document.querySelector('#address').value;
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
        window.alert("Contact Data has been updated!");
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
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
        window.alert("Contact has been deleted!");
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }   
}

document.querySelector("#delete").addEventListener("click", deleteHandler);



// cancel button function
function cancelHandler(event) {
    event.preventDefault();
      document.location.replace("/dashboard");      
}

document.querySelector("#cancel").addEventListener("click", cancelHandler);