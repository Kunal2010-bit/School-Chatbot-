@@ -6,10 +6,10 @@ const historyBtn = document.getElementById("history-button");
const historyPopup = document.getElementById("history-popup");
const historyContent = document.getElementById("history-content");

// Bot memory
// School Q&A
const botResponses = {
  "school name": "Our school is DAV Public School New Shimla.",
  "founder of dav": "The DAV institutions were founded in 1886 by Arya Samaj. The founder is Mahatma Hansraj.",
  "founder of dav": "The DAV institutions were founded in 1886 by the Arya Samaj. The founder is Mahatma Hansraj.",
  "location": "We are located in New Shimla, Sector-4.",
  "timings": "Morning assembly is at 8:30 AM. Periods begin at 9:00 AM and school ends at 2:20 PM.",
  "principal": "Our principal is Mr. Rakesh Kumar Chandel.",
@@ -36,6 +36,7 @@ const botResponses = {
  "website": "The official website is http://davnewshimla.in/"
};

// Chat tone
const casualReplies = {
  greetings: ["hi", "hello", "hey"],
  goodbyes: ["bye", "goodbye", "see ya"],
@@ -54,7 +55,7 @@ const casualReplies = {
  ]
};

// Send event
// Events
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
@@ -98,34 +99,31 @@ function appendMessage(message, className) {
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Core reply logic
async function getBotReply(inputRaw) {
  const input = inputRaw.toLowerCase().replace(/[^\w\s]/gi, "").trim();
  const input = inputRaw.toLowerCase().replace(/[^\w\s]/gi, "");

  // Greetings, Thanks, Farewells
  // Greeting check (word boundary to fix 'hi' in 'shimla')
  if (/\b(hi|hello|hey)\b/.test(input)) return "Hey there! How can I help you?";
  if (/\b(bye|goodbye|see ya)\b/.test(input)) return "Goodbye! Take care!";
  if (/\b(thanks|thank you)\b/.test(input)) return "You're welcome!";

  // Emotions
  // Emotion detection
  if (input.includes("sad") || input.includes("upset")) return randomFrom(casualReplies.emotions.sad);
  if (input.includes("happy") || input.includes("excited")) return randomFrom(casualReplies.emotions.happy);
  if (input.includes("angry") || input.includes("mad")) return randomFrom(casualReplies.emotions.angry);
  if (input.includes("confused") || input.includes("doubt")) return randomFrom(casualReplies.emotions.confused);

  // Creator question
  if (input.includes("who created you") || input.includes("your creator") || input.includes("who made you")) {
  if (input.includes("creator") || input.includes("who made you") || input.includes("who created you")) {
    return "Aryaveer Thakur, Mannat and Kunal Sood are the creators of me!";
  }

  // Match from database with fuzzy logic
  // Local DB
  for (let key in botResponses) {
    const words = key.split(" ");
    let found = words.every(word => input.includes(word));
    if (found) return botResponses[key];
    if (input.includes(key)) return botResponses[key];
  }

  // Definition
  // Definition prompt
  const definitionPrompt = input.match(/(what is|define|meaning of)\s+(.*)/i);
  if (definitionPrompt && definitionPrompt[2]) {
    const term = definitionPrompt[2];
@@ -144,7 +142,6 @@ function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Fallback: Wikipedia, DuckDuckGo, Wikidata
async function fetchDefinition(query) {
  const urls = [
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
@@ -159,13 +156,13 @@ async function fetchDefinition(query) {
      const data = await res.json();
      if (data.extract) return data.extract;
      if (data.AbstractText) return data.AbstractText;
      if (data.search && data.search[0]?.description) return data.search[0].description;
      if (data.search && data.search[0] && data.search[0].description) return data.search[0].description;
    } catch (e) {}
  }
  return null;
}

// Chat History
// Save and Load History
function saveToHistory(message) {
  let history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  history.push(message);
