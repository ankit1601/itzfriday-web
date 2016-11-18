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
import InvitedMemberDetails from './createProject/InvitedMemberDetails';
import InviteAccept from './createProject/InviteAccept';
import SendInvite from './sendInvite/SendInvite';
import BuddyAvatar from './buddyAvatar/BuddyAvatar';

class App extends Component {
	constructor(props)
	{
		super(props);
		this.state={loggedIn : false, invited: false};

		this.checkLoggedIn = this.checkLoggedIn.bind(this);
		this.checkInvited = this.checkInvited.bind(this);
	}
	checkLoggedIn(value) {
		if(value !== undefined) {
			this.setState({loggedIn: value})
		}
	}
	
	checkInvited(value) {
		if(value !== undefined) {
			this.setState({invited: value})
		}
	}
	

	render() {

		if(this.state.invited)
		{
			return (
			<Router key={ 1 } history={hashHistory}>
				<Route path="/" component={InviteAccept}></Route>
				<Route path="memberDetails/" checkInvited={this.checkInvited} component={InvitedMemberDetails}></Route>
			</Router>
			);	
		}
		else
		{
			if(this.state.loggedIn)
			{
			return (
			<Router key={ 2 } history={hashHistory}>
				<Route path="/" checkLoggedIn={this.checkLoggedIn}  component={LoggedInLayout}>
					<IndexRoute component={Message}></IndexRoute>
					<Route path="chat/" component={Chat}></Route>
					<Route path="addChannel/" component={AddChannel}></Route>
					<Route path="profile/" component={Profile}></Route>
					<Route path="buddy/" component={BuddyAvatar}></Route>
				</Route>
			</Router>
			);
			}
			else
			{
			
			return (
			<Router key= { 3 } history={hashHistory}>
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
}

export default App;
