// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        // Show/hide back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (scrollPosition > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Update active nav link
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavLink('#' + sectionId);
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Function to update active nav link
    function updateActiveNavLink(targetId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Add scroll animations to elements
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0, 0)';
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initialize fade-in elements
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Add hover effect to work cards
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(37, 99, 235, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--gray-light)';
        });
    });
    
    // Image error handling with better fallback
    const images = document.querySelectorAll('img');
    const profileFallback = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    const secondaryFallback = 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            if (this.classList.contains('profile-photo')) {
                this.src = profileFallback;
            } else if (this.classList.contains('secondary-photo')) {
                this.src = secondaryFallback;
            }
        });
    });
    
    // Add animation to the logo on hover
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add typing effect simulation to the hero tagline (optional)
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const text = heroTagline.textContent;
        heroTagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Add click effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});