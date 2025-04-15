   
  const schoolFAQs = {
    "school name": "The school is DAV Public School New Shimla.",
    "principal": "The principal is Mr. Rakesh Kumar Chandel.",
    "timings": "Morning assembly is at 8:30 AM. Periods start at 9:00 AM and end at 2:20 PM.",
    "address": "The school is in Sector-4, New Shimla.",
    "exam": "Term 1 exams are from 5 May to 15 May.",
    "result": "Visit the school with your parents during PTM and meet all the teachers to collect your result.",
    "maths teacher": "Mr. Kamal Thakur, Vipin Sir, and Yogita Ma'am teach Class 9 Mathematics.",
    "mobile": "No, students are not allowed to bring mobile phones.",
    "admission": "You can collect the form from the front office.",
    "uniform": "Students must wear the school uniform with proper shoes.",
    "holiday": "Upcoming holidays will be shared via notice board or class WhatsApp group."
};

const synonyms = {
    "name of school": "school name",
    "headmaster": "principal",
    "location": "address",
    "place": "address",
    "fees": "admission",
    "charges": "admission",
    "math teacher": "maths teacher",
    "maths": "maths teacher",
    "math": "maths teacher",
    "mobile phone": "mobile",
    "cellphone": "mobile",
    "results": "result",
    "marks": "result"
};

function correctInput(input) {
    input = input.toLowerCase().trim();
    for (let key in synonyms) {
        if (input.includes(key)) input = input.replace(key, synonyms[key]);
    }
    return input;
}

function sendMessage() {
    const inputElem = document.getElementById("userInput");
    let userInput = inputElem.value;
    if (!userInput) return;
    appendMessage(userInput, "user");

    userInput = correctInput(userInput);

    let response = "Sorry, I don’t understand that. Try asking something about the school.";
    for (let key in schoolFAQs) {
        if (userInput.includes(key)) {
            response = schoolFAQs[key];
            break;
        }
    }

    setTimeout(() => appendMessage(response, "bot"), 500);
    inputElem.value = "";
}

function appendMessage(message, sender) {
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerHTML = `<p>${message}</p>`;
    document.getElementById("chatbox").appendChild(msg);
    document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
}