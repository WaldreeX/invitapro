    <!-- Bloque de Script para Interactividad (incluyendo el nuevo toggle del drawer) -->
    
        document.addEventListener('DOMContentLoaded', () => {
            const menuButton = document.getElementById('menu-button');
            const closeButton = document.getElementById('close-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuOverlay = document.getElementById('menu-overlay');
            const navLinks = mobileMenu.querySelectorAll('a');
            const faqItems = document.querySelectorAll('.faq-item');

            /**
             * Alterna la visibilidad del menú lateral (Drawer).
             * @param {boolean} [isOpen] - Fuerza la apertura (true) o el cierre (false).
             */
            function toggleMenu(isOpen) {
                // Determina si el menú debe abrirse o cerrarse
                const isHidden = mobileMenu.classList.contains('translate-x-full');
                const shouldOpen = isOpen !== undefined ? isOpen : isHidden;

                if (shouldOpen) {
                    // Abrir Drawer: Quitar clase de ocultamiento (translate-x-full)
                    mobileMenu.classList.remove('translate-x-full');
                    mobileMenu.classList.add('translate-x-0');
                    
                    // Mostrar Overlay y hacer fade-in
                    menuOverlay.classList.remove('hidden');
                    // Pequeño delay para permitir que el 'hidden' sea removido antes de la transición de opacidad
                    setTimeout(() => menuOverlay.classList.remove('opacity-0'), 10); 
                    
                    // Iconos del header (Opción B: mantener el icono en el header)
                    document.getElementById('icon-open').classList.add('hidden');
                    document.getElementById('icon-close').classList.remove('hidden');
                    
                    // Prevenir el scroll del body
                    document.body.style.overflow = 'hidden';

                } else {
                    // Cerrar Drawer: Añadir clase de ocultamiento (translate-x-full)
                    mobileMenu.classList.remove('translate-x-0');
                    mobileMenu.classList.add('translate-x-full');

                    // Hacer fade-out del Overlay, luego ocultar
                    menuOverlay.classList.add('opacity-0');
                    // El timeout debe coincidir con la duración de la transición del menú (0.4s)
                    setTimeout(() => menuOverlay.classList.add('hidden'), 400); 

                    // Iconos del header
                    document.getElementById('icon-open').classList.remove('hidden');
                    document.getElementById('icon-close').classList.add('hidden');
                    
                    // Permitir scroll del body
                    document.body.style.overflow = '';
                }
            }
            
            // Event Listeners para el Drawer
            menuButton.addEventListener('click', () => toggleMenu());
            closeButton.addEventListener('click', () => toggleMenu(false));
            menuOverlay.addEventListener('click', () => toggleMenu(false));
            
            // Cerrar el menú después de hacer clic en un enlace (navegación interna)
            navLinks.forEach(link => link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('translate-x-full')) {
                    toggleMenu(false);
                }
            }));

            // Lógica para FAQ (Accordion)
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = question.querySelector('svg');

                question.addEventListener('click', () => {
                    const isActive = answer.classList.contains('active');

                    // Cierra todos los demás
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.querySelector('.faq-answer').classList.remove('active');
                            otherItem.querySelector('.faq-question svg').classList.remove('rotate-180');
                        }
                    });

                    // Abre o cierra el actual
                    if (isActive) {
                        answer.classList.remove('active');
                        icon.classList.remove('rotate-180');
                        answer.classList.add('hidden'); // Oculta si se cierra
                        item.classList.remove('shadow-xl'); // Sombra de resaltado
                    } else {
                        answer.classList.remove('hidden'); // Muestra antes de la transición
                        answer.classList.add('active');
                        icon.classList.add('rotate-180');
                        item.classList.add('shadow-xl'); // Sombra de resaltado
                    }
                });
            });

            // Abrir la primera pregunta por defecto (opcional)
            if (faqItems.length > 0) {
                 faqItems[0].querySelector('.faq-answer').classList.add('active');
                 faqItems[0].querySelector('.faq-question svg').classList.add('rotate-180');
                 faqItems[0].querySelector('.faq-answer').classList.remove('hidden');
                 faqItems[0].classList.add('shadow-xl');
            }
        });