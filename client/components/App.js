import React, { Component } from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import LoggedInLayout from './layout/loggedIn/LoggedInLayout';
import Message from './message/Message';
import Channel from './channel/Channel';
import Profile from './account/Profile';
import Chat from './chats/ChatBox';

class App extends Component {
	
	render() {
		return (
			<Router history={hashHistory}>
			<Route path="/" component={LoggedInLayout}>
			<IndexRoute component={Message}></IndexRoute>
			<Route path="chat/" component={Chat}></Route>
			<Route path="channel/" component={Channel}></Route>
			<Route path="profile/" component={Profile}></Route>
			<Route path="buddy/" component={Channel}></Route>
			</Route>
			</Router>
			)
	}
}

export default App;