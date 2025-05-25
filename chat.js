const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");
const historyBtn = document.getElementById("history-button");
const historyPopup = document.getElementById("history-popup");
const historyContent = document.getElementById("history-content");

// Bot memory
const botResponses = {
  "school name": "Our school is DAV Public School New Shimla.",
  "founder of dav": "The DAV institutions were founded in 1886 by Arya Samaj. The founder is Mahatma Hansraj.",
  "location": "We are located in New Shimla, Sector-4.",
  "timings": "Morning assembly is at 8:30 AM. Periods begin at 9:00 AM and school ends at 2:20 PM.",
  "principal": "Our principal is Mr. Rakesh Kumar Chandel.",
  "vice principal": "Our vice principal is Mr. Rajesh Sharma.",
  "history of school": "DAV Public School New Shimla was established to impart holistic education blending modern learning with Vedic values.",
  "total classes": "There are 16 classes from Pre-Nursery to Class 12, including LKG and UKG.",
  "school strength": "The school has more than 2000 students and over 90 teachers.",
  "houses": "There are six houses: Gandhi, Ashoka, Hansraj, Nehru, Tagore and Subhash.",
  "ai teacher": "Kamlesh Ma'am teaches Artificial Intelligence.",
  "it teacher": "Juhi Ma'am is the IT teacher.",
  "maths teacher": "Mr. Kamal Thakur, Vipin Sir and Yogita Ma'am teach Maths in Class 9.",
  "toppers": "Devika Kainthla topped Humanities with 98.2%, Aakarshita Alok Sood topped Science with 98%, and Vedish Chauhan led Commerce with 94.6%.",
  "events": "The school hosts Annual Day, Sports Day, Science Exhibitions, Debates, and Cultural Fests.",
  "creators": "Aryaveer Thakur, Kunal Sood and Mannat created me!",
  "who is aryaveer": "Aryaveer Thakur is one of the creators of me!",
  "who is kunal": "Kunal Sood is one of the creators of me!",
  "who is mannat": "Mannat is one of the creators of me!",
  "labs": "Our school has well-equipped Science, Computer, and AI Labs.",
  "facilities": "Facilities include a large library, sports ground, smart classrooms, labs, and transport service.",
  "motto": "The school follows the motto: 'Lead us from darkness to light.'",
  "full form of d.a.v.": "Dayanand Anglo Vedic.",
  "phone": "You can contact the school via phone: 0177-2671337.",
  "email": "The school's email is davnewshimla@rediffmail.com.",
  "website": "The official website is http://davnewshimla.in/"
};

const casualReplies = {
  greetings: ["hi", "hello", "hey"],
  goodbyes: ["bye", "goodbye", "see ya"],
  thanks: ["thanks", "thank you"],
  emotions: {
    happy: ["That's great to hear!", "Awesome!", "Glad to hear that!"],
    sad: ["I'm here if you want to talk.", "Everything will be okay."],
    angry: ["Take a deep breath, I'm with you."],
    confused: ["Let me try to help you out."]
  },
  default: [
    "That's interesting!",
    "Hmm, can you tell me more?",
    "I’m learning with you!",
    "That's cool!"
  ]
};

// Send event
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
    const reply = await getBotReply(userText);
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
    botImage.src = "UniversalUpscaler_66619b3b-3b63-46f9-b459-3b8a71feaba6.jpg";
    botImage.alt = "Bot";
    botImage.className = "bot-image";
    msgContainer.appendChild(botImage);
  }

  const msg = document.createElement("div");
  msg.className = "message-text";
  msg.innerHTML = message;
  msgContainer.appendChild(msg);

  chatBox.appendChild(msgContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Core reply logic
async function getBotReply(inputRaw) {
  const input = inputRaw.toLowerCase().replace(/[^\w\s]/gi, "").trim();

  // Greetings, Thanks, Farewells
  if (/\b(hi|hello|hey)\b/.test(input)) return "Hey there! How can I help you?";
  if (/\b(bye|goodbye|see ya)\b/.test(input)) return "Goodbye! Take care!";
  if (/\b(thanks|thank you)\b/.test(input)) return "You're welcome!";

  // Emotions
  if (input.includes("sad") || input.includes("upset")) return randomFrom(casualReplies.emotions.sad);
  if (input.includes("happy") || input.includes("excited")) return randomFrom(casualReplies.emotions.happy);
  if (input.includes("angry") || input.includes("mad")) return randomFrom(casualReplies.emotions.angry);
  if (input.includes("confused") || input.includes("doubt")) return randomFrom(casualReplies.emotions.confused);

  // Creator question
  if (input.includes("who created you") || input.includes("your creator") || input.includes("who made you")) {
    return "Aryaveer Thakur, Mannat and Kunal Sood are the creators of me!";
  }

  // Match from database with fuzzy logic
  for (let key in botResponses) {
    const words = key.split(" ");
    let found = words.every(word => input.includes(word));
    if (found) return botResponses[key];
  }

  // Definition
  const definitionPrompt = input.match(/(what is|define|meaning of)\s+(.*)/i);
  if (definitionPrompt && definitionPrompt[2]) {
    const term = definitionPrompt[2];
    const definition = await fetchDefinition(term);
    if (definition) return definition;
  }

  // Encyclopedic fallback
  const result = await fetchDefinition(input);
  if (result) return result;

  return randomFrom(casualReplies.default);
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Fallback: Wikipedia, DuckDuckGo, Wikidata
async function fetchDefinition(query) {
  const urls = [
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
    `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`,
    `https://simple.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&format=json&origin=*`
  ];

  for (let url of urls) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.extract) return data.extract;
      if (data.AbstractText) return data.AbstractText;
      if (data.search && data.search[0]?.description) return data.search[0].description;
    } catch (e) {}
  }
  return null;
}

// Chat History
function saveToHistory(message) {
  let history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  history.push(message);
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

historyBtn.addEventListener("click", () => {
  historyPopup.classList.toggle("hidden");
  loadHistory();
});

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
