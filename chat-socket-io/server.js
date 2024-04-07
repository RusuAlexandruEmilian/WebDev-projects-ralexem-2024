const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
        console.log(users)
    })
    socket.on('message', msg => {
        socket.broadcast.emit('chat-message', { message: msg, name: users[socket.id] })
    })

    socket.on('user-disconnect', name => {
        socket.broadcast.emit('user-left-message', users[socket.id])
    })
})

