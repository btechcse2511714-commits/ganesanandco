const supabaseUrl = 'https://fscopxowuuykbmjshsff.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzY29weG93dXV5a2Jtampoc2ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MDMwODIsImV4cCI6MjA2OTQ3OTA4Mn0.gq9fH576qjN0_6j2d-Uo5U-J96v7652l9L-L3132s9k';

async function fetchLatestNews() {
    try {
        const { data, error } = await supabase.from('news_updates').select('*').order('created_at', { ascending: false }).limit(3);
        if (error) throw error;

        const container = document.querySelector('.news-container');
        if (!container) return;

        container.innerHTML = '';
        if (!data || data.length === 0) {
            container.innerHTML = '<p>No news updates yet.</p>';
            return;
        }

        data.forEach(item => {
            const element = document.createElement('div');
            element.className = 'news-card';
            element.innerHTML = `
                <span class="date">${new Date(item.created_at).toLocaleDateString()}</span>
                <h3>${item.title}</h3>
                <p>${item.content}</p>
                ${item.link ? `<a href="${item.link}" target="_blank" class="read-more">Read More →</a>` : ''}
            `;
            container.appendChild(element);
        });
    } catch (err) {
        console.error('Error fetching news:', err);
    }
}

// Initialize Supabase and fetch news on load
window.addEventListener('load', () => {
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
    fetchLatestNews();
    console.log("Ganesan and Company - Website Loaded");
});

/*typing*/
const textElement = document.getElementById('typing-text');
const services = ["Virtual CFO Services", "Taxation Services", "Accounting Services", "Audit & Assurance Services", "MCA Compliance & Certifications"];
let serviceIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentService = services[serviceIndex];

    if (isDeleting) {
        textElement.textContent = currentService.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentService.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentService.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        serviceIndex = (serviceIndex + 1) % services.length;
    }

    setTimeout(type, typeSpeed);
}

// Initialize
document.addEventListener('DOMContentLoaded', type);

/*countdown*/
// 1. Select all counter elements
const counters = document.querySelectorAll('.counter');

// 2. Function to animate numbers using requestAnimationFrame (smooth, scroll-triggered)
const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 1600; // ms
    const startTime = performance.now();

    const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = Math.round(eased * target);
        counter.innerText = value;

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            counter.innerText = target + "+";
        }
    };
    requestAnimationFrame(step);
};

// 3. Observer to trigger the count-up as soon as the section scrolls into view
const observerOptions = {
    threshold: 0.25, // Trigger once a quarter of the section is visible
    rootMargin: "0px 0px -10% 0px"
};

let countersAnimated = false;

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            counters.forEach(counter => animateCounter(counter));
            observer.unobserve(entry.target); // Run only once per page view
        }
    });
}, observerOptions);

// Attach observer to the section
const section = document.querySelector('.counter-section');
if (section && counters.length) {
    observer.observe(section);
}

/*teams*/
/* teams - Improved Observer */
/* teams - Robust Animation Trigger */
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target); // Run animation once
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => observer.observe(item));
});

/*what we do*/
function showContent(id) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Show selected content
    document.getElementById(id).classList.add('active');
    // Highlight clicked button
    event.currentTarget.classList.add('active');
}

/*services dropdown*/
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.nav-dropdown');
    const trigger = document.querySelector('.nav-dropdown-trigger');
    if (!dropdown || !trigger) return;

    trigger.addEventListener('click', (e) => {
        if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 900) {
            e.preventDefault();
            const isOpen = dropdown.classList.toggle('open');
            trigger.setAttribute('aria-expanded', isOpen);
        }
    });

    document.querySelectorAll('.nav-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            dropdown.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        }
    });
});

/*chatbot widget*/
document.addEventListener('DOMContentLoaded', () => {
    const widget = document.querySelector('.chatbot-widget');
    const fab = document.getElementById('chatbotFab');
    const closeBtn = document.getElementById('chatbotClose');
    const body = document.getElementById('chatbotBody');
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatbotInput');

    if (!widget || !fab) return;

    const toggleChat = (open) => {
        const shouldOpen = open !== undefined ? open : !widget.classList.contains('open');
        widget.classList.toggle('open', shouldOpen);
        fab.setAttribute('aria-label', shouldOpen ? 'Close chat' : 'Open chat');
        if (shouldOpen) input.focus();
    };

    fab.addEventListener('click', () => toggleChat());
    closeBtn.addEventListener('click', () => toggleChat(false));

    document.querySelectorAll('.chatbot-quick-links button').forEach(btn => {
        btn.addEventListener('click', () => {
            const hash = btn.dataset.target;
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Not on the homepage (e.g. a service detail page) — navigate there instead.
                const onServicesPage = window.location.pathname.includes('/services/');
                window.location.href = (onServicesPage ? '../index.html' : 'index.html') + hash;
            }
            toggleChat(false);
        });
    });

    const addMessage = (text, from) => {
        const msg = document.createElement('div');
        msg.className = `chatbot-message ${from}`;
        msg.textContent = text;
        body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    };

    const getReply = (text) => {
        const t = text.toLowerCase();
        if (t.includes('service')) return "We offer Virtual CFO, Taxation, Accounting and Audit & Assurance services. Tap 'Services' above to explore.";
        if (t.includes('contact') || t.includes('phone') || t.includes('call')) return "You can reach us at +91 9443716611 or contact@ganesan.in. Tap 'Contact' to see our offices.";
        if (t.includes('team')) return "Meet our team by tapping 'Team' above.";
        if (t.includes('about')) return "We've been a trusted CA firm since 1971. Tap 'About' to learn more.";
        return "Thanks for your message! Use the quick links above to navigate, or ask about our services, team or contact details.";
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        setTimeout(() => addMessage(getReply(text), 'bot'), 400);
    });
});

/*contact*/
function switchLocation(locationId) {
    // 1. Remove active highlights from all cards
    document.querySelectorAll('.location-card').forEach(card => {
        card.classList.remove('active');
    });

    // 2. Hide all maps
    document.querySelectorAll('.map-frame').forEach(map => {
        map.classList.remove('active');
    });

    // 3. Highlight clicked location card
    const selectedCard = event.currentTarget;
    if (selectedCard) selectedCard.classList.add('active');

    // 4. Reveal targeted map frame
    const targetMap = document.getElementById(`map-${locationId}`);
    if (targetMap) targetMap.classList.add('active');
}
