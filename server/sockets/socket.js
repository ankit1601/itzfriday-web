//Globals
var defaultRoom = 'general';
var rooms = ["General", "Developer"];
var chatMessages = [];
var participants = ['Ankit', 'Apurv'];
var isValid = false;
module.exports = function (socket) {

  // send the new user their name and a list of users
  /*socket.emit('init', {
    rooms: rooms,
    chatMessages: chatMessages,
    participants: participants
  });*/
// validate a user
  socket.on('authenticating', function (data) {
    console.log(data);
    if(data ==='1234526'){
      isValid = true;
    }else {
      isValid = false;
    }
  });

	// broadcast a user's message to other users
  socket.on('send:message', function (data) {
    if(isValid){
      socket.broadcast.emit('send:message', data);
    }
  });
}