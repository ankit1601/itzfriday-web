var IO = require('socket.io-client');

var socket;

export default {
	getSocketConnection() {
		if((IO.sockets === undefined || IO.sockets === null) && localStorage.token) {
			console.log("new socket connection created!!");
			socket = IO.connect({'query': 'token=' + localStorage.token});
			return socket;
		}else {
			return socket;
		}
	}
}