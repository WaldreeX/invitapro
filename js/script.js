
        lucide.createIcons();

        const menuBtn = document.getElementById('menuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('overlay');

        function toggleMenu() {
            const isActive = mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            const icon = menuBtn.querySelector('[data-lucide]');
            if (icon) {
                icon.setAttribute('data-lucide', isActive ? 'x' : 'align-right');
                lucide.createIcons();
            }
            document.body.style.overflow = isActive ? 'hidden' : 'auto';
        }

        function toggleDropdown(element) {
            const dropdown = element.parentElement;
            dropdown.classList.toggle('active');
        }

        function toggleFaq(button) {
            const item = button.parentElement;
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        }

        menuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        document.querySelectorAll('.nav-mobile a').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('active')) toggleMenu();
            });
        });

        window.addEventListener('scroll', () => {
            const header = document.getElementById('mainHeader');
            if(header) {
                header.style.background = window.scrollY > 50 ? 'rgba(2, 2, 3, 0.9)' : 'rgba(5, 5, 7, 0.7)';
            }
        });