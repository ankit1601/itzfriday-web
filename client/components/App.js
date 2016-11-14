import React, { Component } from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import LoggedInLayout from './layout/loggedIn/LoggedInLayout';
import Message from './message/Message';
import Channel from './channel/Channel';

class App extends Component {
	
	render() {
		return (
			<Router history={hashHistory}>
			<Route path="/" component={LoggedInLayout}>
			<IndexRoute component={Message}></IndexRoute>
			<Route path="message/:name" component={Message}></Route>
			<Route path="channel/:name" component={Channel}></Route>
			</Route>
			</Router>
			)
	}
}

export default App;