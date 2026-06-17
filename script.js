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

// 2. Function to animate numbers
const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
        const count = +counter.innerText;
        const increment = target / 200; // Increase 200 to make it slower

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 15); // Adjust for smoothness
        } else {
            counter.innerText = target + "+";
        }
    };
    updateCount();
};

// 3. Observer to trigger only when section is visible
const observerOptions = {
    threshold: 0.5 // Trigger when 50% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => animateCounter(counter));
            observer.unobserve(entry.target); // Run only once
        }
    });
}, observerOptions);

// Attach observer to the section
const section = document.querySelector('.counter-section');
if (section) {
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
