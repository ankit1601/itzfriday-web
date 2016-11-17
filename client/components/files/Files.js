import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {List, ListItem} from 'material-ui/List';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';

const styles = {
  listItem : {
	textDecoration: 'none',
	color: '#424242'
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
        onTouchTap={this.handleClose}
      />
    ];

    const filesList = [];
    for (let i = 0; i < 30; i++) {
      filesList.push(
        <label onClick={this.handleDownload}>
        <ListItem
          key={i}
          style={styles.listItem}
          leftIcon={<FileFileDownload/>}
        >
        {i + 1}
        </ListItem>
        </label>
      );
    }

    return (
      <div>
        <RaisedButton label="files" onTouchTap={this.handleOpen} />
        <Dialog
          title="Files"
          titleStyle={{color: 'white', backgroundColor: '#607D8B'}}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <List>
            {filesList}
          </List>
        </Dialog>
      </div>
    );
  }
}