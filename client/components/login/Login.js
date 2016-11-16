import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { red500 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-box';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import ChangePassword from './ChangePassword';
import Dialog from 'material-ui/Dialog';
const errorMessages = {
  emailError: "Please enter valid email",
  numericError: "Please provide a password"
};
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.notifyFormError = this.notifyFormError.bind(this);
    this.state = {
      canSubmit: false,open:false
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
    const styles = {
      paper: {
        padding: '50px'
      },
      gridAlign: {
        margin:'auto',
        marginTop: window.innerHeight/4
      }
    }
    return (
        <Grid style={styles.gridAlign}>
          <Row>
            <Col
                 lg={ 12 }
                 md={ 12 }
                 sm={ 12 }
                 xs={ 12 }>
            <Row center="xs">
              <Paper
                     zDepth={ 2 }
                     style={styles.paper}>
                <Col
                     lg={ 12 }
                     md={ 12 }
                     sm={ 12 }
                     xs={ 12 }>
                <ActionAccountCircle style={ imageSize.mystyle } />
                </Col>
                <Col
                     lg={ 12 }
                     md={ 12 }
                     sm={ 12 }
                     xs={ 12 }>
                <Formsy.Form
                             onValid={ this.enableButton }
                             onInvalid={ this.disableButton }
                             onValidSubmit={ this.submitForm }
                             onInvalidSubmit={ this.notifyFormError }>
                  <Row center="lg">
                    <Col
                         lg={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         xs={ 12 }>
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
                  <Row center="xs">
                    <Col
                         lg={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         xs={ 12 }>
                    <FormsyText
                                type="password"
                                name="password"
                                validationError={ errorMessages.numericError }
                                required
                                hintText="Enter your password"
                                floatingLabelText="Password"
                                updateImmediately />
                    </Col>
                  </Row>
                  <Row>
                    <Col
                         lg={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         xs={ 12 }>
                    <Link to={ "ForgotPassword/" }>  
                    <FlatButton
                                label="Forgot Password?"
                                secondary={ true }></FlatButton>
                    </Link>
                    </Col>
                    <Col
                         lg={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         xs={ 12 }>
                    <RaisedButton
                                  type="submit"
                                  label="Login"
                                  primary={ true }
                                  disabled={ !this.state.canSubmit }/>
                    </Col>
                  </Row>
                  <Row>
                  </Row>
                </Formsy.Form>
                </Col>
              </Paper>
            </Row>
            </Col>
          </Row>
        </Grid>
      );
  }
}