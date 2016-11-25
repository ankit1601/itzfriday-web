import React from 'react';
import {Link} from 'react-router';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';


const styles = {
	paper: {
		margin: '0px 0px 0px 10px',
		background: "white",
		width: "100%",
		textIndent: '20px',	
	},
}

export default class Dashboard extends React.Component
{
	constructor(props) {
		super(props);
		
	}

	render()
	{
		return (
			<Grid>
			<Row>
			<Paper id="dashboard" style={styles.paper}>
				<Col xs={12} sm={12} md={12} lg={12} >
					<h3>Dashboard</h3>
				</Col>
			</Paper>
			</Row>
			</Grid>
			);
	}
}