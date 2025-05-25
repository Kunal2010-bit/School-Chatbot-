const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");
const historyBtn = document.getElementById("history-button");
const historyPopup = document.getElementById("history-popup");
const historyContent = document.getElementById("history-content");

// School Q&A
const botResponses = {
  "school name": "Our school is DAV Public School New Shimla.",
  "founder of dav": "The DAV institutions were founded in 1886 by the Arya Samaj. The founder is Mahatma Hansraj.",
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
  "maths teacher": "Kamal Sir, Vipin Sir and Yogita Ma'am teach Maths in Class 9.",
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

// Events
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

async function getBotReply(inputRaw) {
  const input = inputRaw.toLowerCase().replace(/[^\w\s]/gi, "");

  // School Q&A first
  for (let key in botResponses) {
    if (input.includes(key)) return botResponses[key];
  }

  // Fallback to public chatbot API
  try {
    const res = await fetch(`https://api.affiliateplus.xyz/api/chat?message=${encodeURIComponent(inputRaw)}&botname=DAVBot&ownername=DAVSchool`);
    const data = await res.json();
    if (data && data.message) return data.message;
  } catch (error) {
    console.error("API fetch failed", error);
  }

  return "I'm not sure how to respond to that. Can you try rephrasing?";
}

// Save and Load History
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
