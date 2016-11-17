import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Paper from 'material-ui/Paper'
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router';


const errorMessages = {
    numberError: "Please enter the correct confirmation code(number)"
}
const styles={
     paperStyle: {
        width: '100%',
        margin: 'auto',
        padding: '10px',
        height: window.innerHeight
      }
}

export default class ConfirmCode extends React.Component{
constructor(props){
  super(props);
  this.state={password: ''};
  this.enableButton= this.enableButton.bind(this);
  this.disableButton= this.disableButton.bind(this);
  this.submitForm = this.submitForm.bind(this);
  this.handleLinkEvent = this.handleLinkEvent.bind(this);
  this.state = {canSubmit:false};
  }
  enableButton() {
    this.setState({
      canSubmit:true
    });
  }

  disableButton() {
    this.setState({
      canSubmit:false
    });
  }
  submitForm(data) {
     alert(JSON.stringify(data));
  }
  handleLinkEvent(){
    alert(this.state.canSubmit);
    return this.state.canSubmit;
  }
    // var password=JSON.stringify(data.confirmCode);
    // if()
    // {
    //  alert("Please enter correct confirmation code");

    // }

render(){
    return(
      <Paper style={styles.paperStyle}>
      <Grid>
      <Row center="xs">
      <Col xs={12} sm={12} md={12} lg={12}>
      <h3 style={{color:'#607D8B'}}>Please enter the confirmation code sent to you via email</h3>
        <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}>
          <FormsyText
              name="confirmCode"
              validations="isNumeric"
              validationError={errorMessages.numberError}
              required
              floatingLabelText="Confirmation code"
              updateImmediately/><br />
          {
            this.state.canSubmit?(<Link to={"projectDetails/"}>
            <RaisedButton 
                type="submit"
                label="Continue"
                primary={true}
                backgroundColor="#4CAF50"
                disabled={!this.state.canSubmit}/>
                </Link>):(<RaisedButton 
                type="submit"
                label="Continue"
                primary={true}
                disabled={!this.state.canSubmit}/>)
          }          
        </Formsy.Form>
        </Col>
        </Row>
        </Grid>
      </Paper>
          );
           
  }
}