import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Formsy from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton';
import { red500 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-box';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ChangePassword from './ChangePassword';
import Dialog from 'material-ui/Dialog';
const errorMessages = {
  emailError: "Please enter valid email",
  numericError: "Please provide a password"
};

const styles = {
  loginStyle: {
    marginTop: window.innerHeight/4.5,
    marginLeft: "auto",
    marginRight: "auto"
  }
}
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.state = {
      canSubmit: false,
      open: false
    };
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
    console.log(JSON.stringify(data, null, 4));
    this.props.route.checkLoggedIn(true);
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }
  render() {
    const imageSize = {
      mystyle: {
        height: 100,
        width: 100
      }
    };
    return (
      <Grid>
        <Col xs={12}>
          <Card zDepth={ 2 } style={styles.loginStyle}>
            <Row center="xs">
              <Formsy.Form
                       onValid={ this.enableButton }
                       onInvalid={ this.disableButton }
                       onValidSubmit={ this.submitForm }
                       onInvalidSubmit={ this.notifyFormError }>
                <ActionAccountCircle style={ imageSize.mystyle } />
                <CardText>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <FormsyText
                          type="email"
                          name="email"
                          validations="isEmail"
                          validationError={ errorMessages.emailError }
                          required
                          hintText="Enter your Email"
                          floatingLabelText="Email"
                          updateImmediately />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <FormsyText
                          type="password"
                          name="email"
                          validationError={ errorMessages.emailError }
                          required
                          hintText="Enter your Email"
                          floatingLabelText="Email"
                          updateImmediately />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <Link to={ "ForgotPassword/" }>
                      <FlatButton
                          label="Forgot Password?"
                          secondary={ true }></FlatButton>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <RaisedButton
                            type="submit"
                            label="Login"
                            primary={ true }
                            disabled={ !this.state.canSubmit } />
                  </Col>
                </Row>
                </CardText>
              </Formsy.Form>
            </Row>
          </Card>
        </Col>
      </Grid>
      );
  }
}