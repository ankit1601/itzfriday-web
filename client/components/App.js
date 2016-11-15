import React, { Component } from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import LoggedInLayout from './layout/loggedIn/LoggedInLayout';
import Chat from './chats/ChatBox';
import Channel from './channel/Channel';

class App extends Component {
	
	render() {
		return (
			<Router history={hashHistory}>
			<Route path="/" component={LoggedInLayout}>
			<IndexRoute component={Chat}></IndexRoute>
			<Route path="chat/:name" component={Chat}></Route>
			<Route path="channel/:name" component={Channel}></Route>
			</Route>
			</Router>
			)
	}
}

export default App;