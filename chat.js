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
  "principal": "Our principal is Mr. Rakesh Kumar Chandel.",
  "math teacher": "Mr. Kamal Thakur, Vipin Sir, and Yogita Ma'am teach Class 9 Mathematics.",
  "class 9 maths teacher": "Mr. Kamal Thakur, Vipin Sir, and Yogita Ma'am teach Class 9 Mathematics.",
  "ai teacher": "Kamlesh Ma'am is the AI teacher.",
  "it teacher": "Juhi Ma'am teaches IT.",
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
  // GK & Fun
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

  setTimeout(() => {
    const reply = getBotReply(userText.toLowerCase());
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

function getBotReply(input) {
  input = input.replace(/[^\w\s]/gi, "").toLowerCase();

  const creatorKeywords = ["creator", "who made you", "who created you", "who is your creator", "who developed you"];
  for (let phrase of creatorKeywords) {
    if (input.includes(phrase)) {
      return "Mr. Ayraveer Thakur and Mr. Kunal Sood are the creators of me! ⚡";
    }
  }

  if (["hi", "hello", "hey"].includes(input)) {
    return "Hey there! How can I help you today?";
  }

  for (let key in botResponses) {
    if (input.includes(key)) {
      return botResponses[key] + " ✨";
    }
  }

  if (input.includes("who")) return "Hmm, could you tell me who you mean?";
  if (input.includes("what")) return "Interesting! Can you rephrase your question?";
  if (input.length < 4) return "That seems too short. Try asking something longer!";

  return "I didn’t understand that. Could you rephrase? 🧐";
}