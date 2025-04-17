const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const historyBtn = document.getElementById("history-btn");
const historyModal = document.getElementById("history-modal");
const closeHistory = document.getElementById("close-history");
const historyList = document.getElementById("history-list");

let chatHistory = [];

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = `${sender === "user" ? "You" : "Bot"}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;

  chatHistory.push(`${sender === "user" ? "You" : "Bot"}: ${text}`);
}

async function fetchAnswerFromDuckDuckGo(query) {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.AbstractText || data.Answer || "";
}

async function fetchAnswerFromWikipedia(query) {
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.extract || "";
}

function processQuery(input) {
  input = input.toLowerCase().trim();
  const q = input;

  const schoolInfo = {
    "school name": "DAV Public School New Shimla",
    "principal": "Rakesh Kumar Chandel",
    "timings": "School starts with assembly at 8:30 AM, and classes run from 9:00 AM to 2:20 PM.",
    "ptm": "Results can be collected during the PTM by meeting all teachers.",
    "exams": "Term 1 exams are scheduled from May 5 to May 15.",
    "creators": "The chatbot was created by Ayraveer Thakur and Kunal Sood."
  };

  for (let key in schoolInfo) {
    if (q.includes(key)) return schoolInfo[key];
  }

  if (q.includes("subject teacher") || q.includes("maths teacher") || q.includes("teacher of")) {
    return "Subject teachers vary depending on class.";
  }

  return null; // fallback to deep search
}

async function getBotResponse(input) {
  const directAnswer = processQuery(input);
  if (directAnswer) return directAnswer;

  let answer = await fetchAnswerFromDuckDuckGo(input);
  if (answer && answer.length > 20) return answer;

  answer = await fetchAnswerFromWikipedia(input);
  if (answer && answer.length > 20) return answer;

  return "Sorry, I am not able to get the answer to this question.";
}

sendBtn.addEventListener("click", async () => {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";

  const response = await getBotResponse(input);
  appendMessage("bot", response);
});

// History Button Logic
historyBtn.onclick = () => {
  historyList.innerHTML = "";
  chatHistory.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
  historyModal.classList.remove("hidden");
};

closeHistory.onclick = () => {
  historyModal.classList.add("hidden");
};

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});