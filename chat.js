const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");

const historyBtn = document.getElementById("history-btn");
const historyContainer = document.getElementById("history-container");
const closeHistoryBtn = document.getElementById("close-history");
const historyList = document.getElementById("history-list");

let chatHistory = []; // Store history here

sendButton.addEventListener("click", function () {
  sendMessage();
});

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

historyBtn.addEventListener("click", function () {
  toggleHistory();
});

closeHistoryBtn.addEventListener("click", function () {
  toggleHistory();
});

function sendMessage() {
  const userText = userInput.value.trim();
  if (userText === "") return;

  appendMessage(userText, "user-message");
  userInput.value = "";

  typingIndicator.style.display = "block";

  setTimeout(async () => {
    const reply = await getBotReply(userText.toLowerCase());
    appendMessage(reply, "bot-message");
    typingIndicator.style.display = "none";

    // Store the user input and bot response in history
    chatHistory.push({ user: userText, bot: reply });

    // Update the history display
    updateHistory();
  }, 800);
}

function appendMessage(message, className) {
  const messageElement = document.createElement("div");
  messageElement.className = className;
  messageElement.innerHTML = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotReply(input) {
  input = input.replace(/[^\w\s]/gi, "").toLowerCase();

  // Your existing bot logic here...
  // For now, just returning a placeholder response
  return "This is a placeholder response for now.";
}

function toggleHistory() {
  if (historyContainer.style.display === "block") {
    historyContainer.style.display = "none";
  } else {
    historyContainer.style.display = "block";
  }
}

function updateHistory() {
  // Clear current history
  historyList.innerHTML = "";

  // Loop through chat history and append it to the history container
  chatHistory.forEach((entry, index) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.innerHTML = `<strong>User:</strong> ${entry.user} <br><strong>Bot:</strong> ${entry.bot}`;
    historyList.appendChild(historyItem);
  });
}