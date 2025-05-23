const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const typingIndicator = document.getElementById("typing-indicator");
const historyPopup = document.getElementById("history-popup");

const chatHistory = [];

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  displayMessage(message, "user");
  userInput.value = "";
  typingIndicator.style.display = "block";

  // Simulate bot reply
  setTimeout(() => {
    const reply = getBotReply(message);
    displayMessage(reply, "bot");
    typingIndicator.style.display = "none";
    chatHistory.push({ question: message, answer: reply });
  }, 800);
}

function displayMessage(message, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add(sender + "-message", "message-text");
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(input) {
  const msg = input.toLowerCase();
  if (msg.includes("timing")) return "School starts at 8:30 AM with morning assembly.";
  if (msg.includes("principal")) return "The principal is Mr. Rakesh Kumar Chandel.";
  if (msg.includes("math teacher") || msg.includes("maths teacher")) return "Mr. Kamal Thakur, Vipin Sir, and Yogita Ma'am teach class 9 Maths.";
  if (msg.includes("exam")) return "Term 1 exams are from May 5 to May 15.";
  if (msg.includes("ptm") || msg.includes("result")) return "Results will be given during PTM when you meet all the teachers.";
  return "I'm still learning! Ask me something else.";
}

function toggleHistory() {
  if (historyPopup.classList.contains("hidden")) {
    historyPopup.innerHTML = "<strong>Chat History:</strong><br><br>" +
      chatHistory.map(h => `<b>Q:</b> ${h.question}<br><b>A:</b> ${h.answer}<br><br>`).join("");
    historyPopup.classList.remove("hidden");
  } else {
    historyPopup.classList.add("hidden");
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") sendMessage();
}
