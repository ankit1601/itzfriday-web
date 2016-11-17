import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {List, ListItem} from 'material-ui/List';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import {Grid, Row, Col} from 'react-flexbox-grid';

const styles = {
  downloadItem : {
	textDecoration: 'none',
	color: '#424242',
	cursor: 'pointer',
	margin: 'auto',
	textAlign: 'center',
	float: 'left',
	padding: '10px',
	}
}


export default class Files extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleDownload = () =>
  {
  	alert('file downloaded');
  };

  render() {
    const actions = [
      <FlatButton
        label="Close"
        labelStyle={{color: "white"}}
        backgroundColor={'#D32F2F'}
        primary={true}
        onTouchTap={this.handleClose}/>
    ];

    const filesList = [];
    for (let i = 0; i < 30; i++) {
      filesList.push(
        <label onClick={this.handleDownload} style={styles.downloadItem}>
        <div
          style={styles.listItem}
          >
          <img src="./../../resources/images/download.png" width="150"/>
          <br/>
        {i + 1}
        </div>
        </label>
      );
    }

    return (
    	
      	<div>
        <RaisedButton label="files" onTouchTap={this.handleOpen} />
        <Grid>
        <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
        <Dialog
          title="Files"
          titleStyle={{color: 'white', backgroundColor: '#607D8B'}}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
            {filesList}
        </Dialog>
        </Col>
        </Row>
        </Grid>
      </div>
    );
  }
}