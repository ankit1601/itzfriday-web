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
        height: window.innerHeight,
      },
    	submitStyle: {
      	
    	}
}

export default class ConfirmCode extends React.Component{
constructor(props){
	super(props);
	this.state={password: ''};
	this.enableButton= this.enableButton.bind(this);
	this.disableButton= this.disableButton.bind(this);
	this.submitForm = this.submitForm.bind(this);
	this.state = {canSubmit:false};
	}
		//this.notifyFormError = this.notifyFormError.bind(this);


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
  	// var password=JSON.stringify(data.confirmCode);
  	// if()
  	// {
  	// 	alert("Please enter correct confirmation code");

  	// }

render(){
		return(
			
      <Grid>
      <Paper style={styles.paperStyle}>
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
			    <Link to={"projectDetails/"}><RaisedButton
			  	      type="submit"
              	label="Continue"
              	backgroundColor="#4CAF50"
                disabled={!this.state.canSubmit}/></Link>
        </Formsy.Form>
        </Col>
        </Row>
        </Paper>
        </Grid>
      
				  );
				   
	}
}