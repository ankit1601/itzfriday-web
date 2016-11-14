import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme  from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import {red500} from 'material-ui/styles/colors';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-box';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';

const errorMessages = {
    emailError: "Please enter valid email",
    numericError: "Please provide a password"
};

export default class Login extends React.Component{
	constructor(props){
		super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
		this.state={canSubmit:false};
	}
  enableButton() {
    this.setState({
      canSubmit: true
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false
    });
  }

  submitForm(data) {
    alert(JSON.stringify(data, null, 4));
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }
	render(){
		const muiTheme1 = getMuiTheme({
      palette: {
        background: red500,
      }
    });
  const imgUrl ='./../images/leaves.jpg';
  const multiUIStyle ={
    style:{ height: 400,
            width: 400,
            display: 'inline-block',
            position:'relative',
            marginTop:200
          },
    root: {
            backgroundImage: 'url(' + imgUrl + ')',
            backgroundSize: 'cover',
            height:'100vh',
            overflowY: 'hidden'
        }
  }

  const imageSize = {
    mystyle:{height:100,width:100}
  };
		return(
/*			<MuiThemeProvider muiTheme ={muiTheme1}>*/
     <div style={multiUIStyle.root}>
        <Grid>
         <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
             <Row center="lg">
                  <Paper zDepth={1} style={multiUIStyle.style}>
                  <Col lg={12} md={12} sm={12} xs={12}>
                        <ActionAccountCircle style={imageSize.mystyle}/>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={12}>
                  <Formsy.Form
                     onValid={this.enableButton}
                     onInvalid={this.disableButton}
                     onValidSubmit={this.submitForm}
                     onInvalidSubmit={this.notifyFormError}>
                      <Row center="lg">
                        <Col lg={12} md={12} sm={12} xs={12}>
                             <FormsyText
                                type="email"
                                name="email"
                                validations="isEmail"
                                validationError={errorMessages.emailError}
                                required
                                hintText="Enter your Email"
                                floatingLabelText="Email"
                                updateImmediately
                            />
                        </Col>
                      </Row>
                      <Row center="lg"> 
                          <Col lg={12} md={12} sm={12} xs={12}>
                            <FormsyText
                                type="password"
                                name="password"
                                validations="isLength:10"
                                validationError={errorMessages.numericError}
                                required
                                hintText="Enter your password"
                                floatingLabelText="Password"
                                updateImmediately
                            />
                          </Col>
                      </Row>
                      <Row start="lg">
                        <Col lg={6} md={6} sm={6} xs={6}>
                           <a href="#"><RaisedButton
                                type="button"
                                label="Forgot Password"
                                primary={true}
                          /></a>
                           <RaisedButton
                                type="submit"
                                label="Login"
                                primary={true}
                                disabled={!this.state.canSubmit}
                          />
                        </Col>
                      </Row>
                  </Formsy.Form>
                  </Col>
                  </Paper>
            </Row>
          </Col>
        </Row>
      </Grid>
      </div>
			/*</MuiThemeProvider>*/
		);
	}
}