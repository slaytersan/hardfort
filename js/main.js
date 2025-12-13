document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Modal & Form Handling
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const closeBtns = document.querySelectorAll('.modal-close, .modal-close-btn');

    // Close Modal Function
    const closeModal = () => {
        if (modal) modal.classList.remove('active');
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    if (contactForm && modal) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Transmitting...';
            btn.disabled = true;

            fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        modal.classList.add('active'); // Show success modal
                        contactForm.reset(); // Clear form
                    } else {
                        alert("Transmission Error. Please try again.");
                    }
                })
                .catch(error => {
                    alert("Transmission Error: " + error);
                })
                .finally(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
        });
    }
});
