document.addEventListener('DOMContentLoaded', function() {
    // Prefix text animation for the typing effect
    const prefixText = "I am ";
    const suffixes = [
        "a Computer Science major",
        "an AI Engineer",
        "a Software Developer",
        "a Tech Enthusiast",
        "a Problem Solver"
    ];
    
    const typingTextElement = document.getElementById('typing-text');
    let currentSuffixIndex = 0;
    let isDeleting = false;
    let charIndex = 0;
    let typingSpeed = 100; // Milliseconds per character when typing
    let deletingSpeed = 50; // Milliseconds per character when deleting
    let delayAfterTyping = 2000; // How long to wait after typing before deleting
    let delayAfterDeleting = 500; // How long to wait after deleting before typing new text
    
    // No need to add blinking cursor animation here
    // as it's now handled in CSS
    
    function type() {
        const currentSuffix = suffixes[currentSuffixIndex];
        
        if (isDeleting) {
            // Only delete the suffix, keep the prefix "I am "
            if (charIndex > 0) {
                typingTextElement.textContent = prefixText + currentSuffix.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(type, deletingSpeed);
            } else {
                // When we've deleted the entire suffix
                isDeleting = false;
                currentSuffixIndex = (currentSuffixIndex + 1) % suffixes.length;
                // Add back the cursor when we're about to start typing a new suffix
                typingTextElement.style.borderRight = '3px solid #61dafb';
                setTimeout(type, delayAfterDeleting);
            }
        } else {
            // Typing mode - add prefix "I am " if we're starting
            if (charIndex === 0) {
                typingTextElement.textContent = prefixText;
                // Add back the cursor when starting to type
                typingTextElement.style.borderRight = '3px solid #61dafb';
            }
            
            // Add the next character of the suffix
            if (charIndex < currentSuffix.length) {
                typingTextElement.textContent = prefixText + currentSuffix.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(type, typingSpeed);
            } else {
                // If finished typing - remove the cursor
                typingTextElement.style.borderRight = 'none';
                isDeleting = true;
                setTimeout(type, delayAfterTyping);
            }
        }
    }
    
    // Start the typing animation
    typingTextElement.textContent = '';
    type();
    
    // Intersection Observer for text animations
    const animatedTextElements = document.querySelectorAll('.animate-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-typing');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust timing (negative value means trigger before fully in view)
    });
    
    // Start observing each animated text element
    animatedTextElements.forEach(element => {
        observer.observe(element);
    });
});