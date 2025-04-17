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
  "subject teacher": "It depends on class to class.",
  "class teacher": "The class teacher for each section varies. You can find details in your class list.",
};

sendButton.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
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
  const msg = document.createElement("div");
  msg.className = className;
  msg.innerHTML = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotReply(input) {
  input = input.replace(/[^\w\s]/gi, "").toLowerCase();

  // Greeting detection
  const greetings = ["hi", "hello", "hey"];
  const words = input.split(/\s+/);
  if (greetings.some(g => words.includes(g))) {
    return "Hey there! How can I help you today?";
  }

  // Creator info
  const creatorWords = ["creator", "who made you", "who created you", "who is your creator", "who developed you"];
  if (creatorWords.some(kw => input.includes(kw))) {
    return "Ayraveer Thakur and Kunal Sood are the creators of me!";
  }

  // Subject teacher handling
  if (input.includes("math teacher") || input.includes("subject teacher") || input.includes("teacher of")) {
    return "It depends on class to class.";
  }

  // Fuzzy matching
  for (let key in botResponses) {
    const keywords = key.split(" ");
    let matched = 0;
    keywords.forEach(w => {
      if (input.includes(w.toLowerCase())) matched++;
    });
    if (matched / keywords.length >= 0.6) {
      return botResponses[key];
    }
  }

  // Deep Research
  const endpoints = [
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`,
    `https://simple.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`,
    `https://api.duckduckgo.com/?q=${encodeURIComponent(input)}&format=json&no_html=1`,
    `https://query.wikidata.org/sparql?query=SELECT ?answerLabel WHERE { ?x rdfs:label "${input}"@en. ?x schema:description ?answer. SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } }&format=json`,
    `https://dbpedia.org/data/${encodeURIComponent(input)}.json`
  ];

  for (let url of endpoints) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.extract) return data.extract;
      if (data.Abstract) return data.Abstract;
      if (data.AbstractText) return data.AbstractText;
      if (data.entities) {
        let item = Object.values(data.entities)[0];
        if (item?.descriptions?.en?.value) return item.descriptions.en.value;
      }
      if (data.results?.bindings?.length > 0) {
        return data.results.bindings[0].answerLabel.value;
      }
    } catch (err) {
      console.log("Source failed:", url);
    }
  }

  return "Hmm... I couldn't find an answer. Would you like to rephrase your question or ask something else?";
}
