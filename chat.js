   
 function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;

    appendMessage(userInput, "user");
    document.getElementById("userInput").value = "";

    fetch("/get?msg=" + userInput)
        .then(response => response.text())
        .then(data => appendMessage(data, "bot"));
}

function appendMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    document.getElementById("chatbox").appendChild(messageElement);
    document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
}