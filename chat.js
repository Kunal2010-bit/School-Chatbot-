const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");
const historyButton = document.getElementById("history-button");
const historyLayer = document.getElementById("history-layer");
const closeHistory = document.getElementById("close-history");
const historyContent = document.getElementById("history-content");

let chatHistory = [];

const botResponses = {
  "school name": "Our school is DAV Public School New Shimla.",
  "location": "We are located in New Shimla, Sector-4.",
  "timings": "Morning assembly is at 8:30 AM. Periods begin at 9:00 AM and school ends at 2:20 PM.",
  "principal": "Our principal is Rakesh Kumar Chandel.",
  "ai teacher": "Kamlesh Ma'am is the AI teacher.",
  "it teacher": "Juhi Ma'am teaches IT.",
  "next exam": "Term 1 exams are from 5th May to 15th May.",
  "check result": "Please come with your parents on PTM day and meet the teachers to collect your result.",
  "upcoming holidays": "Independence Day on 15th August and Diwali break in October.",
  "apply for admission": "Apply online through the school website or collect the form from the office.",
  "admission documents": "Birth certificate, previous report card, and transfer certificate.",
  "subjects in class 10": "English, Math, Science, Social Studies, Hindi, and Computer Science.",
  "library": "Yes, our library has books and digital resources.",
  "sports": "Football, basketball, cricket, and athletics.",
  "clubs": "Science Club, Drama Club, Robotics Club, Debate Club.",
  "transport": "Yes, school buses are available for local areas.",
  "how many students": "There are more than 2000 students in the school.",
  "how many sections": "Each class has 6 sections: A, B, C, D, E, and F.",
  "head boy": "The current head boy is not yet announced.",
  "subject teacher": "It depends on class to class.",
  "class teacher": "The class teacher for each section varies.",
  "what are you": "I'm a school chatbot designed to answer general questions about the school."
};

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
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

    // Save history
    chatHistory.push({ question: userText, answer: reply });
    saveChatHistory();
  }, 800);
}

function appendMessage(message, className) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.innerHTML = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotReply(input) {
  input = input.replace(/[^\w\s]/gi, "").toLowerCase();

  const greetings = ["hi", "hello", "hey"];
  const words = input.split(/\s+/);
  if (greetings.some(g => words.includes(g))) {
    return "Hey there! How can I help you today?";
  }

  const creatorWords = ["creator", "who made you", "who created you", "who is your creator", "who developed you"];
  if (creatorWords.some(kw => input.includes(kw))) {
    return "Ayraveer Thakur,Mannat and Kunal Sood are the creators of me!";
  }

  if (input.includes("math teacher") || input.includes("subject teacher") || input.includes("teacher of")) {
    return "It depends on class to class.";
  }

  for (let key in botResponses) {
    const keywords = key.split(" ");
    let matched = 0;
    keywords.forEach(w => {
      if (input.includes(w)) matched++;
    });

    if (matched / keywords.length >= 0.6) {
      return botResponses[key];
    }
  }

  const endpoints = [
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`,
    `https://simple.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`,
    `https://api.duckduckgo.com/?q=${encodeURIComponent(input)}&format=json&no_html=1`
  ];

  for (let url of endpoints) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.extract) return data.extract;
      if (data.AbstractText) return data.AbstractText;
    } catch {}
  }

  return "Sorry, I couldn't find an answer to this question.";
}

// History Button Logic
historyButton.addEventListener("click", () => {
  historyContent.innerHTML = chatHistory.map(item => `<div><b>You:</b> ${item.question}<br><b>Bot:</b> ${item.answer}</div><hr>`).join("");
  historyLayer.style.display = "flex";
});

closeHistory.addEventListener("click", () => {
  historyLayer.style.display = "none";
});

function saveChatHistory() {
  const blob = new Blob([JSON.stringify(chatHistory, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `chat_history_${Date.now()}.json`;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}