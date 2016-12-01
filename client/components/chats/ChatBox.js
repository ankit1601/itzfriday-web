import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';
import ChatWindow from './ChatWindow';
import IO from 'socket.io-client';

var socket = null;

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
  componentWillMount() {
    socket = IO.connect({'query': 'token=' + localStorage['verifyFriday']});
    socket.on('error', this._socketConnectionError.bind(this));
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
                    <ChatWindow name={this.props.location.query.name} chatMessages={this.state.chatMessages} addMessage={this.addChatMessages.bind(this)}/>
                  </Col>
        			</Row>
      			</Grid>
			)
	}
}

export default ChatBox;