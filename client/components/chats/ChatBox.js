import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';

class ChatBox extends Component {
	render() {
		return (
				<Grid>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                        <ChatToolBar /> 
                  </Col>
        			</Row>
        			<Row>
          				<Col xs={12} md={4}>Hello, world!</Col>
        			</Row>
      			</Grid>
			)
	}
}

export default ChatBox;