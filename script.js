

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initPage, 100);
    
    function initPage() {
        startTypingAnimation();
        setupScrollAnimations();
        fadeInElements();
        addListAnimations();
    }
    
    
    function startTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
        
        const staticPrefix = "I am ";
        const roles = [
            "an AI Engineer",
            "a Computer Science Student",
            "a Software Developer",
            "a Tech Enthusiast",
            "a Problem Solver"
        ];
        
        typingElement.innerHTML = '';
        
        const prefixSpan = document.createElement('span');
        prefixSpan.className = 'typing-prefix';
        prefixSpan.textContent = staticPrefix;
        prefixSpan.style.color = '#61dafb';
        prefixSpan.style.fontWeight = '600';
        prefixSpan.style.animation = 'textPulse 2s infinite, highlightPrefix 8s infinite';
        
        const dynamicSpan = document.createElement('span');
        dynamicSpan.className = 'typing-dynamic';
        dynamicSpan.style.borderRight = '3px solid #61dafb';
        dynamicSpan.style.paddingRight = '3px';
        dynamicSpan.style.animation = 'cursorBlink 0.7s step-end infinite';
        dynamicSpan.style.color = 'rgba(255, 255, 255, 0.95)';
        dynamicSpan.style.fontWeight = '500';
        
        typingElement.appendChild(prefixSpan);
        typingElement.appendChild(dynamicSpan);
        
        // Animation settings
        let currentRoleIndex = 0;
        let isDeleting = false;
        let charIndex = 0;
        let typeSpeed = 70 + Math.random() * 40;
        let deleteSpeed = 30 + Math.random() * 20;
        let pauseAfterType = 1800;
        let pauseBeforeType = 500;
        
        function typeWriter() {
            if (!dynamicSpan) return;
            
            const currentRole = roles[currentRoleIndex];
            
            if (isDeleting) {
                if (charIndex > 0) {
                    charIndex--;
                    dynamicSpan.textContent = currentRole.substring(0, charIndex);
                    setTimeout(typeWriter, deleteSpeed);
                } else {
                    isDeleting = false;
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                    setTimeout(typeWriter, pauseBeforeType);
                }
            } else {
                if (charIndex < currentRole.length) {
                    charIndex++;
                    dynamicSpan.textContent = currentRole.substring(0, charIndex);
                    
                    const currentChar = currentRole.charAt(charIndex - 1).toLowerCase();
                    const isVowel = 'aeiou'.includes(currentChar);
                    const randomVariation = Math.random() * 80;
                    const adjustedSpeed = isVowel ? typeSpeed * 1.2 : typeSpeed * 0.8;
                    
                    setTimeout(typeWriter, adjustedSpeed + randomVariation);
                } else {
                    isDeleting = true;
                    setTimeout(typeWriter, pauseAfterType);
                }
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    function addListAnimations() {
        const listItems = document.querySelectorAll('.section li, .skill-category li');
        
        listItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 + (index * 50));
        });
    }
    
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-text');
        if (!animatedElements.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const randomDelay = 80 + Math.random() * 150;
                    
                    setTimeout(() => {
                        entry.target.classList.add('is-typing');
                    }, randomDelay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Fade in sections as user scrolls
    function fadeInElements() {
        const sections = document.querySelectorAll('.section');
        const skillCategories = document.querySelectorAll('.skill-category');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.5s ease-out, transform 0.3s ease';
            
            section.style.transitionDelay = (index * 0.05) + 's';
            
            fadeObserver.observe(section);
        });
        
        // Add separate animations for skill categories
        skillCategories.forEach((category, index) => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(15px)';
            category.style.transition = 'opacity 0.4s ease, transform 0.5s ease';
            category.style.transitionDelay = (index * 0.1) + 's';
            
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        skillObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            skillObserver.observe(category);
        });
    }
    
    // Add subtle hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.contact-item, .project-item, .interest-item, .skill-category');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (this.classList.contains('skill-category')) {
                this.style.boxShadow = '0 6px 15px rgba(97, 218, 251, 0.15)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.classList.contains('skill-category')) {
                this.style.boxShadow = '';
            }
        });
    });
});