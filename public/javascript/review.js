import {stringVal, starVal} from './validators.js';

async function validation (event) {
    event.preventDefault();

    const business_id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
    ];
      const response = await fetch('/api/business/' + business_id);
      const data = await response.json();
      const user_id = parseInt(document.querySelector('#user').textContent);
      if (data.reviews.length > 0) {
        const old_reviews = data.reviews.filter(review => review.user_id === user_id);
        if (old_reviews.length > 0) {
          const last_review_date = new Date(old_reviews[0].created_at);
          const days = Math.floor([new Date().getTime() - last_review_date.getTime()]/(1000*3600*24));
          if (days > 29) {
            return reviewFormHandler(data);
          }
          else {
            document.querySelector('#Title').textContent = "Review input error";
            document.querySelector('#modal-text').textContent = "You already submitted a review for this Business within the last 30 days. Please wait at least 30 days to submit a new review.";
            $('#myModal').modal()
            return;
          }       
        }
      }
      return reviewFormHandler(data); 
}

async function reviewFormHandler (data) {

  const star_rating = document.querySelector('#star-rating').value.trim();
  if (!starVal(star_rating)) {
    document.querySelector('#Title').textContent = "Review input error";
    document.querySelector('#modal-text').textContent = "Please assign a rating to your review.";
    $('#myModal').modal()
    return false;
  }

  const review_text = document.querySelector('#review-text').value.trim();
  if (!stringVal(review_text)) {
    document.querySelector('#Title').textContent = "Review input error";
    document.querySelector('#modal-text').textContent = "Please leave a review comment.";
    $('#myModal').modal()
    return false;
  }
  const business_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
  ];
  const email = data.email;
  const name = data.name;
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
      // send email to business owner
      const response = fetch(`/reviews/email`, {
        method: "POST",
        body: JSON.stringify({
          star_rating,
          review_text,
          email,
          name
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

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
