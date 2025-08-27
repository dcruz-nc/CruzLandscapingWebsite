// Form handler for quote form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!form || !submitButton) {
        console.error('Form or submit button not found!');
        return;
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fname: document.getElementById('fname').value,
            lname: document.getElementById('lname').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                alert('Thank you! Your message has been sent successfully. We\'ll get back to you soon!');
                form.reset(); // Clear the form
            } else {
                alert('Oops! Something went wrong. Please try again or call us directly at 704-929-6571.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Oops! Something went wrong. Please try again or call us directly at 704-929-6571.');
        } finally {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
});