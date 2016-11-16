import React from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {grey400,cyan50,red500,grey500,grey100,blueGrey100,blueGrey50} from 'material-ui/styles/colors';
import {Grid, Row, Col} from 'react-flexbox-grid'
import Avatar from 'material-ui/Avatar';
import {Link} from 'react-router';

const styles ={
  paperStyle:{backgroundColor:blueGrey50,
    height:window.innerHeight,
    padding:10,
    width:"100%"
  },
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
      <Grid>
      <Paper style={styles.paperStyle}>
        <Link to={"login/"}><RaisedButton label="Sign In"
            labelPosition="before"
            primary={true}
            style={{}}
            icon={<ActionAccountCircle />}/></Link>
        <Row>
          <span style={{marginTop:100,margin:'auto'}}>
          <Avatar style={{backgroundColor:"#004D40"}} src="./../../resources/images/buddy.png" alt="qwerty" size={150}/>
          </span> 
        </Row>
        <Row center="xs">
          <h1>A messaging app for teams who see through the Earth</h1>
          <p>The IceCube Collaboration is one of tens of thousands of teams around the world using Slack to make their working lives simpler, more pleasant, and more productive.</p>
        </Row>
        <Row center="xs">
        <Col lg={ 12 }
                 md={ 12 }
                 sm={ 12 }
                 xs={ 12 }>
          <TextField
            type="email" 
            floatingLabelText="Email Address"
            onChange={this.handleChange}
            errorText={this.state.error}/>
        </Col>
        <Col lg={ 12 }
                 md={ 12 }
                 sm={ 12 }
                 xs={ 12 }>
           <Link to={"confirmationCode/"}><RaisedButton 
                          label="Create Project"
                          disabled={this.state.buttonState}
                          onClick={this.handleClick}
                          primary={true}/></Link>
        </Col>
        </Row>
      </Paper>
      </Grid>);
  }

}
