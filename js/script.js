document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            if (mainNav.classList.contains('show')) {
                mainNav.style.display = 'block';
            } else {
                mainNav.style.display = '';
            }
        });
    }
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Изменение стиля навигации при прокрутке
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // FAQ секция - открытие/закрытие ответов
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                
                // Закрываем все другие открытые элементы
                document.querySelectorAll('.faq-item.active').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                        const icon = item.querySelector('.faq-toggle i');
                        if (icon) {
                            icon.className = 'fas fa-plus';
                        }
                    }
                });
                
                // Переключаем текущий элемент
                faqItem.classList.toggle('active');
                
                // Меняем иконку
                const icon = this.querySelector('.faq-toggle i');
                if (icon) {
                    if (faqItem.classList.contains('active')) {
                        icon.className = 'fas fa-minus';
                    } else {
                        icon.className = 'fas fa-plus';
                    }
                }
            });
        });
    }
    
    // Простой слайдер для отзывов (можно заменить на полноценный слайдер)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 1) {
        // Добавляем кнопки навигации
        const testimonialSection = document.querySelector('.testimonials-slider');
        const navButtons = document.createElement('div');
        navButtons.className = 'testimonial-nav';
        
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '←';
        prevBtn.className = 'testimonial-prev';
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '→';
        nextBtn.className = 'testimonial-next';
        
        navButtons.appendChild(prevBtn);
        navButtons.appendChild(nextBtn);
        
        if (testimonialSection) {
            testimonialSection.appendChild(navButtons);
            
            // Инициализация отображения
            updateTestimonialVisibility();
            
            // Обработчики кнопок
            prevBtn.addEventListener('click', showPrevTestimonial);
            nextBtn.addEventListener('click', showNextTestimonial);
        }
    }
    
    function showPrevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonialVisibility();
    }
    
    function showNextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonialVisibility();
    }
    
    function updateTestimonialVisibility() {
        testimonials.forEach((testimonial, index) => {
            if (window.innerWidth < 768) {
                // На мобильных - показываем только текущий отзыв
                testimonial.style.display = index === currentTestimonial ? 'block' : 'none';
            } else {
                // На десктопе - показываем все отзывы
                testimonial.style.display = 'block';
            }
        });
    }
    
    // Обновляем отображение при изменении размера окна
    window.addEventListener('resize', updateTestimonialVisibility);
}); 