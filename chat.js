const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const historyBtn = document.getElementById('historyBtn');
const historyModal = document.getElementById('historyModal');
const closeBtn = document.querySelector('.close');
const historyList = document.getElementById('historyList');

function sendMessage() {
  const userText = userInput.value.trim();
  if (!userText) return;

  appendMessage('You', userText);
  saveToHistory('You', userText);

  userInput.value = '';
  getBotReply(userText);
}

function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbox.appendChild(messageElement);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotReply(input) {
  // Simulate a smart bot reply for demo
  let reply = 'Sorry, I am not able to get the answer to this question.';

  if (/chief minister of himachal/i.test(input) || /cm of hp/i.test(input)) {
    reply = "The Chief Minister of Himachal Pradesh is Sukhvinder Singh Sukhu.";
  } else if (/pm of india/i.test(input) || /prime minister of india/i.test(input)) {
    reply = "The Prime Minister of India is Narendra Modi.";
  } else if (/subject teacher/i.test(input)) {
    reply = "It depends on class to class.";
  }

  appendMessage('Bot', reply);
  saveToHistory('Bot', reply);
}

// History Handling
function saveToHistory(sender, text) {
  let history = JSON.parse(localStorage.getItem('chatHistory')) || [];
  history.push({ sender, text });
  localStorage.setItem('chatHistory', JSON.stringify(history));
}

function showHistory() {
  historyList.innerHTML = '';
  const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
  if (history.length === 0) {
    historyList.innerHTML = '<p>No history available.</p>';
    return;
  }

  history.forEach(item => {
    const entry = document.createElement('div');
    entry.innerHTML = `<strong>${item.sender}:</strong> ${item.text}`;
    historyList.appendChild(entry);
  });
}

// Event Listeners
historyBtn.addEventListener('click', () => {
  showHistory();
  historyModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  historyModal.style.display = 'none';
});

window.onclick = function(event) {
  if (event.target == historyModal) {
    historyModal.style.display = 'none';
  }
};