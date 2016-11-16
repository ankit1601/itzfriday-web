import React from 'react';
import {Link} from 'react-router';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {amber100,green100,orange100,grey50} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

import SocialNotifications from 'material-ui/svg-icons/social/notifications';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import HardwareTv from 'material-ui/svg-icons/hardware/tv';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';

//styling

const rootContainer = {
	margin: '0px 0px 0px 0px',
	padding: '0px 0px 0px 0px',
};

const iconButton = {
	color: 'white'
};

const container = {
	margin: '10px 0px 10px 0px',
	padding: '10px',
	background: "#e0f2f1"
};

const appBar = {
	color: 'white',
	backgroundColor: '#004D40',
};

const listItem = {
	color: '#607D8B'
};

const linkItem = {
	textDecoration: 'none',
	color: '#424242'
};

const projectListItem = {
	color: '#607D8B'
};

var messages=[];
var channels=[];

export default class LoggedInLayout extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {mainMenuOpen: false, appBarTitle: 'Buddy'};

		messages.push(<ListItem key={0} leftIcon={<SocialPerson />}><Link to={"chat/"+"?name=Buddy&identifier=message"} style={linkItem} onTouchTap={this.handleMessages}>Buddy</Link></ListItem>);
		messages.push(<ListItem key={1} leftIcon={<SocialPerson />}><Link to={"chat/"+"?name=Gobinda&identifier=message"} style={linkItem} onTouchTap={this.handleMessages}>Gobinda</Link></ListItem>);
		messages.push(<ListItem key={2} leftIcon={<SocialPerson />}><Link to={"chat/"+"?name=Ruchika&identifier=message"} style={linkItem} onTouchTap={this.handleMessages}>Ruchika</Link></ListItem>);
		messages.push(<ListItem key={3} leftIcon={<SocialPerson />}><Link to={"chat/"+"?name=Apurv&identifier=message"} style={linkItem} onTouchTap={this.handleMessages}>Apurv</Link></ListItem>);
		messages.push(<ListItem key={4} leftIcon={<SocialPerson />}><Link to={"chat/"+"?name=Suganya&identifier=message"} style={linkItem} onTouchTap={this.handleMessages}>Suganya</Link></ListItem>);
		messages.push(<ListItem key={5} leftIcon={<SocialPerson />}><Link to={"chat/"+"?name=Ankit&identifier=message"} style={linkItem} onTouchTap={this.handleMessages}>Ankit</Link></ListItem>);
		messages.push(<ListItem key={6} leftIcon={<SocialPerson />}><Link to={"chat/"+"?name=Vikram&identifier=message"} style={linkItem} onTouchTap={this.handleMessages}>Vikram</Link></ListItem>);
		
		channels.push(<ListItem key={7} leftIcon={<HardwareTv />}><Link to={"chat/"+"?name=General&identifier=channel"} style={linkItem} onTouchTap={this.handleChannel}>General</Link></ListItem>);
		channels.push(<ListItem key={8} leftIcon={<HardwareTv />}><Link to={"chat/"+"?name=Acolyte&identifier=channel"} style={linkItem} onTouchTap={this.handleChannel}>Acolyte</Link></ListItem>);
        channels.push(<ListItem key={9} leftIcon={<HardwareTv />}><Link to={"chat/"+"?name=Buddy&identifier=channel"} style={linkItem} onTouchTap={this.handleChannel}>Buddy</Link></ListItem>);
        channels.push(<ListItem key={10} leftIcon={<HardwareTv />}><Link to={"chat/"+"?name=Rule&identifier=channel"} style={linkItem} onTouchTap={this.handleChannel}>Rule</Link></ListItem>);
        channels.push(<Divider />);
        channels.push(<ListItem key={11} leftIcon={<ContentAddCircle />}><Link to={"channel/"} style={linkItem} onTouchTap={this.handleChannel}>Create channel</Link></ListItem>);
        channels.push(<Divider />);
	}

	handleChannel = (e) => 
	{
		this.closeMainMenu();
	};

	handleAccount = (e) => 
	{
		this.closeMainMenu();
	};

	handleMessages = (e) => 
	{
		this.closeMainMenu();
	};

	handleExpandIcon = (e) =>
	{
	
		
	};

	toggleMainMenu = () => this.setState({mainMenuOpen: !this.state.mainMenuOpen});

	closeMainMenu = () => this.setState({mainMenuOpen: false});

	render() {
		
        
		return (
			<MuiThemeProvider>
			<div style={rootContainer}>
			<AppBar title={this.state.appBarTitle} style={appBar}
			zDepth={2}
			iconElementLeft={
				<IconButton>
				<img src="./../../resources/images/buddy.png" alt="qwerty" height="30"/>
				</IconButton>}
				iconElementRight={
					<span>
					<IconButton>
					<SocialNotifications color={grey50} />
					</IconButton>
					<IconButton onTouchTap={this.toggleMainMenu}>
					<ImageDehaze color={grey50} />
					</IconButton>
					</span>		
				}/>

				<Drawer
				docked={false}
				open={this.state.mainMenuOpen}
				onRequestChange={(mainMenuOpen) => this.setState({mainMenuOpen})}
				>
				<List>
				<ListItem id="project" style={projectListItem}>
				<h3><u>Project name</u></h3>
				</ListItem>
				<Divider />
				<ListItem id="channels" style={listItem} initiallyOpen={true} primaryTogglesNestedList={true}
				nestedItems={channels}>
					<strong>Channels</strong>
				</ListItem>
				<ListItem id="messages" style={listItem} initiallyOpen={false} primaryTogglesNestedList={true}
				nestedItems={messages}>
					<strong>Messages</strong>
				</ListItem>
				<Divider />
				<ListItem id="accountSettings" style={listItem} initiallyOpen={false} primaryTogglesNestedList={true}
				nestedItems={[
					<ListItem ><Link to={"profile/"} style={linkItem} onTouchTap={this.handleAccount}>Profile</Link></ListItem>,
					<ListItem ><Link to={"buddy/"} style={linkItem} onTouchTap={this.handleAccount}>Buddy</Link></ListItem>,
					<Divider />
				]}>
					<strong>Account settings</strong>
				</ListItem>
				<ListItem id="notificationSettings" style={listItem} onTouchTap={this.closeMainMenu}>
					<strong>Notification settings</strong>
				</ListItem>
				<Divider />
				<ListItem id="signOut" style={listItem} onTouchTap={this.closeMainMenu}>
					<strong>Sign out</strong>
				</ListItem>
				<Divider/>
				</List>
				</Drawer>
				<div id="content">

					<Paper id="container" style={container}>
						
					{this.props.children}
					</Paper>
				</div>

				</div>

				
				</MuiThemeProvider>
				);
}
	
}