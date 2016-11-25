import React from 'react';
import ReactDOM from 'react-dom';
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
import Avatar from 'material-ui/Avatar';

import SocialNotifications from 'material-ui/svg-icons/social/notifications';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import HardwareTv from 'material-ui/svg-icons/hardware/tv';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ImageTagFaces from 'material-ui/svg-icons/image/tag-faces';

import ChannelList from './../../conversation/ChannelList';
import MessageList from './../../conversation/MessageList';

//styling
const styles = {
	rootContainer : {
		margin: '0px 0px 0px 0px',
		padding: '0px 0px 0px 0px',
	},
	iconButton : {
		color: 'white'
	},
	container : {
		margin: '0px 0px 0px 0px',
		padding: '10px',
		background: "#e0f2f1",
	},
	appBar : {
		color: 'white',
		backgroundColor: '#004D40',
		width: '*',
	},
	projectList : {
		color: 'white',
		float: 'left',
		width: '150px',
		height: window.innerHeight,
		margin: '0px 0px 0px 0px',
		padding: '2px 2px 2px 2px',
	},
	projectListItem : {
		marginTop: '2px',
		color: '#424242',
	},
	listItem : {
		color: '#607D8B',
		textDecoration: 'none',
	},
	linkItem : {
		textDecoration: 'none',
		color: '#424242'
	},
	projectNameListItem : {
		color: '#607D8B'
	},
};

var messages= [];
var channels= [];
var projects = [];
var projectList = [];
var currentProject = '';
var members = [];
var groups = [];
var listKey = 0;
var isFirst = true;

export default class LoggedInLayout extends React.Component
{
	constructor(props)
	{
		super(props);

		listKey = 0;
		messages = [];
		channels = [];
		projectList = [];
		projects = ['Friday','Samarth','Semantic Web', 'QuizArt'];
		currentProject = 'Friday';

		this.state = {
			mainMenuOpen: false,
			appBarTitle: 'Dashboard',	//last project opened
			imageLogoUrl: './../../resources/images/buddy.png',
			channels: '',
			messages: '',
		};

		this.handleChannelChange = this.handleChannelChange.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
		this.openThisProject = this.openThisProject.bind(this);
		this.handleChat = this.handleChat.bind(this);
		this.handleAccount = this.handleAccount.bind(this);
		this.signOut = this.signOut.bind(this);
		this.toggleMainMenu = this.toggleMainMenu.bind(this);
		this.closeMainMenu = this.closeMainMenu.bind(this);
		this.changeLogo = this.changeLogo.bind(this);
		this.changeChannelState = this.changeChannelState.bind(this);
		this.changeMessageState = this.changeMessageState.bind(this);
		this.openDashboard = this.openDashboard.bind(this);
		this.setTitleToDashboard = this.setTitleToDashboard.bind(this);

		let lastIndexOfProjects = projects.length - 1;

		for( let index in projects)
		{
			projectList.push(<ListItem key={index} style={styles.projectListItem} Color={green100} onTouchTap={() => this.openThisProject(projects[index])}>{projects[index]}</ListItem>);
			if(index < lastIndexOfProjects)
				projectList.push(<Divider />);
		}
		
	}

	openDashboard ()
	{
		this.setTitleToDashboard();
		this.props.router.replace('dashboard/');
	}

	setTitleToDashboard ()
	{
		this.setState({appBarTitle: 'Dashboard'});
	}

	openThisProject (e)
	{
		currentProject = e;
		messages = [];
		channels = [];

		if( currentProject === 'Friday')
		{
			members=["Gobinda","Apurv","Ruchika","Suganya","Ankit","Vikram"];
			groups=["General","Acolyte"];

		}
		else if( currentProject === 'Samarth' )
		{
			members=["Amol","Ankit","Shinder","Ritesh","Kumari","Hari","Prerna"];
			groups=["General","Developers"];	
		}
		else if( currentProject === 'Semantic Web' )
		{
			members=["Sreenidhi","Toolika","Nanda","Shipra","Bala","Divyanshu"];
			groups=["General","Designers"];
		}
		else
		{
			members=["Vishant","Kirti","Dhivya","Lal","Srinivasan","Nitin"];
			groups=["General","Backend"];	
		}

		this.setState({appBarTitle: currentProject});
		
		this.changeChannelState(groups);
		this.changeMessageState(members);
;
		this.props.router.replace("chat/?name=KickBot&identifier=message");
	}

	changeChannelState (channels)
	{
		this.setState({channels});
	}
	
