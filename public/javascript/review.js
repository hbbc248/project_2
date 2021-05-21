async function reviewFormHandler(event) {
    event.preventDefault();
  
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

  document.querySelector('#add-review').addEventListener('click', reviewFormHandler);
