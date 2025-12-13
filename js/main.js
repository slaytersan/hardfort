document.addEventListener('DOMContentLoaded', () => {
    console.log('HardFort Security loaded.');

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--color-bg-secondary)';
                navLinks.style.padding = 'var(--spacing-md)';
                navLinks.style.borderBottom = '1px solid var(--color-border)';
            }
        });
    }
});
