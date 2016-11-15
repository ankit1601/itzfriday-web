import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ChatToolBar from './ChatToolBar';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.query.key+'::'+this.props.location.query.name);
    this.state = {
      key: this.props.location.query.key,
      name: this.props.location.query.name
    }
  }
	render() {
		return (
				<Grid>
        			<Row>
          				<Col xs={12} sm={12} md={12} lg={12}>
                        <ChatToolBar /> 
                  </Col>
        			</Row>
        			<Row>
          				<Col xs={12} md={4}></Col>
        			</Row>
      			</Grid>
			)
	}
}

export default ChatBox;