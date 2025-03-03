document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = userInput.value.trim();

    if (message === "") return;

    // Add user message to chat
    addMessage(message, "user");

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        addMessage(data.response, "bot");
    } catch (error) {
        addMessage("Error connecting to server. Please try again.", "bot");
        console.error("Error:", error);
    }

    // Clear input field
    userInput.value = "";
}

// Function to Add Message to Chatbox
function addMessage(text, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");

    messageDiv.innerHTML = sender === "user"
        ? `<i class="fas fa-user"></i> ${text}`
        : `<i class="fas fa-robot"></i> ${text}`;

    chatBox.appendChild(messageDiv);

    // Auto-scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to Toggle Theme
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}