async function getBotReply(userMessage) {
  const botName = "RoboBuddy"; // Customize as you like
  const ownerName = "Kunal,Aryaveerand Mannat";   // Your name or brand

  const url = `https://api.affiliateplus.xyz/api/chat?message=${encodeURIComponent(userMessage)}&botname=${botName}&ownername=${ownerName}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.message || "Sorry, I didn’t get that.";
  } catch (error) {
    return "Oops! Something went wrong.";
  }
}

function appendMessage(message, sender) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  messageDiv.innerText = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage(userMessage, "user");
  input.value = "";

  const botReply = await getBotReply(userMessage);
  appendMessage(botReply, "bot");
}
