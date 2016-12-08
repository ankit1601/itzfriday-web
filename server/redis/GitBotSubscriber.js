var redis = require("redis");
var createIssue = require("../gitBot/createIssue");
var gitBotSubscriber = redis.createClient();

var contextMd = {
	owner: 100,
	project: 200,
	issue: 300
	};

var intentMd = {
	createIssue : 
	{
		context : 'project',				//repo
		props : 
		{
			required : ['title'],
			optional : ['body', 'labels', 'assignees']
		}
	}
}

var jsonObject = {
				'owner': '',
				'repo' : '',
				'authToken' : '14a999ba4ac06d8a9bffce78d6253c53eafb90d4',
				'title' : '',
				'body' : '',
				'labels' : '',
				'assignees' : '',
				'state' : 'open'
			}

var getIntent = function(message)
{
	let intent = [];

	let commandString = message.replace(/(\s"[\w-_&@!?,'\/[\]\s(){}]+")|(\s@[\w-_/,@]+)|(\s#[A-z0-9]+)/gi,'~');
	if(commandString.search(/[~]+/g) > 0)
	{
		commandString = commandString.replace(/[~]+/g,'~');
	}
	console.log(commandString+"\n");

	let segments = commandString.split('~');
	console.log("segments in command : "+segments.length+"\n");

	//check if the string is valid
	if(segments.length % 2 === 0)
	{
		Console.log("Error in input string!");
		return "Error in input string!";
	}

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

var getContext = function ()
{

}

gitBotSubscriber.on("message",function( channel, message)
{
	let userIntent = '';
	let intentExecutionOrder = '';
	let tempMessage = message.trim();
	let strArr = '';

	console.log(" ");
	userIntent = getIntent(message);
	console.log("user intent : "+userIntent+"\n");

	//perform create project query if exists
	if(userIntent.toString().match(/create project/gi))
	{
		//steps to execute CREATE PROJECT
		console.log("CREATE PROJECT COMMAND");
	}
	//perform create issue queries
	for(let index in userIntent)
	{
		if(userIntent[index].match(/create issue/gi))
		{
			//steps to execute CREATE ISSUE
			//data is in (2*index + 1)
			console.log("CREATE ISSUE COMMAND");		
		}
	}
	//perform assign issue queries
	for(let index in userIntent)
	{
		if(userIntent[index].match(/assign issue/gi))
		{
			//steps to execute ASSIGN ISSUE
			//data is in (2*index + 1)
			console.log("ASSIGN ISSUE COMMAND");		
		}
	}
	//perform label issue queries
	for(let index in userIntent)
	{
		if(userIntent[index].match(/label issue/gi))
		{
			//steps to execute LABEL ISSUE
			//data is in (2*index + 1)
			console.log("LABEL ISSUE COMMAND");
		}
	}
	//perform comment on an issue queries
	for(let index in userIntent)
	{
		if(userIntent[index].match(/comment/gi))
		{
			//steps to execute COMMENT ON ISSUE
			//data is in (2*index + 1)
			console.log("COMMENT ON ISSUE COMMAND");		
		}
	}
	//perform list all issues querie
	if(userIntent.toString().match(/list issues/gi))
	{
		//steps to execute LIST ALL ISSUES
		//data is in (2*index + 1)
		console.log("LIST ALL ISSUES COMMAND");		
	}
	//perform close issue queries
	for(let index in userIntent)
	{
		if(userIntent[index].match(/close issue/gi))
		{
			//steps to execute COMMENT ON ISSUE
			//data is in (2*index + 1)
			console.log("COMMENT ON ISSUE COMMAND");		
		}
	}

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


	// 		console.log(jsonObject);
	// 		console.log('processing..');			
	// 		createIssue( jsonObject.owner, jsonObject.repo, jsonObject.authToken, jsonObject.title, jsonObject.body, jsonObject.labels, jsonObject.assignees, (err, result) => {
	// 			console.log(result);
	// 		});

	//	}
		
	//}
});

gitBotSubscriber.subscribe("GitBot");