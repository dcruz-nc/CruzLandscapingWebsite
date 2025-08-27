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
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset(); // Clear the form
            } else {
                showNotification('Failed to send message. Please try again or call us at 704-929-6571.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
});

// Custom notification system
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    
    // Set icon based on type
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icon}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds for success, 8 seconds for errors
    const autoRemoveTime = type === 'success' ? 5000 : 8000;
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, autoRemoveTime);
}