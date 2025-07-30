// Neural Portfolio JavaScript
class NeuralPortfolio {
    constructor() {
        this.isIntroSkipped = localStorage.getItem('introSkipped') === 'true';
        this.currentSection = 'home';
        this.typingTexts = [
            'Lancement de la synchronisation neuronale...',
            'Analyse du réseau cognitif en cours...',
            'Profil détecté : Bahae Aouanet',
            'Statut : Ingénieur informatique full stack',
            'Ouverture de l\'archive mentale...',
            'Accès autorisé ✓'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isTyping = false;
        
        this.skillsData = {
            'React': { level: 95, years: '4 ans', description: 'Framework JavaScript moderne pour interfaces utilisateur dynamiques et réactives.' },
            'Vue.js': { level: 90, years: '3 ans', description: 'Framework progressif pour applications web interactives et performantes.' },
            'JavaScript': { level: 98, years: '6 ans', description: 'Langage de programmation polyvalent, maîtrise ES6+ et concepts avancés.' },
            'TypeScript': { level: 92, years: '3 ans', description: 'Superset de JavaScript avec typage statique pour code plus robuste.' },
            'Node.js': { level: 94, years: '4 ans', description: 'Runtime JavaScript côté serveur pour applications full stack.' },
            'Python': { level: 88, years: '3 ans', description: 'Langage polyvalent pour développement web, IA et automatisation.' },
            'PHP': { level: 85, years: '4 ans', description: 'Langage serveur pour développement web et applications dynamiques.' },
            'Express': { level: 93, years: '4 ans', description: 'Framework web minimaliste et flexible pour Node.js.' },
            'MongoDB': { level: 90, years: '3 ans', description: 'Base de données NoSQL pour applications modernes et scalables.' },
            'PostgreSQL': { level: 87, years: '3 ans', description: 'Système de gestion de base de données relationnelle avancé.' },
            'MySQL': { level: 85, years: '4 ans', description: 'Base de données relationnelle populaire et fiable.' },
            'Docker': { level: 89, years: '2 ans', description: 'Plateforme de conteneurisation pour déploiements cohérents.' },
            'AWS': { level: 82, years: '2 ans', description: 'Services cloud Amazon pour infrastructure scalable.' },
            'Git': { level: 96, years: '5 ans', description: 'Système de contrôle de version distribué, workflows avancés.' },
            'React Native': { level: 88, years: '2 ans', description: 'Framework pour applications mobiles cross-platform.' },
            'Flutter': { level: 80, years: '1 an', description: 'SDK Google pour applications mobiles et web.' }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initAOS();
        
        if (this.isIntroSkipped) {
            this.skipIntro();
        } else {
            this.startIntroSequence();
        }
        
        this.setupNavigation();
        this.setupSkillsOrbit();
        this.setupProjectFilters();
        this.setupContactForm();
        this.addSoundEffects();
        
        // Initialize other components
        this.setupScrollEffects();
        this.setupParticleEffects();
    }
    
    setupEventListeners() {
        // Intro controls
        const enterBtn = document.getElementById('enter-interface');
        const skipBtn = document.getElementById('skip-intro');
        
        if (enterBtn) {
            enterBtn.addEventListener('click', () => this.enterInterface());
        }
        
        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.skipIntro());
        }
        
        // Window events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Download CV
        const downloadCV = document.getElementById('download-cv');
        if (downloadCV) {
            downloadCV.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadCV();
            });
        }
    }
    
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100
            });
        }
    }
    
    startIntroSequence() {
        const introElement = document.getElementById('neural-intro');
        if (!introElement) return;
        
        // Add particles animation
        this.createIntroParticles();
        
        // Start typing animation after delay
        setTimeout(() => {
            this.startTyping();
        }, 2000);
        
        // Auto-enter after typing completes
        setTimeout(() => {
            if (!this.isIntroSkipped) {
                this.enterInterface();
            }
        }, 12000);
    }
    
    createIntroParticles() {
        const particlesContainer = document.querySelector('.neural-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'intro-particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--neural-primary);
                border-radius: 50%;
                pointer-events: none;
                animation: introParticleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 10px var(--neural-primary);
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Add particle animation keyframes
        if (!document.getElementById('intro-particles-style')) {
            const style = document.createElement('style');
            style.id = 'intro-particles-style';
            style.textContent = `
                @keyframes introParticleFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    50% { transform: translateY(-${20 + Math.random() * 30}px) rotate(180deg); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    startTyping() {
        const typedElement = document.getElementById('typed-text');
        if (!typedElement || this.isTyping) return;
        
        this.isTyping = true;
        this.typeText(typedElement);
    }
    
    typeText(element) {
        if (this.currentTextIndex >= this.typingTexts.length) {
            this.isTyping = false;
            return;
        }
        
        const currentText = this.typingTexts[this.currentTextIndex];
        
        if (this.currentCharIndex < currentText.length) {
            element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            setTimeout(() => this.typeText(element), 50 + Math.random() * 50);
        } else {
            setTimeout(() => {
                this.currentTextIndex++;
                this.currentCharIndex = 0;
                if (this.currentTextIndex < this.typingTexts.length) {
                    element.textContent = '';
                    setTimeout(() => this.typeText(element), 800);
                } else {
                    this.isTyping = false;
                }
            }, 1500);
        }
    }
    
    enterInterface() {
        const intro = document.getElementById('neural-intro');
        const portfolio = document.getElementById('main-portfolio');
        
        if (intro && portfolio) {
            intro.classList.add('fade-out');
            setTimeout(() => {
                intro.style.display = 'none';
                portfolio.classList.add('active');
                document.body.style.overflow = 'auto';
            }, 600);
        }
        
        localStorage.setItem('introSkipped', 'true');
        this.isIntroSkipped = true;
    }
    
    skipIntro() {
        this.isIntroSkipped = true;
        this.enterInterface();
    }
    
    setupNavigation() {
        const navbar = document.querySelector('.neural-nav');
        if (!navbar) return;
        
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    handleNavClick(e) {
        const link = e.target;
        const targetId = link.getAttribute('href')?.replace('#', '');
        
        if (targetId) {
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            link.classList.add('active');
            
            this.currentSection = targetId;
        }
    }
    
    handleScroll() {
        const navbar = document.querySelector('.neural-nav');
        const scrolled = window.scrollY > 50;
        
        if (navbar) {
            navbar.classList.toggle('scrolled', scrolled);
        }
        
        // Update active section
        this.updateActiveSection();
    }
    
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                
                this.currentSection = sectionId;
            }
        });
    }
    
    handleResize() {
        // Adjust orbital positions on resize
        this.setupSkillsOrbit();
    }
    
    setupSkillsOrbit() {
        const skillNodes = document.querySelectorAll('.skill-node');
        const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
        
        // Add click handlers for skill nodes
        skillNodes.forEach(node => {
            node.addEventListener('click', () => {
                const skillName = node.getAttribute('data-skill');
                const skillLevel = node.getAttribute('data-level');
                this.showSkillDetails(skillName, skillLevel);
            });
            
            node.addEventListener('mouseenter', () => {
                node.style.transform = 'scale(1.1)';
                node.style.zIndex = '10';
            });
            
            node.addEventListener('mouseleave', () => {
                node.style.transform = 'scale(1)';
                node.style.zIndex = '1';
            });
        });
        
        // Filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.filterSkills(filter);
                
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    showSkillDetails(skillName, skillLevel) {
        const skillData = this.skillsData[skillName];
        if (!skillData) return;
        
        const detailsCard = document.getElementById('skill-details');
        const nameElement = document.getElementById('skill-name');
        const progressElement = document.getElementById('skill-progress');
        const percentageElement = document.getElementById('skill-percentage');
        const descriptionElement = document.getElementById('skill-description');
        const yearsElement = document.getElementById('skill-years');
        
        if (nameElement) nameElement.textContent = skillName;
        if (descriptionElement) descriptionElement.textContent = skillData.description;
        if (yearsElement) yearsElement.textContent = skillData.years;
        if (percentageElement) percentageElement.textContent = `${skillData.level}%`;
        
        if (progressElement) {
            progressElement.style.width = '0%';
            setTimeout(() => {
                progressElement.style.width = `${skillData.level}%`;
            }, 300);
        }
        
        if (detailsCard) {
            detailsCard.style.opacity = '0';
            setTimeout(() => {
                detailsCard.style.opacity = '1';
            }, 200);
        }
    }
    
    filterSkills(filter) {
        const skillNodes = document.querySelectorAll('.skill-node');
        
        skillNodes.forEach(node => {
            if (filter === 'all') {
                node.style.display = 'flex';
                node.style.opacity = '1';
            } else {
                const nodeClasses = node.classList;
                if (nodeClasses.contains(filter)) {
                    node.style.display = 'flex';
                    node.style.opacity = '1';
                } else {
                    node.style.opacity = '0.3';
                }
            }
        });
    }
    
    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        if (card.classList.contains(filter)) {
                            card.style.display = 'block';
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        } else {
                            card.style.opacity = '0.3';
                            card.style.transform = 'scale(0.95)';
                        }
                    }
                });
                
                // Re-trigger AOS animations for visible cards
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            });
        });
    }
    
    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
        
        // Add input focus effects
        const formControls = form.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.addEventListener('focus', () => {
                this.playSound('input-focus');
            });
            
            control.addEventListener('input', () => {
                this.playSound('input-type');
            });
        });
    }
    
    async handleFormSubmit(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission
            await this.simulateFormSubmission(new FormData(form));
            
            // Success state
            this.showFormSuccess();
            form.reset();
            
        } catch (error) {
            // Error state
            this.showFormError(error.message);
            
        } finally {
            // Reset button state
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 2000);
        }
    }
    
    async simulateFormSubmission(formData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) {
            return { success: true };
        } else {
            throw new Error('Erreur de transmission réseau');
        }
    }
    
    showFormSuccess() {
        this.createNotification('Message transmis avec succès! Réponse dans les 2h.', 'success');
        this.playSound('success');
    }
    
    showFormError(message) {
        this.createNotification(`Erreur: ${message}`, 'error');
        this.playSound('error');
    }
    
    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `neural-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? 'rgba(46, 204, 113, 0.9)' : 'rgba(231, 76, 60, 0.9)'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            border-left: 4px solid ${type === 'success' ? '#2ecc71' : '#e74c3c'};
            backdrop-filter: blur(10px);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    downloadCV() {
        // Create a simple CV content for demo
        const cvContent = `
BAHAE AOUANET
Ingénieur Informatique Full Stack

Email: bahae.aouanet@email.com
LinkedIn: linkedin.com/in/bahae-aouanet
GitHub: github.com/bahae-aouanet

COMPÉTENCES TECHNIQUES
• Frontend: React, Vue.js, JavaScript, TypeScript
• Backend: Node.js, Python, PHP, Express.js
• Bases de données: MongoDB, PostgreSQL, MySQL
• Cloud & DevOps: AWS, Docker, Kubernetes
• Mobile: React Native, Flutter

EXPÉRIENCE PROFESSIONNELLE
Lead Full Stack Developer - TechCorp Solutions (2022-Présent)
• Direction technique d'une équipe de 8 développeurs
• Architecture de solutions cloud-native
• +40% d'amélioration des performances

Senior Full Stack Developer - InnovateLab (2020-2022)
• Développement d'applications web complexes
• Optimisation de performance (-60% temps de chargement)
• Formation de 5 développeurs juniors

FORMATION
Ingénieur en Informatique - École Nationale Supérieure (2015-2018)
Mention Très Bien, Prix innovation

CERTIFICATIONS
• AWS Solutions Architect
• Cybersécurité Avancée
• Machine Learning
        `;
        
        const blob = new Blob([cvContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Bahae_Aouanet_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.createNotification('CV téléchargé avec succès!', 'success');
        this.playSound('download');
    }
    
    addSoundEffects() {
        // Create audio context for sound effects
        this.audioContext = null;
        this.sounds = {};
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
        } catch (error) {
            console.log('Audio context not supported');
        }
    }
    
    createSounds() {
        if (!this.audioContext) return;
        
        // Create simple synthetic sounds
        this.sounds = {
            'input-focus': this.createBeep(800, 0.1, 0.1),
            'input-type': this.createBeep(400, 0.05, 0.05),
            'success': this.createBeep(600, 0.2, 0.3),
            'error': this.createBeep(300, 0.3, 0.5),
            'download': this.createBeep(500, 0.15, 0.2)
        };
    }
    
    createBeep(frequency, duration, volume) {
        return () => {
            if (!this.audioContext) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }
    
    playSound(soundName) {
        if (this.sounds[soundName] && this.audioContext?.state === 'running') {
            try {
                this.sounds[soundName]();
            } catch (error) {
                console.log('Sound playback failed:', error);
            }
        }
    }
    
    setupScrollEffects() {
        // Parallax effect for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const parallaxElements = document.querySelectorAll('.neural-dataflow');
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
        
        // Scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.timeline-item, .project-card, .service-module').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupParticleEffects() {
        // Add floating particles to background
        this.createBackgroundParticles();
    }
    
    createBackgroundParticles() {
        const particleCount = 50;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            particle.style.cssText = `
                position: fixed;
                width: 2px;
                height: 2px;
                background: var(--neural-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                opacity: ${0.1 + Math.random() * 0.3};
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
            `;
            
            document.body.appendChild(particle);
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
        
        // Animate particles
        this.animateParticles(particles);
    }
    
    animateParticles(particles) {
        function animate() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around screen
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new NeuralPortfolio();
    
    // Expose to global scope for debugging
    window.neuralPortfolio = portfolio;
});

// Additional utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Service Worker registration for offline capability
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .bg-particle {
        animation: particleDrift 20s linear infinite;
    }
    
    @keyframes particleDrift {
        0% { transform: translateX(0) translateY(0); }
        25% { transform: translateX(10px) translateY(-10px); }
        50% { transform: translateX(-5px) translateY(-20px); }
        75% { transform: translateX(-10px) translateY(-10px); }
        100% { transform: translateX(0) translateY(0); }
    }
`;
document.head.appendChild(style);