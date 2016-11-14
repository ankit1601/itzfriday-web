import React from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router';

export default class Message extends React.Component
{
	constructor(props)
	{
		super(props);


	}

	render()
	{
		console.log(this.props.params.name);
		return(
			<div>
				You can now chat with {this.props.params.name=='undefined'?Buddy:this.props.params.name}.
			</div>
			);
	}
}