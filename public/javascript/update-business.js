// update business contact function
async function updateFormHandler(event) {
    event.preventDefault();

    const business_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
    const name = document.querySelector('#name').value;
    const type = document.querySelector('#type').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const address = document.querySelector('#address').value;
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
        window.alert("Business Data has been updated!");
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
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
        window.alert("Business Contact has been deleted!");
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