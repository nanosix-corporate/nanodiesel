/* ============================
   N6 Diesel Nano Additive
   Main JavaScript
   ============================ */

/* ============================
   Lenis Smooth Scroll Initialization
   ============================ */
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Handle smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href.startsWith("#")) {
            e.preventDefault();

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('opacity-0')) {
                closeMobileMenu();
            }

            lenis.scrollTo(href, {
                offset: -100, // Offset for the fixed header
                duration: 1.5,
            });
        }
    });
});

/* ============================
   Mobile Menu Functions
   ============================ */
function openMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
    menu.classList.add('opacity-100', 'translate-y-0');
    document.body.style.overflow = 'hidden';
    lenis.stop();
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
    menu.classList.remove('opacity-100', 'translate-y-0');
    document.body.style.overflow = '';
    lenis.start();
}

document.getElementById('menu-toggle')?.addEventListener('click', openMobileMenu);
document.getElementById('menu-close')?.addEventListener('click', closeMobileMenu);

/* ============================
   Modal & Event Management
   ============================ */

const modalHandlers = {
    // Shopee product URL map — keyed by data-context value on the buy button
    shopeeUrls: {
        'Nano Diesel 1 Botol (70ml)':
            'https://shopee.co.id/Aditif-Solar-Diesel-Nanodiesel-70-ml-Hemat-BBM-Performa-Mesin-Diesel-1-botol-i.1822722168.47810303561?extraParams=%7B%22display_model_id%22%3A310904832445%2C%22model_selection_logic%22%3A3%7D&sp_atk=59876c67-ee6d-4912-9c89-27b4958c005f&xptdk=59876c67-ee6d-4912-9c89-27b4958c005f',
        'Nano Diesel 2 Botol (2x70ml)':
            'https://shopee.co.id/Aditif-Solar-Diesel-Value-Pack-(2-botol)-Hemat-Bahan-Bakar-Mesin-Diesel-Optimal-Nanodiesel-70-ml-i.1822722168.46911170264?extraParams=%7B%22display_model_id%22%3A345970687066%2C%22model_selection_logic%22%3A3%7D',
        'Nano Diesel 6 Botol (6x70ml)':
            'https://shopee.co.id/Aditif-Solar-Nano-Technology-Fleet-pack-70-ml-(PAKET-HEMAT-6-BOTOL)-Hemat-Operasional-Diesel-i.1822722168.55661503493?extraParams=%7B%22display_model_id%22%3A336000605517%2C%22model_selection_logic%22%3A3%7D',
    },

    // Default Shopee store fallback
    shopeeDefault: 'https://shopee.co.id/srkhv4y1b8?originalCategoryId=11043727&page=0',

    // Tokopedia product URL map — keyed by data-context value on the buy button
    tokopediaUrls: {
        'Nano Diesel 1 Botol (70ml)':  'https://tk.tokopedia.com/ZSQdWVFJs/',
        'Nano Diesel 2 Botol (2x70ml)': 'https://tk.tokopedia.com/ZSQdWE943/',
        'Nano Diesel 6 Botol (6x70ml)': 'https://tk.tokopedia.com/ZSQdWbkyv/',
    },

    // Default Tokopedia store fallback
    tokopediaDefault: 'https://www.tokopedia.com/nanodiesel',

    openModal(modalId, context = null) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        if (modalId === 'pdfModal' && context) {
            const iframe = document.getElementById('pdfIframe');
            const title = document.getElementById('pdfModalTitle');
            const filename = context.split('/').pop().replace('.pdf', '');
            if (title) title.textContent = decodeURIComponent(filename);
            if (iframe) iframe.src = context;
        }

        // Dynamically update Shopee, Tokopedia & WhatsApp links based on context
        if (modalId === 'orderModal') {
            const shopeeLink = document.getElementById('shopeeLink');
            if (shopeeLink) {
                shopeeLink.href = context && this.shopeeUrls[context]
                    ? this.shopeeUrls[context]
                    : this.shopeeDefault;
            }

            const tokopediaLink = document.getElementById('tokopediaLink');
            if (tokopediaLink) {
                tokopediaLink.href = context && this.tokopediaUrls[context]
                    ? this.tokopediaUrls[context]
                    : this.tokopediaDefault;
            }

            const whatsappLink = document.getElementById('whatsappLink');
            if (whatsappLink) {
                const productName = context || 'Nano Diesel';
                const waText = encodeURIComponent(`Halo Nano Diesel, saya ingin memesan ${productName}`);
                whatsappLink.href = `https://wa.me/6282134567890?text=${waText}`;
            }
        }

        modal.classList.remove('opacity-0', 'pointer-events-none');
        lenis.stop();
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.add('opacity-0', 'pointer-events-none');
        lenis.start();

        if (modalId === 'pdfModal') {
            const iframe = document.getElementById('pdfIframe');
            if (iframe) {
                setTimeout(() => { iframe.src = ''; }, 300);
            }
        }
    }
};

