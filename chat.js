const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");
const historyBtn = document.getElementById("history-button");
const historyPopup = document.getElementById("history-popup");
const historyContent = document.getElementById("history-content");

const botResponses = {
  "school name": "Our school is DAV Public School New Shimla.",
  "location": "We are located in New Shimla, Sector-4.",
  "timings": "Morning assembly is at 8:30 AM. Periods begin at 9:00 AM and school ends at 2:20 PM.",
  "principal": "Our principal is Mr. Rakesh Kumar Chandel.",
  "ai teacher": "Kamlesh Ma'am is the AI teacher.",
  "IT teacher": "Juhi Ma'am is the IT teacher.",
  "what are you": "I'm a chatbot designed to answer general questions about DAV Public School New Shimla."
};

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  appendMessage(userText, "user-message");
  userInput.value = "";
  typingIndicator.style.display = "block";

  saveToHistory(`You: ${userText}`);

  setTimeout(async () => {
    const reply = await getBotReply(userText.toLowerCase());
    appendMessage(reply, "bot-message");
    typingIndicator.style.display = "none";
    saveToHistory(`Bot: ${reply}`);
  }, 800);
}

function appendMessage(message, className) {
  const msgContainer = document.createElement("div");
  msgContainer.className = "message-container " + className;

  if (className === "bot-message") {
    const botImage = document.createElement("img");
    botImage.src = "a pale black dark type background for a chatbot.png";
    botImage.alt = "Bot";
    botImage.className = "bot-image";
    msgContainer.appendChild(botImage);

    const msg = document.createElement("div");
    msg.className = "message-text";
    msg.innerHTML = message;
    msgContainer.appendChild(msg);

  } else {
    const msg = document.createElement("div");
    msg.className = "message-text user";
    msg.innerHTML = message;
    msgContainer.appendChild(msg);
  }

  chatBox.appendChild(msgContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
} 
async function getBotReply(input) {
  input = input.replace(/[^\w\s]/gi, "").toLowerCase();

  const greetings = ["hi", "hello", "hey"];
  const words = input.split(/\s+/);
  if (greetings.some(g => words.includes(g))) {
    return "Hey there! How can I help you today?";
  }

  const creatorKeywords = ["creator", "who made you", "who created you"];
  if (creatorKeywords.some(k => input.includes(k))) {
    return "Ayraveer Thakur,Mannat and Kunal Sood are the creators of me!";
  }

  for (let key in botResponses) {
    if (input.includes(key)) return botResponses[key];
  }

  // Fallback: search externally (Wikipedia, DuckDuckGo, etc.)
  const endpoints = [
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`,
    `https://api.duckduckgo.com/?q=${encodeURIComponent(input)}&format=json&no_html=1`,
  ];

  for (let url of endpoints) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.extract) return data.extract;
      if (data.AbstractText) return data.AbstractText;
    } catch (e) {}
  }

  return "Sorry, I couldn't find an answer to this question.";
}

// Save chat to localStorage
function saveToHistory(message) {
  let history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  history.push(message);
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

// Toggle popup
historyBtn.addEventListener("click", () => {
  historyPopup.classList.toggle("hidden");
  loadHistory();
});

// Load chat history
function loadHistory() {
  historyContent.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  if (history.length === 0) {
    historyContent.innerHTML = "<i>No chat history yet.</i>";
  } else {
    history.forEach(msg => {
      const div = document.createElement("div");
      div.textContent = msg;
      historyContent.appendChild(div);
    });
  }
}
