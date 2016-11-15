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
      canSubmit: false
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
    alert(JSON.stringify(data, null, 4));
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }
  render() {
    const muiTheme1 = getMuiTheme({
      palette: {
        background: red500,
      }
    });
    const styles = {
      paper:{
        padding:'50px'
      }
    }
    return (
      <div>
        <Grid>
          <Row>
            <Col
                 lg={ 12 }
                 md={ 12 }
                 sm={ 12 }
                 xs={ 12 }>
            <Row center="xs">
              <Paper
                     zDepth={ 2 }
                     style={ styles.paper }>
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
                  <Row>
                    <Col
                         lg={ 12 }
                         md={ 12 }
                         sm={ 12 }
                         xs={ 12 }>
                    <RaisedButton
                                  type="submit"
                                  label="Reset Password"
                                  primary={ true }
                                  disabled={ !this.state.canSubmit } />
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
      );
  }
}