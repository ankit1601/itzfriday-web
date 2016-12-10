var redis = require("redis");
var createIssue = require("../gitBot/createIssue");
var assignIssue = require("../gitBot/assignIssue");
var labelIssue = require("../gitBot/labelIssue");
var closeIssue = require("../gitBot/closeIssue");
var listIssues = require("../gitBot/listIssues");
var commentOnIssue = require("../gitBot/commentOnIssue");
var gitBotSubscriber = redis.createClient();

//context metadata
var contextMD = {
	owner: 100,
	project: 200,
	issue: 300
};

// priority code XXX --> (Context, similar type, sub functions) ......eg (project, create issue/edit issue/close issue/list issue/comment on issue, assign/label/milestone)

//intent metadata
var intentMD = {
	createProject : 
	{
		context : 'owner',				//owner
		props : 
		{
			required : ['repoName'],
			//optional : ['body', 'labels', 'assignees']
		},
		pattern : [['create','project'],['make','project']]
	}
	,
	createIssue : 
	{
		context : 'project',				//repo
		props : 
		{
			required : ['title'],
			optional : ['body', 'labels', 'assignees']
		},
		pattern : [['create','issue'],['open','issue'],['add','issue']]
	}
	,
	assignIssue : 
	{	
		context : 'project',				//repo
		props : 
		{
			required : ['number','assignees']	//execute CREATE and fetch the "number" (if assigning with create query)  or get it from user (if user intents to only assign), use that "number" to ASSIGN issue
		},
		pattern : [['assign', 'to'],['give','to']]
	}
	,
	labelIssue : 
	{	
		context : 'project',				//repo
		props : 
		{
			required : ['number','labels']	//execute CREATE and fetch the "number" (if tagging with create query) or get it from user (if user intents to only add labels), use that "number" to LABEL issue
		},
		pattern : [['label'],['tag'],['assign','label'],['add','label']]
	}
	,
	closeIssue : 
	{
		priority : 221,						
		context : 'project',				//repo
		props : 
		{
			required : ['number']	//ask "number" from user, use that "number" to CLOSE the issue
		},
		pattern : [['close'],['close', 'issue']]
	}
	,
	listIssues : 
	{
		context : 'project',				//repo
		props : 
		{
			optional : ['number']			//issue number
		},
		pattern : [['list','issue'],['show','issue'],['display','issue']]
	}
	,
	commentOnIssue : 
	{
		context : 'issue',				//repo
		props : 
		{
			required : ['number']	//ask "number" from user, use that "number" to COMMENT on issue #number
		},
		pattern : [['comment'],['comment', 'on']] //(comment "xyz" on issue #21),(comment on issue #21 desc "xyz"),
	}	
}

var userIntents = [];
var keyString = '';
var valueString = '';

/*
userIntents = [
{
	intent : "createProject",
	priority : 101
}
,
{
	intent : "assignIssue",
	priority : 211
}
,
{
	intent : "createIssue",
	priority : 201
}
]

//now sort priority in ascending order to get the order of execution

//////NOTE: consult with renderToString()
*/

var jsonObject = {
	'owner': '',
	'repo' : '',
	'authToken' : '14a999ba4ac06d8a9bffce78d6253c53eafb90d4',
	'number' : '',
	'title' : '',
	'body' : '',
	'labels' : '',
	'assignees' : '',
	'state' : 'open'
}

var getProject = function(message)
{
	// let project = 
	return '';
}

