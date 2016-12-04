var jwt = require('jsonwebtoken');
//Globals
module.exports = function (socket) {

	// broadcast a user's message to other users
  socket.on('send:message', function (data) {
      socket.broadcast.emit('send:message', data);
  });

  socket.on('notify', function (user) {
      socket.broadcast.emit('notify', user);
  });
}