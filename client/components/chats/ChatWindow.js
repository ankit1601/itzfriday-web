import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ChatText from './ChatText';

const styles = {
  chatBox: {
    position: "relative",
    height: "100%",
    background: "white",
    padding: 0
  },
  messageList: {
    height: 380,
    listStyle: "none",
    overflow: "scroll",
    marginLeft: "-20px"
  },
  message: {
    zoom: 1,
    overflow: "hidden",
    marginTop: 15,
    padding: "2px"
  },
  actionBar: {
    position: "relative",
    width: "100%",
    borderTop: "1px solid #dae2e3"
  },
  inputArea: {
    height: 40,
    margin: 0,
    resize: "none",
    paddingTop: "10px !important",
    outline: "none",
    border: "none",
    textIndent: 5,
    backgroundColor: "#fff",
    width: "100%"
  },
  iconStyle: {
    marginLeft: "-18px"
  },
  smileyStyle: {
    marginLeft: "-12px"
  }
}

const chatMessages = [
            {
              author: "Gobinda",
              chatTime: "19:00:06 am",
              chatText: "Hi Kejru!",
              authorAvtar: "https://twitter.com/@gobinda_thakur/profile_image?size=original"
            },
            {
              author: "Arvind Kejriwal",
              chatTime: "19:01:06 am",
              chatText: "Hey Sir! Delhi aiye kavi.",
              authorAvtar: "https://twitter.com/@ArvindKejriwal/profile_image?size=original"
            }
          ]
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state= {
      canSubmit: false,
      chats: chatMessages,
      name: this.props.name
    };
  }
    enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  submitForm(data) {
    var newChat = {
      author: this.state.name,
      chatTime: "19:00:06 am",
      chatText: data.messages,
      authorAvtar: "https://twitter.com/@gobinda_thakur/profile_image?size=original"
    };
    chatMessages.push(newChat);
    this.setState({chats: chatMessages});
    this.refs.email.setState({value: ''});
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }
  render() {
    let listView = []
    for(let messages=0; messages < chatMessages.length; messages ++) {
           listView.push(<li key={messages} style = {styles.message}>
              <ChatText chats = {this.state.chats[messages]}/>
            </li>);
          }
    return (
        <Paper zDepth={1} style={styles.chatBox}>
          <ul style= {styles.messageList}>
            {listView}
          </ul>
          <div style={styles.actionBar}>
          <Formsy.Form
                    onValid={this.enableButton.bind(this)}
                    onInvalid={this.disableButton.bind(this)}
                    onValidSubmit={this.submitForm.bind(this)}
                    onInvalidSubmit={this.notifyFormError.bind(this)}
                  >
            <Grid>
              <Row center="xs" style={{padding: '5px 5px 5px 5px'}}>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <IconButton style={styles.smileyStyle}><i className="material-icons">tag_faces</i></IconButton>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8}>
                <FormsyText
                  name="messages"
                  validations="minLength:1"
                  validationError="Type your message"
                  required
                  hintText="Type your message"
                  style={styles.inputArea}
                  ref="email"
                  updateImmediately
                />
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                  <IconButton><i className="material-icons">attach_file</i></IconButton>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <IconButton
                    type="submit"
                    disabled={!this.state.canSubmit}
                    style={styles.iconStyle}
                  ><i className="material-icons">send</i></IconButton>
                </Col>
              </Row>
            </Grid>
            </Formsy.Form>
          </div>
        </Paper>
      )
  }
}

export default ChatWindow;