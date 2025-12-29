// Navegación móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const header = document.getElementById('header');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Cambiar color del header al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Ajustar el padding-top del hero para compensar la altura del header fijo
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    if (hero && header) {
        const headerHeight = header.offsetHeight;
        hero.style.paddingTop = `calc(180px + ${headerHeight}px)`;
        hero.style.marginTop = `-${headerHeight}px`;
    }
    
    // Configurar autocompletado del formulario
    setupFormAutofill();
    
    // Manejar parámetros de URL
    handleUrlParameters();
    
    // Inicializar FAQ
    initFAQ();
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('serviceSelect').value;
        const message = document.getElementById('message').value;
        
        // Validación básica
        if (!name || !email || !service) {
            alert('Por favor, completa los campos obligatorios (Nombre, Email y Servicio)');
            return;
        }
        
        // Simulación de envío (en un caso real, aquí iría una petición AJAX)
        console.log('Formulario enviado:', { name, email, phone, service, message });
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por contactarnos! Te responderemos en menos de 24 horas.');
        
        // Resetear formulario
        contactForm.reset();
    });
}

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Ajustar la posición considerando el header fijo
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de aparición al hacer scroll
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

// Observar elementos para animación
document.querySelectorAll('.service-card, .plan-card').forEach(el => {
    observer.observe(el);
});

// Mostrar año actual en el footer
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.footer-copyright p');
if (yearElement) {
    yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
}

// Función para autorellenar el formulario cuando se hace clic en botones
function setupFormAutofill() {
    // Obtener todos los botones con data-service
    const planButtons = document.querySelectorAll('[data-service]');
    const serviceSelect = document.getElementById('serviceSelect');
    
    // Añadir evento a cada botón
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Solo procesar si es un enlace interno al contacto
            const href = this.getAttribute('href');
            if (href && href.startsWith('#contacto')) {
                e.preventDefault();
                
                // Obtener el valor del servicio del atributo data-service
                const serviceValue = this.getAttribute('data-service');
                
                // Verificar si el select existe
                if (serviceSelect) {
                    // Añadir clase de animación
                    serviceSelect.classList.add('autofilled');
                    
                    // Buscar la opción que coincida con el valor
                    let optionFound = false;
                    for (let option of serviceSelect.options) {
                        if (option.value === serviceValue) {
                            optionFound = true;
                            break;
                        }
                    }
                    
                    // Si se encuentra la opción, seleccionarla
                    if (optionFound) {
                        serviceSelect.value = serviceValue;
                    } else {
                        // Si no se encuentra, seleccionar "Consulta General"
                        serviceSelect.value = 'consulta';
                    }
                    
                    // Remover clase de animación después de 2 segundos
                    setTimeout(() => {
                        serviceSelect.classList.remove('autofilled');
                    }, 2000);
                    
                    // Desplazarse al formulario
                    const contactSection = document.getElementById('contacto');
                    if (contactSection) {
                        const headerHeight = document.getElementById('header').offsetHeight;
                        const targetPosition = contactSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Enfocar el primer campo del formulario después del desplazamiento
                        setTimeout(() => {
                            const firstInput = document.querySelector('#contactForm input');
                            if (firstInput) {
                                firstInput.focus();
                            }
                        }, 800);
                    }
                }
            }
        });
    });
}

// Función para manejar parámetros de URL
function handleUrlParameters() {
    // Verificar si hay un parámetro en la URL para preseleccionar un servicio
    const urlParams = new URLSearchParams(window.location.search);
    const presetService = urlParams.get('service');
    
    if (presetService) {
        const serviceSelect = document.getElementById('serviceSelect');
        if (serviceSelect) {
            // Buscar si existe la opción
            let optionFound = false;
            for (let option of serviceSelect.options) {
                if (option.value === presetService) {
                    optionFound = true;
                    break;
                }
            }
            
            // Si se encuentra, seleccionarla
            if (optionFound) {
                serviceSelect.value = presetService;
                serviceSelect.classList.add('autofilled');
                
                // Remover clase de animación después de 2 segundos
                setTimeout(() => {
                    serviceSelect.classList.remove('autofilled');
                }, 2000);
                
                // Desplazarse al formulario
                setTimeout(() => {
                    const contactSection = document.getElementById('contacto');
                    if (contactSection) {
                        const headerHeight = document.getElementById('header').offsetHeight;
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

// Función para inicializar el FAQ (acordeón mejorado)
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Abrir el primer FAQ por defecto para mejor UX
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    faqItems.forEach(item => {
        const questionHeader = item.querySelector('.faq-question-header');
        const toggle = item.querySelector('.faq-toggle');
        
        questionHeader.addEventListener('click', () => {
            // Cerrar otros items abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar el item actual
            item.classList.toggle('active');
        });
        
        // También permitir clic en el toggle
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                item.classList.toggle('active');
            });
        }
    });
}