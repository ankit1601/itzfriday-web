import React, { Component } from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import LoggedInLayout from './layout/loggedIn/LoggedInLayout';
import NotLoggedInLayout from './layout/notloggedin/NotLoggedInLayout';
import Message from './message/Message';
import AddChannel from './channel/AddChannel';
import Profile from './account/Profile';
import Chat from './chats/ChatBox';
import Login from './login/Login';
import ForgotPassword from './login/ForgotPassword';
import CreateProject from './createProject/CreateProject';
import ConfirmCode from './createProject/ConfirmCode';
import ProjectCreator from './createProject/ProjectCreator';
import SendInvite from './sendInvite/SendInvite';


class App extends Component {
	constructor(props)
	{
		super(props);
		this.state={loggedIn : false};
		this.checkLoggedIn = this.checkLoggedIn.bind(this);
	}
	checkLoggedIn(value) {
		if(value !== undefined) {
			this.setState({loggedIn: value})
		}
	}
	
	render() {
		if(this.state.loggedIn)
		{
		return (
			<Router key={ 1 } history={hashHistory}>
				<Route path="/" checkLoggedIn={this.checkLoggedIn}  component={LoggedInLayout}>
					<IndexRoute component={Message}></IndexRoute>
					<Route path="chat/" component={Chat}></Route>
					<Route path="addChannel/" component={AddChannel}></Route>
					<Route path="profile/" component={Profile}></Route>
					<Route path="buddy/" component={AddChannel}></Route>
				</Route>
			</Router>
			);
		}
		else
		{
			
		return (
			<Router key= { 2 } history={hashHistory}>
			<Route path="/" component={NotLoggedInLayout}>
				<IndexRoute component={CreateProject}></IndexRoute>
				<Route checkLoggedIn={this.checkLoggedIn} path="login/" component={Login}></Route>
				<Route path="confirmationCode/" component={ConfirmCode}></Route>
				<Route path="projectDetails/" component={ProjectCreator}></Route>
				<Route path="sendInvite/" checkLoggedIn={this.checkLoggedIn} component={SendInvite}></Route>
				<Route path="ForgotPassword/" component={ForgotPassword}></Route>
			</Route>
			</Router>
			);	
		}
	}
}

export default App;
