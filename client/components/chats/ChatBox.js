import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';
import ChatWindow from './ChatWindow';
import IO from 'socket.io-client';

const socket = IO.connect();

const chatMessages = [];
class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessages: [],
      chatRooms: [],
      participants: []
    }
  }
  componentDidMount() {
    socket.on('init', this._initializeConversation.bind(this))
    socket.on('send:message', this._recieveMessage.bind(this));
  }

  _initializeConversation(data) {
    console.log("Data"+data);
    var { rooms, chatMessages, participants } = data;
    this.setState({chatMessages: chatMessages, chatRooms: rooms, participants: participants});
  }
  _recieveMessage(message) {
    chatMessages.push(message);
    this.setState({chatMessages});
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
                    <ChatWindow name={this.props.location.query.name} participants={this.state.participants} chatMessages={this.state.chatMessages} addMessage={this.addChatMessages.bind(this)}/>
                  </Col>
        			</Row>
      			</Grid>
			)
	}
}

export default ChatBox;