var express = require('express');
//var request = require('request');
var request = require('superagent');

var app = express();

var username = "aptDroid";
var repo = "HTML5";
var title = "issue of the day";
var body = "functional call to create issue";
var labels = ["bug"];
var authToken = "7f0ed551deb6af4ffe06174d17e3aed0294f98f9";
var assignees = "aptDroid";
var state = "open";
var issueNumber = 27
var comment = "testing commenT";

var postData = JSON.stringify({'title': title,'body':body, 'labels': labels, 'assignee': assignees, 'state' : state});

//create an issue
// app.use("/CreateIssue",function(req,res,next){

// 	request({
// 		method: 'POST',
// 		uri: 'https://api.github.com/repos/'+username+'/'+repo+'/issues?oauth_token='+authToken,
// 		headers : {
// 			'User-Agent': username,
// 			'Content-Type': 'application/json'
// 		},
// 		body : JSON.stringify({'title': title,'body':body, 'labels': labels, 'assignee': assignees, 'state' : 'open'}),
// 	},
// 	function(error,response,body){
// 		if(error)
// 		{
// 			return res.send(error);
// 		}

// 		 let data = JSON.parse(body);

// 		return res.send("New issue has been opened with number : "+data.number);
// 	});
// });


app.use("/CreateIssue",function(req,res,next){

	request.post('https://api.github.com/repos/'+username+'/'+repo+'/issues?oauth_token='+authToken)
	.set('User-Agent',username)
	.set('Content-Type','application/json')
	.send(postData)
	.end(function(error,response){
		if(error)
		{
			return res.send(error);
		}
		return res.send("New issue has been opened with number : ");
	});
	// request({
	// 	method: 'POST',
	// 	uri: 'https://api.github.com/repos/'+username+'/'+repo+'/issues?oauth_token='+authToken,
	// 	headers : {
	// 		'User-Agent': username,
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body : JSON.stringify({'title': title,'body':body, 'labels': labels, 'assignee': assignees, 'state' : 'open'}),
	// },
	// function(error,response,body){
	// 	if(error)
	// 	{
	// 		return res.send(error);
	// 	}

	// 	let data = JSON.parse(body);

	// 	return res.send("New issue has been opened with number : "+data.number);
	// });
});


//edit an issue, use the same to tag and assign
app.use("/EditIssue",function(req,res,next){

	request({
		method: 'PATCH',
		uri: 'https://api.github.com/repos/'+username+'/'+repo+'/issues/'+issueNumber+'?oauth_token='+authToken,
		headers : {
			'User-Agent': username,
			'Content-Type': 'application/json'
		},
		body : JSON.stringify({'title': 'title changed','body':body, 'labels': labels, 'assignee': assignees, 'state' : state}),
	},
	function(error,response,body){
		if(error)
		{
			return res.send(error);
		}

		 let data = JSON.parse(body);

		return res.send("Issue "+data.number+" has been updated successfully!");
	});
});

//list all issues of a repository
app.use("/ListAllIssues",function(req,res,next){
	let data = '';

	request.get('https://api.github.com/repos/'+username+'/'+repo+'/issues')
	.set('User-Agent',username)
	.set('Content-Type','application/json')
	.end(function(error,response)
	{
		if(error)
			res.send(error);

		let issuesList = '';

		 for(let index in response.body)
		 {
		 	issuesList = issuesList + "<input type='checkbox' value='"+response.body[index]['number']+"'>"+response.body[index]['number']+" : "+response.body[index]['title']+"</input><br/>";
		 }

		return res.send(issuesList);
	});


});


//comment on an issue
app.use("/CommentOnAnIssue",function(req,res,next){

	request({
		method: 'POST',
		uri: 'https://api.github.com/repos/'+username+'/'+repo+'/issues/'+issueNumber+'/comments?oauth_token='+authToken,
		headers : {
			'User-Agent': username,
			'Content-Type': 'application/json'
		},
		body : JSON.stringify({'body':comment}),
	},
	function(error,response,body){
		if(error)
		{
			return res.send(error);
		}

		 let data = JSON.parse(body);
		
		return res.send('Comment posted successfully! <br/>Your comment id is '+data.id);
	});
});

//list comments on an issue
app.use("/ListCommentsOnAnIssue",function(req,res,next){
	request({
		uri: 'https://api.github.com/repos/'+username+'/'+repo+'/issues/'+issueNumber+'/comments',
		headers : {
			'User-Agent': username,
			'Content-Type': 'application/json',
			'X-Auth-Token': 'a192dfd5d72225a5f8780bf5d608623ddbdeab30'
		}
	},
	function(error, response, body)
	{
		if(error)
		{
			console.error(error);
			return res.send(error);
		}

		let commentList = '';

		let data = JSON.parse(body);

		for(let index in data)
		{
			commentList = commentList + (Number(index)+1)+"<label value='"+data[index]['id']+"'> : "+data[index]['body']+"</label> <sub>~"+data[index]['user']['login']+"</sub><br/>";
		}

		return res.send(commentList);
	})
});

app.listen(3000);