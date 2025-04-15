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
  "creator of chatbot": "Mr. Kunal Sood and Mr. Ayraveer Thakur are the creators of me.",
  // More general knowledge questions and answers...
};

sendButton.addEventListener("click", function () {
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
});

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