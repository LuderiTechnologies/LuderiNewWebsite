// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', (e) => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    // Don't prevent default - let the link work normally
}));

// Initialize page
document.addEventListener('DOMContentLoaded', () => {

    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.style.background = '#475569';
        } else {
            navbar.style.background = 'transparent';
        }
    });

    // Intersection Observer for new headline section animations
    const newHeadlineSection = document.querySelector('.new-headline-section');
    const newHeadline = document.querySelector('.new-headline');
    const iconItems = document.querySelectorAll('.icon-item');

    if (newHeadlineSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate headline
                    if (newHeadline) {
                        newHeadline.classList.add('animate');
                    }
                    
                    // Animate icon items with staggered delays
                    iconItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, 300 + (index * 200)); // 300ms delay for headline, then 200ms between each box
                    });
                    
                    // Unobserve after animation to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of the section is visible
        });

        observer.observe(newHeadlineSection);
    }

    // Intersection Observer for "Today and The Future" section animations
    const todayFutureSection = document.querySelector('.section-headline');

    if (todayFutureSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the "Today and The Future" headline
                    entry.target.classList.add('animate');
                    
                    // Unobserve after animation to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3 // Trigger when 30% of the section is visible
        });

        observer.observe(todayFutureSection);
    }

    // Intersection Observer for Revolution section animations
    const revolutionSection = document.querySelector('.revolution-section');

    if (revolutionSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the entire revolution section
                    entry.target.classList.add('animate');
                    
                    // Unobserve after animation to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // Trigger when 20% of the section is visible
        });

        observer.observe(revolutionSection);
    }
});

// Expandable sections functionality
function toggleSection(sectionNumber) {
    const content = document.getElementById(`content-${sectionNumber}`);
    const header = content.previousElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    // Close all other sections first
    const allContents = document.querySelectorAll('.expandable-content');
    const allIcons = document.querySelectorAll('.toggle-icon');
    
    allContents.forEach((content, index) => {
        if (index !== sectionNumber - 1) {
            content.classList.remove('active');
            allIcons[index].textContent = '+';
        }
    });
    
    // Toggle the clicked section
    content.classList.toggle('active');
    
    // Change the icon
    if (content.classList.contains('active')) {
        icon.textContent = '-';
        icon.style.transform = 'rotate(0deg)';
    } else {
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Scroll-triggered animations
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Animate headlines
                const headlines = section.querySelectorAll('.grey-section-headline');
                headlines.forEach(headline => {
                    headline.classList.add('animate');
                });
                
                // Animate cards with delay
                const cards = section.querySelectorAll('.grey-section-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, 200 * (index + 1));
                });
                
                // Animate connection lines
                const lines = section.querySelectorAll('.connection-line');
                setTimeout(() => {
                    lines.forEach(line => {
                        line.classList.add('animate');
                    });
                }, 1000);
                
                // Only trigger once
                observer.unobserve(section);
            }
        });
    }, observerOptions);

    // Observe the black section
    const blackSection = document.querySelector('.black-section');
    if (blackSection) {
        observer.observe(blackSection);
    }
}

// What Lead Us Here section animations
function handleWhatLeadAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const section = entry.target;
                
                // Animate the main headline from left
                const mainHeadline = section.querySelector('.what-lead-headline');
                if (mainHeadline) {
                    mainHeadline.classList.add('animate');
                }
                
                // Animate expandable headers with delay
                const expandableHeaders = section.querySelectorAll('.expandable-header');
                expandableHeaders.forEach((header, index) => {
                    setTimeout(() => {
                        header.classList.add('animate');
                    }, 300 * (index + 1));
                });
                
                // Only trigger once
                observer.unobserve(section);
            }
        });
    }, observerOptions);

    // Observe the what-lead-section
    const whatLeadSection = document.querySelector('.what-lead-section');
    if (whatLeadSection) {
        observer.observe(whatLeadSection);
    }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    handleWhatLeadAnimations();
    
    // Contact Form Success Message
    const contactForm = document.querySelector('.contact-form-large');
    const successMessage = document.getElementById('success-message');
    const closeSuccessBtn = document.getElementById('close-success');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            successMessage.classList.add('show');
            
            // Reset form
            contactForm.reset();
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            successMessage.classList.remove('show');
        });
    }

    // Close success message when clicking outside
    if (successMessage) {
        successMessage.addEventListener('click', function(e) {
            if (e.target === successMessage) {
                successMessage.classList.remove('show');
            }
        });
    }
});
