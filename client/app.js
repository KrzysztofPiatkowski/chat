let userName = '';

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

loginForm.addEventListener('submit', login);

function login(e) {
    e.preventDefault();
    console.log('Kliknięto przycisk Join');

    const name = userNameInput.value;

    if(!name) {
        alert('Please enter your name!');
        return;
    }

    userName = name;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
}

addMessageForm.addEventListener('submit', sendMessage);

function sendMessage(e) {
    e.preventDefault();

    const messageContent = messageContentInput.value;

    if(!messageContent) {
        alert('Please enter a message!');
        return;
    } else {
        addMessage(userName, messageContent);
        messageContentInput.value = '';
    }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');

  if (author === userName) {
    message.classList.add('message--self');
  }

  message.innerHTML = `
    <h3 class="message__author">${author === userName ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;

  messagesList.appendChild(message);
}
