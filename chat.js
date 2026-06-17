/* Preloader & Navbar Synchronization */

window.addEventListener('load', () => {
    // 1. Wait for the CSS animation duration (2.5s delay + 1s fadeOut)
    // We set a small buffer to ensure the preloader is fully hidden
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }

        // Optional: Add a class to body to enable scroll if you disabled it
        document.body.style.overflow = 'auto';

        console.log("Preloader hidden, site ready.");
    }, 3500); // 3500ms matches your CSS animation timing
});

// Optional: Add a simple scroll effect for the navbar
// This adds a background color change when user scrolls down
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(253, 251, 247, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(253, 251, 247, 0.7)';
    }
});

/*chat*/
// Function to handle "Enter" key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleChat();
    }
}

async function handleChat() {
    const inputField = document.getElementById('user-input');
    const query = inputField.value.trim().toLowerCase();
    const chatWindow = document.getElementById('chat-window');

    if (!query) return;

    // Display User Message
    chatWindow.innerHTML += `<div class="user-message"><strong>Client:</strong> ${inputField.value}</div>`;
    inputField.value = ""; // Clear input

    // Logic: Navigate Home if "back" is typed
    if (query === 'back') {
        addBotMessage("Navigating back to Home...");
        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
        return;
    }

    // Simulate "Typing" animation
    const typing = document.createElement('div');
    typing.className = 'bot-message typing';
    typing.innerHTML = "Ganesan and Company is typing...";
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
        typing.remove();
        let response = "I apologize, but I couldn't find a direct answer. Please contact our office directly at Ganesan and Company.";

        // Keyword Matching
        if (query.includes('audit')) {
            response = "Our audit services cover Statutory, Internal, and Risk Assurance audits.";
        } else if (query.includes('tax')) {
            response = "We provide comprehensive direct and indirect tax advisory.";
        } else if (query.includes('contact') || query.includes('office')) {
            response = "Our office is located in Puducherry. Please call our office for an appointment.";
        }

        addBotMessage(response);
    }, 1500);
}

function addBotMessage(text) {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML += `<div class="bot-message"><strong>Ganesan and Company:</strong> ${text}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
