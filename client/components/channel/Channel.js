import React from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router';

export default class Channel extends React.Component
{
	constructor(props)
	{
		super(props);


	}

	render()
	{
		return(
			<div>
				This is a {this.props.location.query.name} channel chat window at {this.props.location.query.identifier}.
			</div>
			);
	}
}