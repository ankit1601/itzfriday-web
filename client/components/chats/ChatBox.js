import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';
import ChatWindow from './ChatWindow';
import IO from 'socket.io-client';

var socket = null;
var name = ''; 
const chatMessages = [];
class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      chatRooms: [],
      participants: [],
      userTyping: '',
    }
    this.tokenNameProcessor = this.tokenNameProcessor.bind(this);
  }
  tokenNameProcessor(){
    let name = JSON.parse(atob(localStorage['verifyFriday'].split('.')[1])).name;
    return name;
  }
  componentDidMount() {
    socket.on('init', this._initializeConversation.bind(this))
    socket.on('send:message', this._recieveMessage.bind(this));
    socket.on('notify', this._notifyUser.bind(this));
  }
  _notifyUser(user) {
    if(user !== undefined) {
      setTimeout(this.setState({userTyping: user}),1000);
    }
  }
  componentWillMount() {
    socket = IO.connect({'query': 'token=' + localStorage['verifyFriday']});
    socket.on('error', this._socketConnectionError.bind(this));
    socket.on('connected', this._getConnectedUser.bind(this));
  }
  _getConnectedUser(user) {
    name = user;
  }
  _socketConnectionError(err) {
    console.log(err)
  }
  _initializeConversation(data) {
    console.log("Data"+data);
  }
  _recieveMessage(message) {
    chatMessages.push(message);
    this.setState({chatMessages});
  }
  notifyTyping() {
    console.log(name);
    socket.emit('notify', name);
  }
  addChatMessages(message) {
    chatMessages.push(message);
    this.setState({chatMessages});
    socket.emit('send:message', message);
  }
	render() {
		return (
				<Grid>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                        <ChatToolBar name={this.props.location.query.name} identifier={this.props.location.query.identifier} participants={this.state.participants}/> 
                  </Col>
        			</Row>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                    <ChatWindow name={name} chatMessages={this.state.chatMessages} addMessage={this.addChatMessages.bind(this)} userTyped={this.state.userTyping} notifyTypingUser={this.notifyTyping.bind(this)}/>
                  </Col>
        			</Row>
      			</Grid>
			)
	}
}

export default ChatBox;