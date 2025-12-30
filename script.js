// ============================================
// FUNCIONES PRINCIPALES
// ============================================

// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.getElementById('header');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un enlace
function closeMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

if (navMenu) {
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', closeMobileMenu));
}

// Cambiar color del header al hacer scroll
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ============================================
// SCROLL SUAVE UNIVERSAL - PARA TODOS LOS ENLACES
// ============================================

function initSmoothScroll() {
    // Seleccionar TODOS los enlaces que empiezan con #
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        // Remover event listeners previos para evitar duplicados
        link.removeEventListener('click', handleSmoothScroll);
        
        // Añadir nuevo event listener
        link.addEventListener('click', handleSmoothScroll);
    });
    
    console.log(`Scroll suave aplicado a ${allLinks.length} enlaces internos`);
}

function handleSmoothScroll(e) {
    const href = this.getAttribute('href');
    
    // Ignorar enlaces vacíos o especiales
    if (href === '#' || href === '#!' || href === '#0' || href === '') return;
    
    // Encontrar el elemento destino
    const targetElement = document.querySelector(href);
    
    if (targetElement) {
        e.preventDefault();
        
        // Cerrar menú móvil si está abierto
        closeMobileMenu();
        
        // Calcular posición con offset del header
        let offset = 80; // Offset por defecto
        
        if (header) {
            offset = header.offsetHeight;
        }
        
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        // Hacer scroll suave
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Cambiar URL sin recargar (mejor UX)
        if (history.pushState) {
            history.pushState(null, null, href);
        }
        
        // Enfocar el elemento destino para accesibilidad
        setTimeout(() => {
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
            targetElement.removeAttribute('tabindex');
        }, 1000);
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

// Ajustar el padding-top del hero para compensar la altura del header fijo
function adjustHeroPadding() {
    const hero = document.querySelector('.hero');
    if (hero && header) {
        const headerHeight = header.offsetHeight;
        hero.style.paddingTop = `calc(180px + ${headerHeight}px)`;
        hero.style.marginTop = `-${headerHeight}px`;
    }
}

// Configurar autocompletado del formulario
function setupFormAutofill() {
    const planButtons = document.querySelectorAll('[data-service]');
    const serviceSelect = document.getElementById('serviceSelect');
    
    if (!serviceSelect) return;
    
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#contacto')) {
                e.preventDefault();
                
                const serviceValue = this.getAttribute('data-service');
                
                // Añadir clase de animación
                serviceSelect.classList.add('autofilled');
                
                // Buscar y seleccionar la opción
                let optionFound = false;
                for (let option of serviceSelect.options) {
                    if (option.value === serviceValue) {
                        optionFound = true;
                        break;
                    }
                }
                
                if (optionFound) {
                    serviceSelect.value = serviceValue;
                } else {
                    serviceSelect.value = 'consulta';
                }
                
                // Remover clase de animación después de 2 segundos
                setTimeout(() => {
                    serviceSelect.classList.remove('autofilled');
                }, 2000);
                
                // Desplazarse al formulario
                const contactSection = document.getElementById('contacto');
                if (contactSection) {
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Enfocar el primer campo después del desplazamiento
                    setTimeout(() => {
                        const firstInput = document.querySelector('#contactForm input');
                        if (firstInput) {
                            firstInput.focus();
                        }
                    }, 800);
                }
            }
        });
    });
}

// Manejar parámetros de URL
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const presetService = urlParams.get('service');
    
    if (presetService) {
        const serviceSelect = document.getElementById('serviceSelect');
        if (serviceSelect) {
            let optionFound = false;
            for (let option of serviceSelect.options) {
                if (option.value === presetService) {
                    optionFound = true;
                    break;
                }
            }
            
            if (optionFound) {
                serviceSelect.value = presetService;
                serviceSelect.classList.add('autofilled');
                
                setTimeout(() => {
                    serviceSelect.classList.remove('autofilled');
                }, 2000);
                
                setTimeout(() => {
                    const contactSection = document.getElementById('contacto');
                    if (contactSection) {
                        const headerHeight = header ? header.offsetHeight : 80;
                        const targetPosition = contactSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        }
    }
}

// Inicializar FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    faqItems.forEach(item => {
        const questionHeader = item.querySelector('.faq-question-header');
        const toggle = item.querySelector('.faq-toggle');
        
        if (questionHeader) {
            questionHeader.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                item.classList.toggle('active');
            });
        }
        
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('active');
            });
        }
    });
}

// Mostrar año actual en el footer
function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-copyright p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear)
                                                     .replace('2024', currentYear)
                                                     .replace('2025', currentYear);
    }
}

// Efecto de aparición al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .plan-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// INICIALIZACIÓN CUANDO EL DOM ESTÁ LISTO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando funciones...');
    
    // Ajustar hero padding
    adjustHeroPadding();
    
    // Configurar formulario
    setupFormAutofill();
    
    // Manejar parámetros de URL
    handleUrlParameters();
    
    // Inicializar FAQ
    initFAQ();
    
    // Actualizar año copyright
    updateCopyrightYear();
    
    // Inicializar animaciones scroll
    initScrollAnimations();
    
    // INICIALIZAR SCROLL SUAVE
    initSmoothScroll();
    
    // Re-aplicar scroll suave después de un tiempo por si hay enlaces dinámicos
    setTimeout(initSmoothScroll, 1000);
    setTimeout(initSmoothScroll, 3000);
});

// ============================================
// MANEJAR ENLACES DINÁMICOS (por si acaso)
// ============================================

// Observar cambios en el DOM para aplicar scroll suave a nuevos enlaces
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                setTimeout(initSmoothScroll, 100);
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// También aplicar cuando la página termine de cargar completamente
window.addEventListener('load', function() {
    setTimeout(initSmoothScroll, 500);
});