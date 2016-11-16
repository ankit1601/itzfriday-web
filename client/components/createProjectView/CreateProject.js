import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {grey400,cyan50,red500,grey500,grey100,blueGrey100,blueGrey50} from 'material-ui/styles/colors';
import {Grid, Row, Col} from 'react-flexbox-grid'
const styles ={
  buttonStyle: {margin: 10,float:'right'},
  textboxStyle:{marginLeft:180,marginTop:20},
  createProjectbuttonStyle:{marginLeft:180,marginTop:10},
  paperStyle:{backgroundColor:blueGrey50,height:760},
  floatingLabelStyle:{color:red500},
  floatingLabelFocusStyle:{color:red500},
  underlineStyle:{borderColor: red500},
  divWrapper:{width:600,height:200,WebkitBorderRadius: 20,MozBorderRadius: 10,borderRadius: 20,backgroundColor:'#CCE3E2',marginLeft:500,marginTop:50},
  heading:{textAlign:'center',paddingTop:250},
  paragraph:{textAlign:'center'}

};

export default class CreateProject extends React.Component
{
  constructor(props)
  {
    super(props);
    this.handleChange=this.handleChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.state={email:'',buttonState:true,error:''};
  }
  handleChange(event)
  {
    this.setState({email:event.target.value});
    if(event.target.value=='')
    {
      this.setState({buttonState:true});
      this.setState({error:''});
    }
    else
      this.setState({buttonState:false});
  }
  handleClick()
  {
    var validExpre=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    var msg;
    var username=this.state.email;
   if(!validExpre.test(username))
    {
      msg="Enter valid email";
      this.setState({error:msg});
    }
    else
    {
      msg="";
      this.setState({error:msg});
    }
  }

  render()
  { 
    return(
      <Paper style={styles.paperStyle}>
        <RaisedButton label="Sign In"
            labelPosition="before"
            primary={true}
            icon={<ActionAccountCircle />}
            style={styles.buttonStyle}/>
        <RaisedButton label="Logo"
            primary={true}
            style={{float:'left',margin:10}}/>

        <h1 style={styles.heading}>A messaging app for teams who see through the Earth</h1>
        <p style={styles.paragraph}>The IceCube Collaboration is one of tens of thousands of teams around the world using Slack to make their working lives simpler, more pleasant, and more productive.</p>
        
        <div style={styles.divWrapper}>
          <TextField style={styles.textboxStyle}
            type="email" 
            floatingLabelText="Email Address"
            onChange={this.handleChange}
            errorText={this.state.error}/>
            <RaisedButton style={styles.createProjectbuttonStyle}
                          label="Create Project"
                          disabled={this.state.buttonState}
                          onClick={this.handleClick}
                          primary={true}/>
        </div>
      </Paper>);
  }

}
