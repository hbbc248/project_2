async function newFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="business-name"]').value;
    const type = document.querySelector('input[name="business-type"]').value;
    const email = document.querySelector('input[name="business-email"]').value;
    const phone = document.querySelector('input[name="business-phone"]').value;
    const address = document.querySelector('input[name="business-address"]').value;
    const webpage = document.querySelector('input[name="business-webpage"]').value;
    const linkedin = document.querySelector('input[name="business-linkedin"]').value;
  

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
  
  document
  .querySelector(".new-business-contact-form")
  .addEventListener("submit", newFormHandler);
