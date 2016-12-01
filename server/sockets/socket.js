//Globals
var defaultRoom = 'general';
var rooms = ["General", "Developer"];
var chatMessages = [];
var participants = ['Ankit', 'Apurv'];
module.exports = function (socket) {

	 // send the new user their name and a list of users
  socket.emit('init', {
    rooms: rooms,
    chatMessages: chatMessages,
    participants: participants
  });

	// broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', data);
  });
}