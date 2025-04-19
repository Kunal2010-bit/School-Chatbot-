const chatBox = document.getElementById("chat-box");
const inputField = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", handleUserInput);
inputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") handleUserInput();
});

function handleUserInput() {
  const userInput = inputField.value.trim();
  if (!userInput) return;

  appendMessage(userInput, "user-message");
  inputField.value = "";
  setTimeout(() => generateBotResponse(userInput), 500);
}

function appendMessage(message, className) {
  const msgContainer = document.createElement("div");
  msgContainer.className = "message-container " + className;

  if (className === "bot-message") {
    const botImage = document.createElement("img");
    botImage.src = "bot.png";
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

function generateBotResponse(userInput) {
  const input = userInput.toLowerCase();

  let response = "Sorry, I didn't understand that.";

  if (input.includes("hello") || input.includes("hi")) {
    response = "Hello! How can I assist you today?";
  } else if (input.includes("capital of himachal")) {
    response = "The capital of Himachal Pradesh is Shimla, and Dharamshala is the winter capital.";
  } else if (input.includes("how many classes")) {
    response = "There are 16 classes in our school, from Pre-Nursery to 12th, including LKG and UKG.";
  } else if (input.includes("toppers")) {
    response = "Devika Kainthla topped Humanities with 98.2%, Aakarshita Alok Sood topped Science with 98%, and Vedish Chauhan led Commerce with 94.6%.";
  } else if (input.includes("aryaveer")) {
    response = "Aryaveer is one of the creators of me, your school chatbot!";
  }

  appendMessage(response, "bot-message");
}
