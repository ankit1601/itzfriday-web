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
import Avatar from 'material-ui/Avatar';

import SocialNotifications from 'material-ui/svg-icons/social/notifications';
import SocialPerson from 'material-ui/svg-icons/social/person';
import ImageDehaze from 'material-ui/svg-icons/image/dehaze';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import HardwareTv from 'material-ui/svg-icons/hardware/tv';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ImageTagFaces from 'material-ui/svg-icons/image/tag-faces';

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
			appBarTitle: currentProject,	//last project opened
			imageLogoUrl: './../../resources/images/buddy.png',
		};

		let lastIndexOfProjects = projects.length - 1;

		for( let index in projects)
		{
			projectList.push(<ListItem key={index} style={styles.projectListItem} Color={green100} onTouchTap={() => this.openThisProject(projects[index])}>{projects[index]}</ListItem>);
			if(index < lastIndexOfProjects)
				projectList.push(<Divider />);
		}

		this.openThisProject(currentProject);
		
	}

	openThisProject = (e) =>
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



		for( let index in members)
		{
			messages.push(<ListItem key={listKey} style={styles.linkItem} onTouchTap={() => this.handleChat(members[index],'message')} leftIcon={<SocialPerson />}>{members[index]}</ListItem>);
			listKey++;
		}

		for( let index in groups)
		{
			channels.push(<ListItem key={listKey} style={styles.linkItem} onTouchTap={() => this.handleChat(groups[index],'channel')} leftIcon={<SocialPerson />}>{groups[index]}</ListItem>);
			listKey++;
		}

		channels.push(<Divider />);
		channels.push(<Link to={"addChannel/"} style={styles.linkItem} ><ListItem key={-1} leftIcon={<ContentAddCircle />}>Create channel</ListItem></Link>);
		channels.push(<Divider />);



		this.setState({appBarTitle: currentProject});
		this.props.router.replace("chat/?name=KickBot&identifier=message");
	}

	handleChat = (name,identifier) => 
	{
		this.props.router.replace('/chat/?name='+name+'&identifier='+identifier);
		this.closeMainMenu();
	}

	handleAccount = (e) => 
	{
		this.closeMainMenu();
	}

	signOut = (e) =>
	{
		this.props.router.replace('/login/');
		this.props.route.checkLoggedIn(false);
	}

	changeLogo = (url) =>
	{
		this.setState({imageLogoUrl : url});
	}

	toggleMainMenu = () => this.setState({mainMenuOpen: !this.state.mainMenuOpen});

	closeMainMenu = () => this.setState({mainMenuOpen: false});

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
					<IconButton onTouchTap={this.toggleMainMenu}>
					<ImageDehaze color={grey50} />
					</IconButton>
					</span>		
				}/>

				<Drawer
				docked={false}
				open={this.state.mainMenuOpen}
				openSecondary={true}
				onRequestChange={(mainMenuOpen) => this.setState({mainMenuOpen})}
				>
				<List>
				<ListItem id="project" key="project" style={styles.projectNameListItem}>
				<h3><u>{this.state.appBarTitle}</u></h3>
				</ListItem>
				<Divider />
				<Link to={"chat/"+"?name=KickBot&identifier=message"} style={styles.listItem} onTouchTap={this.handleMessages}><ListItem key="friday" id="friday" leftIcon={<ImageTagFaces />} style={styles.listItem}><strong>Friday</strong></ListItem></Link>
				<Divider />
				<ListItem id="channels" key="channels" style={styles.listItem} initiallyOpen={true} primaryTogglesNestedList={true}
				nestedItems={channels}>
				<strong>Channels</strong>
				</ListItem>
				<ListItem id="messages" key="messages" style={styles.listItem} initiallyOpen={false} primaryTogglesNestedList={true}
				nestedItems={messages}>
				<strong>Messages</strong>
				</ListItem>
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