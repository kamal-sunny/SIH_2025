async function sendMessage() {
    let inputField = document.getElementById("userInput");
    let message = inputField.value;
    if (!message) return;

    appendMessage("You: " + message);
    inputField.value = "";

    const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    });

    const data = await response.json();
    data.forEach(botMsg => {
        appendMessage("Bot: " + botMsg.text);
    });
}

function appendMessage(text) {
    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += text + "<br/>";
    chatbox.scrollTop = chatbox.scrollHeight;
}
