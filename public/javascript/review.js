

async function validation (event) {
    event.preventDefault();

    var cookies = document.cookie;
    console.log(cookies);


    const business_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
      const response = await fetch('/api/business/' + business_id);
      const data = await response.json();
      const user_id = parseInt(document.querySelector('#user').textContent);
      if (data.reviews.length > 0) {
        console.log("si hay");
        const old_reviews = data.reviews.filter(review => review.user_id === user_id);
        if (old_reviews) {
          const last_review_date = new Date(old_reviews[0].created_at);
          const days = Math.floor([new Date().getTime() - last_review_date.getTime()]/(1000*3600*24));
          if (days > 29) {
            return reviewFormHandler();
          }
          else {
            window.alert("You alredy submited a review for this Business within the last 30 days. Please wait at least 30 days to submit a new review");
            return;
          }       
        }
      }
      return reviewFormHandler(); 
}

async function reviewFormHandler (event) {

  const star_rating = document.querySelector('#star-rating').value.trim();
  const review_text = document.querySelector('#review-text').value.trim();
  const business_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
  ];
  if (star_rating && review_text) {
    const response = await fetch('/api/reviews', {
      method: 'post',
      body: JSON.stringify({
        star_rating,
        review_text,
        business_id
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#add-review').addEventListener('click', validation);

// cancel button function
function cancelHandler(event) {
  event.preventDefault();
    window.history.back();
    // document.location.replace("/dashboard");      
}

document.querySelector("#cancel").addEventListener("click", cancelHandler);