var fetchJsonObject = function(message)
{
	let project = '';
	let owner = '';
	let repo = '';
	let temp = '';

	//fetch the values
	valueString = message.match(/(\s"[\w-_&@!?,'\/[\]\s(){}]+")|((\s*@[\w-_/,]+)+)|(\s#[0-9]+)/gi);

	if(valueString.length !== keyString.length)
		return ("ERROR: mismatch parameter variable count!");

	// FETCH MANDATORY DETAILS //

	// fetch project details //
	project = valueString[0].match(/\s@[\w]{2}[\w-_/]+/);
	if(project === null)	//if project not present
	{
		return ("ERROR: project not present in the information!");
	}
	project = project.toString().split('/');
	
	owner = project[0].replace('@','').trim();
	repo = project[1].trim();

	jsonObject.owner = owner;
	jsonObject.repo = repo;

	// fetch title //
	temp = valueString[1].match(/\s"[\w-_&@!?,'\/[\]\s(){}]+"/g)
	if(temp === null)		//if title not present
	{
		return ("ERROR: title is not present in the information!");
	}
	jsonObject.title = temp.toString().replace(/"+/g,'').trim();

	//FETCH OPTIONAL DETAILS //

	for(let index=2; index<keyString.length; index++)
	{
		//check for description
		//patterns [description, desc, details, content]
		if(keyString[index].match(/description/g) || keyString[index].match(/desc/g) || keyString[index].match(/details/g) || keyString[index].match(/content/g))
		{
			jsonObject.body = valueString[index].match(/"[\w-_&@!?,'\/[\]\s(){}]+"/).toString().replace(/"+/g,'').trim();
		}
		//check for assignees
		//patterns [assign, give,]
		else if((!keyString[index].match(/label/g) && keyString[index].match(/assign/g)) || keyString[index].match(/give/g) && keyString[index].match(/to/g))
		{
			jsonObject.assignees = valueString[index].match(/[\w-_]+/g);
		}
		//check for labels
		//patterns [label, tag, assign label, add label]
		else if(keyString[index].match(/label/g) || keyString[index].match(/tag/g) || keyString[index].match(/type/g) || (keyString[index].match(/assign/g) && keyString[index].match(/label/g)) || (keyString[index].match(/add/g) && keyString[index].match(/label/g)))
		{
			jsonObject.labels = valueString[index].match(/[\w-_]+/g);
		}
		//check for issue number
		//patterns [label, tag, assign label, add label]
		else if(keyString[index].match(/label/g) || keyString[index].match(/tag/g) || keyString[index].match(/type/g) || (keyString[index].match(/assign/g) && keyString[index].match(/label/g)) || (keyString[index].match(/add/g) && keyString[index].match(/label/g)))
		{
			jsonObject.labels = valueString[index].match(/[\w-_]+/g);
		}
		else if((keyString[index].match(/in/g) && keyString[index].match(/issue/g)) || (keyString[index].match(/close/g) && keyString[index].match(/issue/g)) || (keyString[index].match(/edit/g) && keyString[index].match(/issue/g)) || (keyString[index].match(/list/g) && keyString[index].match(/issue/g)))
		{
			temp = valueString[index].match(/#[0-9]+/).toString().replace('#','').trim();
			jsonObject.number = Number(temp);
		}
	}
	

	console.log(jsonObject);
	return "success";
}

var getIntent = function(message)
{
	let intent = [];

	keyString = message.replace(/(\s"[\w-_&@!?,'\/[\]\s(){}]+")|((\s*@[\w-_/,]+)+)|(\s#[0-9]+)/gi,'~').trim();
	
	if(keyString.search(/[~]+/g) > 0)
	{
		keyString = keyString.replace(/[~]+/g,'~');
	}
	//console-------------------
	let segments = keyString.split('~');

	//check the intent
	for(let index in segments)
	{
		//create project intent checker
		if(segments[index].match(/create/gi) && segments[index].match(/project/gi))
		{
			intent.push("create project");
		}
		//create issue intent checker
		else if((segments[index].match(/create/gi)||segments[index].match(/open/gi)||segments[index].match(/add/gi)) && segments[index].match(/issue/gi))
		{
			intent.push("create issue");
		}
		//list all issues intent checker
		else if((segments[index].match(/list/gi)||segments[index].match(/show/gi)||segments[index].match(/display/gi)) && segments[index].match(/issue/gi))
		{
			//2 options:
			//if #number is given, fetch the number and list that issue only OTHERWISE list all issues
			intent.push("list issues");
		}
		//assign issue intent checker
		else if(segments[index].match(/assign/gi)||segments[index].match(/give/gi))
		{
			intent.push("assign issue");
		}
		//tag/label/type issue intent checker
		else if(segments[index].match(/label/gi)||segments[index].match(/type/gi)||segments[index].match(/tag/gi))
		{
			intent.push("label issue");
		}
		//close issue intent checker
		else if(segments[index].match(/close/gi)||segments[index].match(/end/gi))
		{
			intent.push("close issue");
		}
		//comment on an issue intent checker
		else if((segments[index].match(/create/gi)&&segments[index].match(/comment/gi))||segments[index].match(/comment/gi))
		{
			intent.push("comment");
		}
		
	}
	return intent;
}

// var getContext = function ()
// {

// }

gitBotSubscriber.on("message",function( channel, message)
{
	let intents = '';
	let intentExecutionOrder = '';
	let tempMessage = message.trim();
	let strArr = '';
	keyString = '';
	valueString = '';

	
	intents = getIntent(message);
	intentString = intents.toString();
	console.log("user intent : "+intents+"\n");

	//perform create project query if exists
	if(intentString.match(/create project/gi))
	{
		//steps to execute CREATE PROJECT
		console.log("CREATE PROJECT COMMAND");
	}
	//perform create issue queries
	if(intentString.match(/create issue/gi))
	{
		//steps to execute CREATE ISSUE
		//data is in (2*index + 1)
		console.log("CREATE ISSUE COMMAND");		
	}
	//perform assign issue queries
	if(intentString.match(/assign issue/gi))
	{
		//steps to execute ASSIGN ISSUE
		//data is in (2*index + 1)
		console.log("ASSIGN ISSUE COMMAND");
	}
	//perform label issue queries
	if(intentString.match(/label issue/gi))
	{
		//steps to execute LABEL ISSUE
		//data is in (2*index + 1)
		console.log("LABEL ISSUE COMMAND");
	}
	//perform comment on an issue queries
	if(intentString.match(/comment/gi))
	{
		//steps to execute COMMENT ON ISSUE
		//data is in (2*index + 1)
		console.log("COMMENT ON ISSUE COMMAND");		
	}
	//perform list all issues querie
	if(intentString.match(/list issues/gi))
	{
		//steps to execute LIST ALL ISSUES
		//data is in (2*index + 1)
		console.log("LIST ALL ISSUES COMMAND");		
	}
	//perform close issue queries
	if(intentString.match(/close issue/gi))
	{
		//steps to execute COMMENT ON ISSUE
		//data is in (2*index + 1)
		console.log("COMMENT ON ISSUE COMMAND");		
	}

	keyString = keyString.split('~');
	keyString.pop();

	console.log(fetchJsonObject(message));
	console.log("keys : \n");
	console.log(keyString);

	console.log("values : \n");
	console.log(valueString);

	//gitBotSubscriber.publish("reply", "publish back");	//not working...ERROR : reply error

	// // FOR CREATE ISSUE
	// if((tempMessage.match(/create/i) ||tempMessage.match(/open/i) ||tempMessage.match(/new/i)) && tempMessage.match(/issue/i))
	// {	
	// 	strArr = tempMessage.split('"');
	// 	if(strArr.length % 2 === 0)
	// 		console.log('error in input string');
	// 	else
	// 	{
	// 		//checking number of paramteres
	// 		for(let index=0; index < strArr.length; index++)
	// 		{
	// 			if((strArr[index].match(/issue/i) && (strArr[index].match(/create/i) ||tempMessage.match(/open/i) ||tempMessage.match(/new/i))) && !strArr[index].match(/description/i)|| (strArr[index].match(/issue/i) || (strArr[index].match(/title/i)&&strArr[index].match(/issue/i))))
	// 				jsonObject.title = strArr[++index].trim();		//title
	// 			else if (strArr[index].match(/project/i))
	// 			{
	// 				index++;
	// 				if(strArr[index].indexOf('/')>1) 
	// 				{	
	// 					let temp = strArr[index].split('/');
	// 					jsonObject.owner = temp[0];			//owner
	// 					if(strArr[index].indexOf('/')<(strArr[index].length-1))	//atleast 2 chars in owner && / is not the last character
	// 					{
	// 						jsonObject.repo = temp[1];		//repo
	// 					}
	// 					else
	// 						console.log("invalid repository name");
	// 				}
	// 				else
	// 				{
	// 					console.log("invalid owner name");
	// 					if(strArr[index].indexOf('/')<(strArr[index].length-1))	//atleast 2 chars in owner && / is not the last character
	// 					{
	// 						let temp = strArr[index].split('/');
	// 						jsonObject.repo = temp[1].trim();	//repo
	// 					}
	// 					else
	// 						console.log("invalid repository name");
	// 				}
	// 			}
	// 			else if(strArr[index].match(/description/i) || strArr[index].match(/desc/i) || strArr[index].match(/detail/i))
	// 			{
	// 				jsonObject.body = strArr[++index].trim();			//body
	// 			}
	// 			else if(strArr[index].match(/label/i) || strArr[index].match(/type/i))
	// 			{
	// 				let labels = strArr[++index].split(',');
	// 				let labelsArr = [];
	// 				for(let i in labels)
	// 				{
	// 					labelsArr.push(labels[i].trim());
	// 				}
	// 				jsonObject.labels = labelsArr;				//labels
	// 			}
	// 			else if( strArr[index].match(/assign/i) || strArr[index].match(/give/i))
	// 			{
	// 				let assignees = strArr[++index].split(',');
	// 				let assigneesArr = [];
	// 				for(let i in assignees)
	// 				{
	// 					assigneesArr.push(assignees[i].trim());
	// 				}
	// 				jsonObject.assignees = assigneesArr;		//assignees
	// 			}
	// 		}

/*
			console.log(jsonObject);
			console.log('processing..');			
			createIssue( jsonObject.owner, jsonObject.repo, jsonObject.authToken, jsonObject.title, jsonObject.body, jsonObject.labels, jsonObject.assignees, (err, result) => {
				console.log(result);
			});
*/
	//	}

	//}
});

gitBotSubscriber.subscribe("GitBot");