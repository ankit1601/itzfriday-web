import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';
import ChatWindow from './ChatWindow';

class ChatBox extends Component {
  constructor(props) {
    super(props);
  }
	render() {
		return (
				<Grid>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                        <ChatToolBar name={this.props.location.query.name} identifier={this.props.location.query.identifier}/> 
                  </Col>
        			</Row>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                    <ChatWindow />
                  </Col>
        			</Row>
      			</Grid>
			)
	}
}

export default ChatBox;