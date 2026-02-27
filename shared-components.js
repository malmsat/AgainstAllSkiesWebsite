// Inject shared header and footer on all pages
(function() {
    // Insert header at the beginning of body
    var headerHTML = `<header>
    <div class="header-left">
        <div class="company-logo">
            <a href="index.html">
                <img src="img/company-logo.png" alt="Company Logo" class="company-logo">
            </a>
        </div>
        <div class="social-icons">
            <a href="https://www.youtube.com/@AgainstAllSkies" target="_blank">
                <img src="img/Youtube_Logo.png" alt="YouTube">
            </a>
            <a href="https://www.instagram.com/againstallskies/" target="_blank">
                <img src="img/Instagram_Logo.png" alt="Instagram">
            </a>
            <a href="https://www.tiktok.com/@against_all_skies" target="_blank">
                <img src="img/Tiktok_Logo-w.png" alt="TikTok">
            </a>
            <a href="https://bsky.app/profile/againstallskies.bsky.social" target="_blank">
                <img src="img/Bluesky_Logo.png" alt="Bluesky">
            </a>
        </div>
    </div>
        <div class="header-actions">
            <a href="press.html">
                <img src="img/presskit-button.png" alt="Press Kit">
            </a>
            <a href="https://store.steampowered.com/app/3938910/Against_All_Skies/" target="_blank">
                <img src="img/wishlist-button.png" alt="Wishlist on Steam">
            </a>
        </div>
    </div>
</header>`;

    var footerHTML = `<footer class="site-footer">
    <p class="footer-fontcolor">
        © 2026 Magonia Entertainment. All rights reserved.
        <span class="footer-separator">•</span>
        <a href="terms.html">Privacy Policy</a>
    </p>
</footer>`;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectComponents);
    } else {
        injectComponents();
    }

    function injectComponents() {
        // Inject header if not already present
        if (!document.querySelector('header')) {
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
        }

        // Inject footer if not already present
        if (!document.querySelector('footer')) {
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }

        // Add padding to body only if there's no hero section (hero naturally sits under fixed header)
        var hero = document.querySelector('.hero');
        if (!hero) {
            document.body.style.paddingTop = '60px';
        }
    }
})();

// Swap Follow Us icons between black and red version on hover
(function(){
    function setupFollowIconSwap() {
        document.querySelectorAll('.follow-row a').forEach(function(link){
            var img = link.querySelector('img');
            if (!img) return;
            
            var originalSrc = img.src.replace(/(-r|-b)?\.png$/, '.png'); // Get base filename
            var blackSrc = originalSrc.replace(/\.png$/, '-b.png');
            var redSrc = originalSrc.replace(/\.png$/, '-r.png');
            
            // Set to black version initially
            img.src = blackSrc;
            
            link.addEventListener('mouseenter', function(){
                img.src = redSrc;
            });
            link.addEventListener('mouseleave', function(){
                img.src = blackSrc;
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupFollowIconSwap);
    } else {
        setupFollowIconSwap();
    }
})();

// Scroll reveal for elements inside .scroll-content
(function(){
    function setupScrollReveal() {
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.scroll-content .section-inner > *').forEach(function(el){ el.classList.add('show'); });
            return;
        }

        var observer = new IntersectionObserver(function(entries, obs){
            entries.forEach(function(entry){
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var delay = parseInt(el.dataset.revealDelay || 0, 10);
                setTimeout(function(){
                    el.classList.add('show');
                }, delay);
                obs.unobserve(el);
            });
        }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

        document.querySelectorAll('.scroll-content .section-inner').forEach(function(container){
            var children = Array.from(container.children);
            children.forEach(function(child, i){
                if (child.classList.contains('no-reveal')) return;
                child.classList.add('reveal');
                child.dataset.revealDelay = (i * 80).toString();
                observer.observe(child);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupScrollReveal);
    } else {
        setupScrollReveal();
    }
})();

// Toggle footer-fixed when user is at (or near) the bottom of the page
(function() {
    var footer = document.querySelector('.site-footer');
    if (!footer) return;

    function checkFooter() {
        var threshold = 8;
        var scrolledToBottom = (window.innerHeight + window.pageYOffset) >= (document.documentElement.scrollHeight - threshold);
        if (scrolledToBottom) {
            footer.classList.add('footer-fixed');
        } else {
            footer.classList.remove('footer-fixed');
        }
    }

    window.addEventListener('scroll', checkFooter, {passive: true});
    window.addEventListener('resize', checkFooter);
    window.addEventListener('orientationchange', checkFooter);
    document.addEventListener('DOMContentLoaded', checkFooter);
    checkFooter();
})();
