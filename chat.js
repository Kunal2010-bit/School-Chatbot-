const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");

const botResponses = {
  "school name": "Our school is DAV Public School New Shimla.",
  "name of the school": "Our school is DAV Public School New Shimla.",
  "location": "We are located in New Shimla, Sector-4.",
  "address": "New Shimla, Sector-4.",
  "timings": "Morning assembly is at 8:30 AM. Periods begin at 9:00 AM and school ends at 2:20 PM.",
  "school timings": "Morning assembly is at 8:30 AM. Periods begin at 9:00 AM and school ends at 2:20 PM.",
  "principal": "Our principal is Rakesh Kumar Chandel.",
  "subject teacher": "It depends on class to class.",
  "next exam": "Term 1 exams are from 5th May to 15th May.",
  "check result": "Please come with your parents on PTM day and meet the teachers to collect your result.",
  "upcoming holidays": "Independence Day on 15th August and Diwali break in October.",
  "mobile phone": "Mobile phones are not allowed in school.",
  "apply for admission": "You can apply online through our school website or collect the form from the front office.",
  "admission documents": "Birth certificate, previous report card, and transfer certificate.",
  "subjects in class 10": "English, Math, Science, Social Studies, Hindi, and Computer Science.",
  "library": "Yes, our library has a great collection of books and digital resources.",
  "sports": "Yes, we have football, basketball, cricket, and athletics.",
  "clubs": "Science Club, Drama Club, Robotics Club, and Debate Club.",
  "transport": "Yes, we have school buses for most local areas.",
  "how many students": "There are more than 2000 students in the school.",
  "how many sections": "Each class has 6 sections: A, B, C, D, E, and F.",
  "head boy": "The current head boy is not yet announced, but I will update you soon.",
  "class teacher": "The class teacher for each section varies. You can find details in your class list.",
  "how many continents": "There are 7 continents on Earth.",
  "capital of france": "The capital of France is Paris.",
  "invented the telephone": "Alexander Graham Bell invented the telephone.",
  "joke": "Why don't skeletons fight each other? They don't have the guts!",
  "favorite color": "I love blue, it’s calm and peaceful.",
  "how old are you": "I am an AI, so I don't have an age like humans do!",
  "fun fact": "Did you know that honey never spoils? It's still edible after thousands of years!",
  "weather": "I can’t check the weather right now, but try a weather app!",
  "president of india": "The President of India is Droupadi Murmu.",
  "national animal": "The national animal of India is the Bengal tiger.",
};

sendButton.addEventListener("click", function () {
  sendMessage();
});

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
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

  // Greeting fix (only match full words like "hi", not "Shimla")
  const greetings = ["hi", "hello", "hey"];
  const inputWords = input.split(/\s+/);
  if (greetings.some(g => inputWords.includes(g))) {
    return "Hey there! How can I help you today?";
  }

  // Creator
  const creatorKeywords = ["creator", "who made you", "who created you", "who is your creator", "who developed you"];
  if (creatorKeywords.some(word => input.includes(word))) {
    return "Aryaveer Thakur and Kunal Sood are the creators of me!";
  }

  // Fuzzy matching
  for (let key in botResponses) {
    const keywords = key.split(" ");
    let matchCount = 0;

    keywords.forEach(word => {
      if (input.includes(word)) matchCount++;
    });

    if (matchCount / keywords.length >= 0.6) {
      return botResponses[key];
    }
  }

  // NLP Wikipedia fallback
  try {
    const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
    const wikiData = await wikiRes.json();

    if (wikiData.extract) {
      return wikiData.extract;
    }
  } catch (err) {
    console.log("Wikipedia error:", err);
  }

  // Google fallback (if Wikipedia fails)
  try {
    const googleRes = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(input)}&format=json&no_html=1`);
    const googleData = await googleRes.json();

    if (googleData.AbstractText) {
      return googleData.AbstractText;
    }
  } catch (err) {
    console.log("Google fallback error:", err);
  }

  return "Sorry, I am not able to get the answer to this question.";
}