// Global Event Listener for data-actions
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action]');
    if (!trigger) return;

    const action = trigger.getAttribute('data-action');
    const target = trigger.getAttribute('data-target');
    const context = trigger.getAttribute('data-context');

    if (action === 'open-modal') {
        modalHandlers.openModal(target, context);
    } else if (action === 'close-modal') {
        modalHandlers.closeModal(target);
    }
});

/* ============================
   Image Optimizer & Compressor
   Compresses product images over 100KB on load
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
    const optimizeImages = document.querySelectorAll('.product-optimize');

    optimizeImages.forEach(async (img) => {
        const src = img.getAttribute('data-src');
        if (!src) return;

        try {
            // 1. Fetch the image to check size
            const response = await fetch(src);
            const blob = await response.blob();
            const sizeKB = blob.size / 1024;

            // Threshold: 100KB
            if (sizeKB > 100) {
                const bitmap = await createImageBitmap(blob);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Maintain aspect ratio while downscaling if too large
                let width = bitmap.width;
                let height = bitmap.height;
                const maxSide = 1200;
                if (width > maxSide || height > maxSide) {
                    if (width > height) {
                        height = (maxSide / width) * height;
                        width = maxSide;
                    } else {
                        width = (maxSide / height) * width;
                        height = maxSide;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(bitmap, 0, 0, width, height);

                // Export as compressed JPEG at 70% quality
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                img.src = compressedDataUrl;
                console.log(`Optimized: ${src} (${sizeKB.toFixed(1)}KB -> Compressed)`);
            } else {
                img.src = src;
                console.log(`Original: ${src} (${sizeKB.toFixed(1)}KB - Under 100KB)`);
            }
        } catch (error) {
            console.warn(`Fallback for ${src}:`, error);
            img.src = src; // Fallback to original if fetch/canvas fails
        } finally {
            // Fade in effect after load
            img.classList.remove('opacity-0');
        }
    });
});

/* ============================
   Counter Animation
   Triggered once when the Results section is scrolled into view
   ============================ */
function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const isDecimal = el.getAttribute('data-target').includes('.');

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function: easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const current = easeProgress * target;

        if (isDecimal) {
            el.textContent = current.toFixed(1);
        } else {
            el.textContent = Math.floor(current).toLocaleString('en-US');
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Ensure final value is precise
            el.textContent = isDecimal
                ? target.toFixed(1)
                : target.toLocaleString('en-US');
        }
    }

    requestAnimationFrame(update);
}

// Intersection Observer: triggers animation only once on scroll
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => animateCounter(counter));
            observer.unobserve(entry.target); // Run only once per page load
        }
    });
}, { threshold: 0.2 });

const performanceSection = document.getElementById('performance');
if (performanceSection) {
    counterObserver.observe(performanceSection);
}

/* ============================
   Security: Disable Zoom & Right-Click
   ============================ */

// Disable Right-Click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable Zoom shortcuts (Ctrl + / Ctrl - / Ctrl 0)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '0' || e.key === '+')) {
        e.preventDefault();
    }
});

// Disable Mouse Wheel Zoom (Ctrl + Scroll)
document.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });
