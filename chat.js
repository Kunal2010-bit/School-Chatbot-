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
  "it teacher": "Juhi Ma'am is the IT teacher.",
  "how many classes study in our school": "16 classes study here: Pre-Nursery to 12th including LKG and UKG.",
  "some toppers of our school": `Devika Kainthla topped Humanities with 98.2%, Aakarshita Alok Sood topped Science with 98%, and Vedish Chauhan topped Commerce with 94.6%.`,
  "who is aryaveer": "Aryaveer Thakur is one of the creators of me!",
  "who is mannat": "Mannat is one of the creators of me!",
  "who is kunal": "Kunal Sood is one of the creators of me!",
  "capital of himachal pradesh": "The capital of Himachal Pradesh is Shimla (summer) and Dharamshala (winter).",
  "languages spoken in himachal pradesh": "Hindi, Pahari, and Punjabi are widely spoken in Himachal Pradesh.",
  "state animal of himachal": "The state animal of Himachal Pradesh is the Snow Leopard.",
  "state flower of himachal": "The Pink Rhododendron is the state flower.",
  "state tree of himachal": "Deodar is the state tree.",
  "state bird of himachal": "Western Tragopan is the state bird.",
  "national animal of india": "The national animal of India is the Bengal Tiger.",
  "national bird of india": "The national bird of India is the Indian Peacock.",
  "national anthem of india": "India's national anthem is 'Jana Gana Mana'."
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
  msgContainer.className = "message-container";

  const msgBubble = document.createElement("div");
  msgBubble.className = className;
  msgBubble.innerHTML = message;

  if (className === "bot-message") {
    const botImg = document.createElement("img");
    botImg.src = " botImg.src ="bot.png"; // Make sure bot.png is in the same folder
    botImg.alt = "Bot";
    botImg.classList.add("bot-image");
    msgContainer.appendChild(botImg);
    msgContainer.appendChild(msgBubble);
  } else {
    msgContainer.classList.add("user-align");
    msgContainer.appendChild(msgBubble);
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
    return "Ayraveer Thakur, Mannat, and Kunal Sood are the creators of me!";
  }

  for (let key in botResponses) {
    if (input.includes(key)) return botResponses[key];
  }

  // External fallback
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

// Chat history save
function saveToHistory(message) {
  let history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  history.push(message);
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

// Popup toggle
historyBtn.addEventListener("click", () => {
  historyPopup.classList.toggle("hidden");
  loadHistory();
});

// Load history content
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
