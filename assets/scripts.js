    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    
    function toggleMenu() {
        navLinks.classList.toggle('active');
        // Update hamburger icon
        const icon = hamburger.querySelector('ion-icon');
        if(navLinks.classList.contains('active')) {
            // Menu is open, we can hide the hamburger if we want, or leave it
            // Logic handled by css largely
        } else {
            // Menu is closed
        }
    }
    
    hamburger.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- Dark Mode ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('ion-icon');
    const mobileThemeIcon = mobileThemeToggle.querySelector('ion-icon');
    const html = document.documentElement;

    const siteLogo = document.getElementById("siteLogo");

    function updateLogo(theme) {
      if (theme === "dark") {
        siteLogo.src = "resources/logo_dark.png";
      } else {
        siteLogo.src = "resources/logo_light.png";
      }
    }


    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        html.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);
        updateLogo(currentTheme);
    }

    function toggleTheme() {
        let theme = html.getAttribute('data-theme');
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateIcon('light');
            updateLogo("light");
        } else {
            html.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateIcon('dark');
            updateLogo("dark");
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);

    function updateIcon(theme) {
        if (theme === 'dark') {
            themeIcon.setAttribute('name', 'sunny-outline');
            mobileThemeIcon.setAttribute('name', 'sunny-outline');
            mobileThemeToggle.innerHTML = '<ion-icon name="sunny-outline" style="margin-right: 8px;"></ion-icon> Light Mode';
        } else {
            themeIcon.setAttribute('name', 'moon-outline');
            mobileThemeIcon.setAttribute('name', 'moon-outline');
            mobileThemeToggle.innerHTML = '<ion-icon name="moon-outline" style="margin-right: 8px;"></ion-icon> Dark Mode';
        }
    }

    // --- Modal Logic ---
    const modal = document.getElementById('rentalModal');
    const carInput = document.getElementById('carInput');

    window.openModal = function(carName) {
        carInput.value = carName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Also close menu if open
        navLinks.classList.remove('active');
    }

    window.closeModal = function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- FAQ Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // --- Stats Animation Logic ---
    const statsSection = document.getElementById('statsSection');
    const stats = document.querySelectorAll('.stat-item h3');
    let animated = false;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const increment = target / 100; // Speed adjustment
            
            const updateCount = () => {
                const count = +stat.innerText;
                if(count < target) {
                    stat.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20);
                } else {
                    stat.innerText = target + "+";
                }
            }
            updateCount();
        });
    }

    // Intersection Observer to trigger animation when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);

