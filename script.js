document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        initializeTypingAnimation();
        observeAnimatedElements();
    }, 100);
    
    function initializeTypingAnimation() {
        const prefixText = "I am ";
        const suffixes = [
            "a Computer Science major",
            "an AI Engineer",
            "a Software Developer",
            "a Tech Enthusiast",
            "a Problem Solver"
        ];
        
        const typingTextElement = document.getElementById('typing-text');
        if (!typingTextElement) return;
        
        let currentSuffixIndex = 0;
        let isDeleting = false;
        let charIndex = 0;
        let typingSpeed = 100;
        let deletingSpeed = 50;
        let delayAfterTyping = 2000;
        let delayAfterDeleting = 500;
        
        function type() {
            if (!typingTextElement) return;
            
            const currentSuffix = suffixes[currentSuffixIndex];
            
            if (isDeleting) {
                if (charIndex > 0) {
                    typingTextElement.textContent = prefixText + currentSuffix.substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(type, deletingSpeed);
                } else {
                    isDeleting = false;
                    currentSuffixIndex = (currentSuffixIndex + 1) % suffixes.length;
                    typingTextElement.style.borderRight = '3px solid #61dafb';
                    setTimeout(type, delayAfterDeleting);
                }
            } else {
                if (charIndex === 0) {
                    typingTextElement.textContent = prefixText;
                    typingTextElement.style.borderRight = '3px solid #61dafb';
                }
                
                if (charIndex < currentSuffix.length) {
                    typingTextElement.textContent = prefixText + currentSuffix.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(type, typingSpeed);
                } else {
                    typingTextElement.style.borderRight = 'none';
                    isDeleting = true;
                    setTimeout(type, delayAfterTyping);
                }
            }
        }
        
        typingTextElement.textContent = '';
        type();
    }
    
    function observeAnimatedElements() {
        const animatedTextElements = document.querySelectorAll('.animate-text');
        if (!animatedTextElements.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-typing');
                    }, 50);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        requestAnimationFrame(() => {
            animatedTextElements.forEach(element => {
                observer.observe(element);
            });
        });
    }
});