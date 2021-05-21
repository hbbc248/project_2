async function newFormHandler(event) {
    event.preventDefault();
    console.log("works")

    const first_name = document.querySelector('input[name="first-name"]').value;
    const last_name = document.querySelector('input[name="last-name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const address = document.querySelector('input[name="address"]').value;
    const instagram = document.querySelector('input[name="instagram"]').value;
    const facebook = document.querySelector('input[name="facebook"]').value;
    const tiktok = document.querySelector('input[name="tiktok"]').value;
    const youtube = document.querySelector('input[name="youtube"]').value;

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
  
  document
  .querySelector(".btn")
  .addEventListener("click", newFormHandler);