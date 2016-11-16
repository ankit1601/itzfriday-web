import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import {blue500} from 'material-ui/styles/colors';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {Link} from 'react-router';

 const errorMessages = {
    wordsError: "Please only use letters",
    emailError: "Please enter valid email ID(someone@example.com)",
    passwordError: "Password should be of minimum 8 characters(including special and numeric characters)",
    confirmPasswordError: "Password and confirm password do not match",
 }
  const styles={
    	paperStyle: {
      	width: '100%',
      	margin: 'auto',
      	padding: '10px',	
      	height: window.innerHeight,
    	}
   }
export default class ProjectCreator extends React.Component{
	constructor(props){
	super(props);
	this.state={password: ''};
	this.enableButton= this.enableButton.bind(this);
	this.disableButton= this.disableButton.bind(this);
	this.submitForm = this.submitForm.bind(this);
	this.notifyFormError = this.notifyFormError.bind(this);
	this.state = {canSubmit:false,errorMsg:''};
	this.handleChange=this.handleChange.bind(this);
	}
	handleChange()
	{
		this.setState({errorMsg:''})
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

  	var password=JSON.stringify(data.Password);
  	var confirmpassword=JSON.stringify(data.ConfirmPassword);
  	
  	if(password!==confirmpassword)
  	{	
	this.setState({errorMsg:"Password and confirm password do not match"});
	return false;
  	}
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

	render(){
   		return(	
		  <Grid>
		  <Paper style={styles.paperStyle}>
		  <Row>
		  <div  style={{margin:'auto'}}>
		  <Col xs={12} sm={12} md={12} lg={12}>
		    <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}>
            <div>
			<div>
			<strong><h2 style={{color:'#607D8B'}}>Enter your details</h2></strong>
			</div>
    		<FormsyText
              		  name="FullName"
              		  onChange={this.handleChange}
    			      hintText="Full Name"
    			      validations="isWords"
                      validationError={errorMessages.wordsError}
              		  required
				      floatingLabelText="Full name"/><br />
			<FormsyText
					  name="Email"
					  onChange={this.handleChange}
				      hintText="Email"
				      validations="isEmail"
				      validationError={errorMessages.emailError}
				      required
				      floatingLabelText="Email ID"
				      updateImmediately/><br />
			<FormsyText
				      name="ProjectTitle"
				      onChange={this.handleChange}
				      hintText="Project Title"
				      required
				      floatingLabelText="Project Title"
				      updateImmediately/><br />
			<FormsyText
				      name="Password"
				      onChange={this.handleChange}
				      hintText="Password"
				      validations="minLength:8"
				      type="password"
				      validationError={errorMessages.passwordError}
				      required
				      floatingLabelText="Password"
				      updateImmediately/><br />
			<FormsyText
				      name="ConfirmPassword"
				      onChange={this.handleChange}
				      hintText="Same as password"
				      validations="minLength:8"
				      type="password"
				      validationError={errorMessages.confirmPasswordError}
				      required
				      floatingLabelText="Confirm Password"	
				      updateImmediately/><br />
			<div>
					{this.state.errorMsg}
			</div>
			<Link to={"sendInvite/"}><RaisedButton
			  type="submit"
              label="SUBMIT"
              backgroundColor="#4CAF50"
              disabled={!this.state.canSubmit}/></Link>
              </div>
         </Formsy.Form>
        </Col>
        </div>
        </Row>
        </Paper>
        </Grid>
      );
	}
}
