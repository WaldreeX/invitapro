        function toggleDropdown(element, event) {
            event.stopPropagation();
            element.classList.toggle('active');
        }

        const menuBtn = document.getElementById('menu-btn');
        const closeMenuBtn = document.getElementById('close-menu-btn');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileMenuContent = document.getElementById('mobile-menu-content');
        const whatsappBtn = document.getElementById('whatsapp-btn');

        function openMenu() {
            mobileMenuOverlay.classList.add('open');
            whatsappBtn.classList.add('invisible');
            document.body.style.overflow = 'hidden'; // Evita scroll
        }

        function closeMenu() {
            mobileMenuOverlay.classList.remove('open');
            setTimeout(() => {
                whatsappBtn.classList.remove('invisible');
            }, 300);
            document.body.style.overflow = 'auto';
        }

        // Abrir menú
        menuBtn.addEventListener('click', openMenu);

        // Cerrar menú con botón X
        closeMenuBtn.addEventListener('click', closeMenu);

        // Cerrar menú al hacer clic fuera del contenido (en el overlay)
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });

        // Cerrar menú al hacer clic en un link
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('load', () => setTimeout(() => whatsappBtn.classList.add('visible'), 8000));