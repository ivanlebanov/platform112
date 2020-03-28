class Sockets {
  #io
  #onlineUsers = {}

  init (server) {
    this.#io = require('socket.io').listen(server)

    this.#io.on('connection', (socket) => {
      socket.on('SET_SOCKET_USER', userTokenOrId => {
        if (!this.#onlineUsers[userTokenOrId]) {
          this.#onlineUsers[userTokenOrId] = []
        }
        this.#onlineUsers[userTokenOrId].push(socket.id)
        console.log(this.#onlineUsers)
        this.#io.emit('USERS_ONLINE', this.#onlineUsers)
      })
    })
  }

  emit (eventName, payload, userId) {
    let userSockets = this.#onlineUsers[userId] || []
    userSockets.forEach(userSocket => {
      this.#io.to(userSocket).emit(eventName, payload)
    })
  }
}

module.exports = new Sockets()
