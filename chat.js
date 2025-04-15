   
  const schoolFAQs = {
    "what is the name of the school": "The school is DAV Public School New Shimla.",
    "who is the principal": "The principal is Mr. Rakesh Kumar Chandel.",
    "what are the school timings": "Morning assembly is at 8:30 AM. Periods start at 9:00 AM and end at 2:20 PM.",
    "where is the school located": "The school is in Sector-4, New Shimla.",
    "when is the next exam": "Term 1 exams are from 5 May to 15 May.",
    "how can i check my result": "Visit the school with your parents during PTM and meet all the teachers to collect your result.",
    "who teaches class 9 maths": "Mr. Kamal Thakur, Vipin Sir, and Yogita Ma'am teach Class 9 Mathematics.",
    "are mobiles allowed": "No, students are not allowed to bring mobile phones.",
    "how to apply for admission": "You can collect the form from the front office.",
    "what is the dress code": "Students must wear the school uniform with proper shoes.",
    "what are the upcoming holidays": "Upcoming holidays will be shared by the class teacher via notice — check regularly!"
};

function sendMessage() {
    const userInput = document.getElementById("userInput").value.toLowerCase().trim();
    if (userInput === "") return;

    appendMessage(userInput, "user");

    let response = "Sorry, I don’t understand that. Try asking something about the school.";
    for (let question in schoolFAQs) {
        if (userInput.includes(question)) {
            response = schoolFAQs[question];
            break;
        }
    }

    setTimeout(() => appendMessage(response, "bot"), 500);
    document.getElementById("userInput").value = "";
}

function appendMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    document.getElementById("chatbox").appendChild(messageElement);
    document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
}