import React from 'react';
import {Link} from 'react-router';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {amber100,green100,orange100,grey50} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import SocialNotifications from 'material-ui/svg-icons/social/notifications';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import {List, ListItem} from 'material-ui/List';
import {Menu, MenuItem} from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

//styling

const header = {backgroundColor: '#E0F2F1',
	marginBottom: '10px',
	marginRight: '10px'
};

const iconButton = {
	color: 'white'
};

const container = {
	margin: '10px 0px 10px 0px',
	padding: '10px',
	height: window.innerHeight
};

const appBar = {
	color: 'white',
	backgroundColor: '#26A69A',
};

const mainMenu = {
};

const menuItem = {
	marginLeft: '10px',
	marginRight: '10px',
	color: '#607D8B'
};

const linkItem = {
	textDecoration: 'none',
	color: '#212121'
};

const projectMenuItem = {
	paddingLeft: '10px',
	color: '#607D8B'
};

export default class LoggedInLayout extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {mainMenuOpen: false}
		this.state = {appBarTitle: 'Buddy'};
	}

	handleChannel = (e) => 
	{
		this.setState({appBarTitle: e.target.innerHTML});
		this.closeMainMenu();
	};

	handleMessages = (e) => 
	{
		this.setState({appBarTitle: e.target.innerText});
		this.closeMainMenu();
	};

	toggleMainMenu = () => this.setState({mainMenuOpen: !this.state.mainMenuOpen});

	closeMainMenu = () => this.setState({mainMenuOpen: false});

	render() {
		return (
			<MuiThemeProvider>
			<div>
			<AppBar title={this.state.appBarTitle} style={appBar}
			zDepth={2}
			iconElementLeft={
				<IconButton>
				<img src="./../../resources/images/pandaBot.png" alt="qwerty" height="30"/>
				</IconButton>}
				iconElementRight={
					<span>
					<IconButton>
					<SocialNotifications color={grey50} />
					</IconButton>
					<FlatButton onTouchTap={this.toggleMainMenu}>
					<ImageDehaze color={grey50} />
					</FlatButton>
					</span>		
				} 
				/>

				<Drawer
				docked={false}

				open={this.state.mainMenuOpen}
				onRequestChange={(mainMenuOpen) => this.setState({mainMenuOpen})}
				>
				<Menu>
				<MenuItem id="project" style={projectMenuItem}>
				<h3><u>Project name</u></h3>
				</MenuItem>
				<Divider />
				<MenuItem id="channels" style={menuItem} 
				menuItems={[
                <MenuItem ><Link to={"channel/"+"General"} style={linkItem} onTouchTap={this.handleChannel}>General</Link></MenuItem>,
                <MenuItem ><Link to={"channel/"+"Acolyte"} style={linkItem} onTouchTap={this.handleChannel}>Acolyte</Link></MenuItem>,
                <MenuItem ><Link to={"channel/"+"Buddy"} style={linkItem} onTouchTap={this.handleChannel}>Buddy</Link></MenuItem>,
                <MenuItem ><Link to={"channel/"+"Rule"} style={linkItem} onTouchTap={this.handleChannel}>Rule</Link></MenuItem>,
              ]}
        >
					<strong>Channels</strong>
				</MenuItem>
				<MenuItem id="messages" style={menuItem}
				menuItems={[
                <MenuItem ><Link to={"message/"+"Buddy"} style={linkItem} onTouchTap={this.handleMessages}>Buddy</Link></MenuItem>,
                <MenuItem ><Link to={"message/"+"Gobinda"} style={linkItem} onTouchTap={this.handleMessages}>Gobinda</Link></MenuItem>,
                <MenuItem ><Link to={"message/"+"Ruchika"} style={linkItem} onTouchTap={this.handleMessages}>Ruchika</Link></MenuItem>,
                <MenuItem ><Link to={"message/"+"Apurv"} style={linkItem} onTouchTap={this.handleMessages}>Apurv</Link></MenuItem>,
                <MenuItem ><Link to={"message/"+"Suganya"} style={linkItem} onTouchTap={this.handleMessages}>Suganya</Link></MenuItem>,
                <MenuItem ><Link to={"message/"+"Ankit"} style={linkItem} onTouchTap={this.handleMessages}>Ankit</Link></MenuItem>,
                <MenuItem ><Link to={"message/"+"Vikram"} style={linkItem} onTouchTap={this.handleMessages}>Vikram</Link></MenuItem>,
              ]}
        >
					<strong>Messages</strong>
				</MenuItem>
				<Divider />
				<MenuItem id="accountSettings" style={menuItem} onTouchTap={this.closeMainMenu}>
					<strong>Account settings</strong>
				</MenuItem>
				<MenuItem id="notificationSettings" style={menuItem} onTouchTap={this.closeMainMenu}>
					<strong>Notification settings</strong>
				</MenuItem>
				<Divider />
				<MenuItem id="signOut" style={menuItem} onTouchTap={this.closeMainMenu}>
					<strong>Sign out</strong>
				</MenuItem>
				<Divider/>
				</Menu>
				</Drawer>
				<div id="content">

					<Paper id="container" zDepth={2} style={container}>
						
					{this.props.children}
					</Paper>
				</div>

				</div>

				
				</MuiThemeProvider>
				);
}
	
}