const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat-box");
const typingIndicator = document.getElementById("typing-indicator");
const historyBtn = document.getElementById("history-button");
const historyPopup = document.getElementById("history-popup");
const historyContent = document.getElementById("history-content");

// School Q&A Responses
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
  "houses": "There are six houses: Gandhi, Ashoka, Hansraj, Nehru, Tagore, and Subhash.",
  "ai teacher": "Kamlesh Ma'am teaches Artificial Intelligence.",
  "it teacher": "Juhi Ma'am is the IT teacher.",
  "maths teacher": "Mr. Kamal Thakur, Vipin Sir, and Yogita Ma'am teach Maths in Class 9.",
  "toppers": "Devika Kainthla topped Humanities with 98.2%, Aakarshita Alok Sood topped Science with 98%, and Vedish Chauhan led Commerce with 94.6%.",
  "events": "The school hosts Annual Day, Sports Day, Science Exhibitions, Debates, and Cultural Fests.",
  "creators": "Aryaveer Thakur, Kunal Sood, and Mannat created me!",
  "labs": "Our school has well-equipped Science, Computer, and AI Labs.",
  "facilities": "Facilities include a large library, sports ground, smart classrooms, labs, and transport service.",
  "motto": "The school follows the motto: 'Lead us from darkness to light.'",
  "full form of d.a.v.": "Dayanand Anglo Vedic.",
  "phone": "You can contact the school via phone: 0177-2671337.",
  "email": "The school's email is davnewshimla@rediffmail.com.",
  "website": "The official website is http://davnewshimla.in/"
};

// Casual Replies
const casualReplies = {
  greetings: [
    "Hey there! How’s life?", "What's up? 😃", "Hey hey! Nice to see you!", "Yo! How’s your day going?", "Hello hello! What’s on your mind?"
  ],
  goodbyes: [
    "See ya later! Take care! ✌️", "Bye! Let’s chat again soon.", "Catch you later! Stay awesome!", "Goodbye! Don’t forget to come back!", "Peace out! 👋"
  ],
  thanks: [
    "No worries! Always happy to chat 😊", "You're welcome, friend!", "Glad to help! What else is up?", "Anytime! What’s next?", "You got it! Need anything else?"
  ],
  emotions: {
    happy: ["Glad to hear that! 😊", "Awesome! What’s making you happy today?", "Love the good vibes!", "That’s fantastic! Keep the energy high! 🚀", "Happiness looks good on you!"],
    sad: ["I hear you. Want to talk about it?", "That sucks. I’m here if you need a friend.", "Sending you good vibes! You got this!", "Hope things get better soon ❤️", "Hang in there! Better days are ahead!"],
    angry: ["Deep breaths. Tell me what happened?", "I got you. What’s making you upset?", "Let it out—I’m listening!", "Rough day? I totally get it.", "Frustration happens. You wanna vent?"],
    confused: ["Hmm, let’s figure it out together!", "Confusion just means learning is about to happen!", "I’ll try my best to clear things up!", "Let’s break it down step by step!", "I got you! What’s confusing you?"]
  },
  casualChat: {
    general: [
      "Just chilling in cyberspace. You?", "I’m here, ready to chat! 😊", "Doing great! Thanks for asking!", "Living my best digital life!", "Nothing much, just talking to cool humans!"
    ],
    playful: [
      "Whoa, a human! Fancy seeing you here!", "Back again? You must really love chatting!", "You talking to me? 😆", "Guess what? I never sleep. Crazy, right?", "I’m basically Wi-Fi—always connected!"
    ],
    reactions: [
      "Ooooh, interesting! Tell me more!", "Whoa, that’s cool! How’d you learn that?", "No way! That’s wild!", "That’s a fun fact! You just leveled me up!", "Whoa, I didn’t see that coming!"
    ]
  }
};

// Chat Response Logic
async function getBotReply(inputRaw) {
  const input = inputRaw.toLowerCase().replace(/[^\w\s]/gi, "");

  if (/\b(hi|hello|hey)\b/.test(input)) return randomFrom(casualReplies.greetings);
  if (/\b(bye|goodbye|see ya)\b/.test(input)) return randomFrom(casualReplies.goodbyes);
  if (/\b(thanks|thank you)\b/.test(input)) return randomFrom(casualReplies.thanks);
  if (input.includes("how are you")) return randomFrom(casualReplies.casualChat.general);
  if (input.includes("what's up") || input.includes("how's it going")) return randomFrom(casualReplies.casualChat.playful);

  if (input.includes("sad") || input.includes("upset")) return randomFrom(casualReplies.emotions.sad);
  if (input.includes("happy") || input.includes("excited")) return randomFrom(casualReplies.emotions.happy);
  if (input.includes("angry") || input.includes("mad")) return randomFrom(casualReplies.emotions.angry);
  if (input.includes("confused") || input.includes("doubt")) return randomFrom(casualReplies.emotions.confused);

  for (let key in botResponses) {
    if (input.includes(key)) return botResponses[key];
  }

  return randomFrom(casualReplies.casualChat.reactions);
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Chat Functions
sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });

function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;
  appendMessage(userText, "user-message");
  userInput.value = "";
  setTimeout(async () => {
    const reply = await getBotReply(userText);
    appendMessage(reply, "bot-message");
  }, 800);
}

function appendMessage(message, className) {
  const msg = document.createElement("div");
  msg.className = "message-text";
  msg.innerHTML = message;
  chatBox.appendChild(msg);
}
