document.getElementById('contact_us_form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = document.querySelector('form');
    const name = form.querySelector('input[placeholder="Your name"]').value;
    const email = form.querySelector('input[placeholder="Email"]').value;
    const feedback_text = form.querySelector('textarea[placeholder="Message"]').value;
    
    fetch('/contact_us', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, feedback_text })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Your feedback has been submitted successfully.');
            window.location.href = 'home.html';
        } else {
            alert('There was a problem submitting your feedback. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error submitting your feedback:', error);
        console.log('Failed to submit your feedback.');
    });
});

