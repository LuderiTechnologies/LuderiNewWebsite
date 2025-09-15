// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const mobileNavMenu = document.querySelector('.mobile-nav-menu');

console.log('Hamburger element:', hamburger);
console.log('Mobile nav menu element:', mobileNavMenu);

if (hamburger && mobileNavMenu) {
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked!');
        
        hamburger.classList.toggle('active');
        mobileNavMenu.classList.toggle('active');
        
        console.log('Hamburger active:', hamburger.classList.contains('active'));
        console.log('Mobile nav menu active:', mobileNavMenu.classList.contains('active'));
        
        // Prevent body scroll when menu is open
        if (mobileNavMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            console.log('Menu opened - body scroll disabled');
        } else {
            document.body.style.overflow = '';
            console.log('Menu closed - body scroll enabled');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-menu a').forEach(n => n.addEventListener('click', (e) => {
        hamburger.classList.remove('active');
        mobileNavMenu.classList.remove('active');
        document.body.style.overflow = '';
        // Don't prevent default - let the link work normally
    }));

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileNavMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu on window resize (if it becomes desktop size)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            mobileNavMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {

    // Login button routing
    const loginButtons = document.querySelectorAll('.btn-login');
    console.log('Found login buttons:', loginButtons.length);
    
    if (loginButtons.length === 0) {
        console.error('No login buttons found! Check HTML structure.');
        // Try alternative selectors
        const altButtons = document.querySelectorAll('button[class*="login"], .nav-buttons button');
        console.log('Alternative buttons found:', altButtons.length);
    }
    
    loginButtons.forEach((button, index) => {
        console.log(`Adding click listener to button ${index + 1}:`, button);
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Login button clicked, opening demo in new window...');
            window.open('https://demo.luderitechnologies.com/auth', '_blank');
        });
        
        // Add visual feedback
        button.style.cursor = 'pointer';
        button.addEventListener('mouseenter', () => {
            console.log('Mouse over login button');
        });
    });
    
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
                    
                    // Animate icon items immediately
                    iconItems.forEach((item) => {
                        item.classList.add('animate');
                    });
                    
                    // Unobserve after animation to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05 // Trigger when 5% of the section is visible
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
    
    // Dropdown menu functionality with hover delay
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        let hoverTimeout;
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
        });
        
        dropdown.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                // Small delay to allow moving to dropdown menu
            }, 100);
        });
        
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
            });
            
            dropdownMenu.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    // Small delay when leaving dropdown menu
                }, 100);
            });
        }
    });
    
    // Ensure dropdown links are clickable
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Allow normal link behavior
            console.log('Dropdown link clicked:', link.href);
        });
    });
});

// Backup login button handler (in case DOMContentLoaded doesn't work)
window.addEventListener('load', () => {
    const loginButtons = document.querySelectorAll('.btn-login');
    console.log('Backup handler - Found login buttons:', loginButtons.length);
    
    loginButtons.forEach((button, index) => {
        // Remove any existing listeners to avoid duplicates
        button.removeEventListener('click', handleLoginClick);
        button.addEventListener('click', handleLoginClick);
    });
});

function handleLoginClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Login button clicked (backup handler), opening demo in new window...');
    window.open('https://demo.luderitechnologies.com/auth', '_blank');
}

// Expandable sections functionality
function toggleSection(sectionNumber) {
    const content = document.getElementById(`content-${sectionNumber}`);
    const header = content.previousElementSibling;
    const icon = header.querySelector('.toggle-icon');
    const infoBox = document.querySelector('.info-box');
    
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
    
    // Desktop only - Expand info box when any content is shown
    if (window.innerWidth >= 769 && infoBox) {
        const hasActiveContent = Array.from(allContents).some(content => content.classList.contains('active'));
        
        if (hasActiveContent) {
            infoBox.classList.add('expanded');
        } else {
            infoBox.classList.remove('expanded');
        }
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
    
    // Contact Form Handling with AJAX
    const contactForms = document.querySelectorAll('form[id^="contact-form"]');
    const successMessage = document.getElementById('success-message');
    const closeSuccessBtn = document.getElementById('close-success');

    // Handle all contact forms
    contactForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            try {
                // Create FormData
                const formData = new FormData(form);
                
                // Submit to Formspree
                const response = await fetch('https://formspree.io/f/xjkwzqll', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    if (successMessage) {
                        successMessage.classList.add('show');
                    }
                    
                    // Reset form
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again.');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    });

    // Success message handling
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            if (successMessage) {
                successMessage.classList.remove('show');
            }
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

// Desktop Navigation Scroll Effect - Only for desktop (min-width: 769px)
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar && window.innerWidth >= 769) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleNavbarScroll);

// Handle window resize to ensure proper behavior
window.addEventListener('resize', function() {
    const navbar = document.querySelector('.navbar');
    
    // If window becomes mobile size, remove scrolled class
    if (window.innerWidth < 769 && navbar) {
        navbar.classList.remove('scrolled');
    }
    
    // Re-evaluate scroll position on resize
    handleNavbarScroll();
});

// Initial check on page load
document.addEventListener('DOMContentLoaded', handleNavbarScroll);
