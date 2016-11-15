import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBarForChannel from './ChatToolBarForChannel';

class ChatBox extends Component {
  constructor(props) {
    super(props);
  }
	render() {
		return (
				<Grid>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                        <ChatToolBarForChannel /> 
                  </Col>
        			</Row>
        			<Row>
          				<Col xs={12} md={4}>{this.props.params.name=='undefined'?Buddy:this.props.params.name}</Col>
        			</Row>
      			</Grid>
			)
	}
}

export default ChatBox;