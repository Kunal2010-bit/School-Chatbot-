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
  "creator of chatbot": "Mr. Kunal Sood and Mr. Ayraveer Thakur are the creators of me.",
  "who is the head boy": "The current head boy is not yet announced, but I will update you soon.",
  "who is the class teacher": "The class teacher for each section varies. You can find details in your class list.",
  "who is the class 9 maths teacher": "Mr. Kamal Thakur, Vipin Sir, and Yogita Ma'am handle Class 9 Mathematics.",
  // Add more responses as needed for general questions
  "how many continents are there": "There are 7 continents on Earth.",
  "what is the capital of france": "The capital of France is Paris.",
  "who invented the telephone": "Alexander Graham Bell invented the telephone.",
  "tell me a joke": "Why don't skeletons fight each other? They don't have the guts!",
  "what is your favorite color": "I love blue, it’s calm and peaceful.",
  "how old are you": "I am an AI, so I don't have an age like humans do!",
  "tell me a fun fact": "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient tombs that are over 3,000 years old!",
  "what is the weather today": "I can’t check the weather right now, but you can use a weather app or website for the latest updates.",
  "who is the president of india": "The President of India is Droupadi Murmu.",
  "what is the national animal of india": "The national animal of India is the Bengal tiger.",
  // More general knowledge questions and answers...
};

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
  }, 1000);  // Typing delay
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

  for (let key in botResponses) {
    if (input.includes(key)) {
      return botResponses[key] + " ✨";
    }
  }

  return "I didn't understand that. Could you rephrase? 🧐";
}

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});