import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton'
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import ViewList from 'material-ui/svg-icons/action/view-list';
import IconMenu from 'material-ui/IconMenu';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


class ChatToolBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			channel : {
				name: "bobthebuilder"
			}
		}
	}
	render() {
		const muteText = "Mute "+this.state.channel.name;
		const leaveText = "Leave "+this.state.channel.name;
		return (
				<Toolbar>
					<ToolbarGroup firstChild={true}>
						<ToolbarTitle text={this.state.channel.name} />
					</ToolbarGroup>
					<ToolbarGroup>
						<IconMenu
    						iconButtonElement={<IconButton><SettingsIcon /></IconButton>}
    						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    						targetOrigin={{horizontal: 'left', vertical: 'top'}}
  						>

							<MenuItem primaryText="Invite member to join" />
							<MenuItem primaryText="View channel details" />
							<Divider />
							<MenuItem primaryText={muteText} />
							<Divider />
							<MenuItem primaryText={leaveText} />
    					</IconMenu>
    					<IconMenu
    						iconButtonElement={<IconButton><i className="material-icons">chrome_reader_mode</i></IconButton>}
    						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    						targetOrigin={{horizontal: 'left', vertical: 'top'}}
  						>
  							<MenuItem primaryText="Team Members"/>
							<MenuItem primaryText="Ankit" rightIcon={<CommunicationChatBubble />}/>
							<MenuItem primaryText="Apurv" rightIcon={<CommunicationChatBubble />}/>
							<MenuItem primaryText="Gobinda" rightIcon={<CommunicationChatBubble />}/>
							<MenuItem primaryText="Suganya" rightIcon={<CommunicationChatBubble />}/>
							<MenuItem primaryText="Ruchika" rightIcon={<CommunicationChatBubble />}/>
							<MenuItem primaryText="Vikram" rightIcon={<CommunicationChatBubble />}/>
    					</IconMenu>
    					<ToolbarSeparator />
    					<IconMenu
    						iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    						targetOrigin={{horizontal: 'left', vertical: 'top'}}
  						>

							<MenuItem primaryText="Your Files" leftIcon={<i className="material-icons">description</i>}/>
							<MenuItem primaryText="All Files" leftIcon={<i className="material-icons">library_books</i>}/>
							<Divider />
							<MenuItem primaryText="Help" leftIcon={<i className="material-icons">help</i>}/>
    					</IconMenu>
					</ToolbarGroup>
				</Toolbar>
			)
	}
}

export default ChatToolBar;