	changeMessageState (messages)
	{
		this.setState({messages});
	}

	handleChat (name,identifier) 
	{
		this.props.router.replace('/chat/?name='+name+'&identifier='+identifier);
		this.closeMainMenu();
	}

	handleChannelChange(name) 
	{
		this.props.router.replace('/chat/?name='+name+'&identifier=channel');
		this.closeMainMenu();
	}

	handleMessageChange(name) 
	{
		this.props.router.replace('/chat/?name='+name+'&identifier=message');
		this.closeMainMenu();
	}

	handleAccount (e) 
	{
		this.closeMainMenu();
	}

	signOut (e)
	{
		this.props.router.replace('/login/');
		this.props.route.checkLoggedIn(false);
	}

	changeLogo (url)
	{
		this.setState({imageLogoUrl : url});
	}

	toggleMainMenu () 
	{ 
		this.setState({mainMenuOpen: !this.state.mainMenuOpen});
	}

	closeMainMenu ()  
	{
		this.setState({mainMenuOpen: false});
	}

	render() {
		
		return (
			<MuiThemeProvider>
			<div style={styles.rootContainer}>
			<Paper zDepth={2} id="projects" style={styles.projectList}>
			<List>
			{projectList}
			</List>
			</Paper>

			<AppBar title={this.state.appBarTitle} style={styles.appBar}
			zDepth={2}
			iconElementLeft={
				<span>
				<Avatar backgroundColor={'transparent'} src={this.state.imageLogoUrl} alt="Friday" height="30"/>
				</span>}
				iconElementRight={
					<span>
					<IconButton>
					<SocialNotifications color={grey50} />
					</IconButton>
					<span id="toggleMainMenu">
						<IconButton onTouchTap={this.toggleMainMenu}>
						<ImageDehaze color={grey50} />
						</IconButton>
					</span>
					</span>		
				}
				onLeftIconButtonTouchTap={this.openDashboard}
				iconStyleLeft={{cursor: 'pointer'}}/>

				<Drawer
				docked={false}
				open={this.state.mainMenuOpen}
				openSecondary={true}
				onRequestChange={(mainMenuOpen) => this.setState({mainMenuOpen})}
				>
				<List>
				
				{
					this.state.appBarTitle === 'Dashboard' ? 
					(<ListItem id="project" key="project" disabled="true" style={styles.projectNameListItem}>
						<h3>&nbsp;</h3>
						</ListItem>
					) 
					: 
					(<ListItem id="project" key="project" style={styles.projectNameListItem}>
						<h3><u>{this.state.appBarTitle}</u></h3>
						</ListItem>
					)
				}
				
				<Divider />
				<Link to={"chat/"+"?name=KickBot&identifier=message"} style={styles.listItem} onTouchTap={() => this.handleChat('KickBot','message')}><ListItem key="friday" id="friday" leftIcon={<ImageTagFaces />} style={styles.listItem}><strong>Friday</strong></ListItem></Link>
				<Divider />

				<div id="channels">
					<ChannelList channels={this.state.channels} changeChannel={this.handleChannelChange} appBarTitle={this.state.appBarTitle}/>
				</div>
				
				<div id="messages">
					<MessageList messages={this.state.messages} changeMessage={this.handleMessageChange} appBarTitle={this.state.appBarTitle}/>
				</div>		
				
				<Divider />
				<ListItem id="accountSettings" key="accountSettings" style={styles.listItem} initiallyOpen={false} primaryTogglesNestedList={true}
				nestedItems={[
					<Link to={"profile/"} style={styles.linkItem} onTouchTap={this.handleAccount}><ListItem leftIcon={<SocialPerson />} key="profile" >Profile</ListItem></Link>,
					<Link to={"buddy/"} style={styles.linkItem} onTouchTap={this.handleAccount}><ListItem leftIcon={<ImageTagFaces />} key="buddy" >Buddy</ListItem></Link>,
					<Divider />
					]}>
					<strong>Account settings</strong>
					</ListItem>
					<ListItem id="notificationSettings" key="notificationSettings" style={styles.listItem} onTouchTap={this.closeMainMenu}>
					<strong>Notification settings</strong>
					</ListItem>
					<Divider />
					<ListItem id="signOut" key="signOut" style={styles.listItem} onTouchTap={this.signOut}>
					<strong>Sign out</strong>
					</ListItem>
					<Divider/>
					</List>
					</Drawer>

					
					<div id="content" style={styles.container}>

					{this.props.children}
					
					</div>

					</div>

					</MuiThemeProvider>
					);
}

}