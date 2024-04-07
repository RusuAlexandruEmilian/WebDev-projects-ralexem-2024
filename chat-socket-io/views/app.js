const socket = io('localhost:3000')

let username = '';

//Connect-box elements
const chatUser = document.getElementById('username')
const join_button = document.getElementById('join')
const connect_box = document.querySelector('.connect-box')

join_button.addEventListener('click', () => {
    username = chatUser.value
    chatUser.value = '';
    chat_box.classList.add('active')
    connect_box.classList.remove('active')
    socket.emit('new-user', username)
})





//Chat-box elements
const messages = document.getElementById('messages')
const send_button = document.getElementById('send-message')
const message_input = document.getElementById('message-input')
const chat_box = document.querySelector('.chat-box')
const exit_button = document.querySelector('.exit-button')

socket.on('user-connected', name => {
    appendUserConnectedDisconnectedMessage(`${name} joined the chat`, '#00FF40')
})

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`, 'message')
})



exit_button.addEventListener('click', () => {
    socket.emit('user-disconnect', username)
    connect_box.classList.add('active')
    chat_box.classList.remove('active')
})

socket.on('user-left-message', name => {
    appendUserConnectedDisconnectedMessage(`${name} left the chat`, 'red')
})

send_button.addEventListener('click', () => {
    const msg = message_input.value
    appendMessage(`You: ${msg}`, 'my-message')
    socket.emit('message', msg);
    message_input.value = '';
})

function appendMessage(message, style_id) {
    const messageElement = document.createElement('div')
    messageElement.setAttribute('id', style_id)
    messageElement.innerHTML = message
    messages.append(messageElement)
}

function appendUserConnectedDisconnectedMessage(message, color) {
    const messageElement = document.createElement('div')
    messageElement.setAttribute('id', 'user-connected-alert')
    messageElement.style.color = color;
    messageElement.innerHTML = message
    messages.append(messageElement)
}

