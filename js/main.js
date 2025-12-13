document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Dynamic Footer Loader
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('components/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                // Highlight active link in footer if needed
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const footerLinks = footerPlaceholder.querySelectorAll('a');
                footerLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.style.color = 'var(--color-accent-blue)';
                    }
                });
            })
            .catch(error => console.error('Error loading footer:', error));
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
