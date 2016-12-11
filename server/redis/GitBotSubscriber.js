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

var intents = [];
var keyString = '';
var valueString = '';
var commandStatus = [];
var issueNumber = '';

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
	"owner": "",
	"repo" : "",
	"number" : "",
	"title" : "",
	"body" : "",
	"labels" : "",
	"assignees" : "",
	"state" : "open"
}


function fetchJsonObject(message)
{
	let json = {
	"owner": "",
	"repo" : "",
	"number" : "",
	"title" : "",
	"body" : "",
	"labels" : "",
	"assignees" : "",
	"state" : "open"
	}

	let project = '';
	let owner = '';
	let repo = '';
	let temp = '';

	if(keyString.length === 0)
	{
		intents.push("call GitBot");
		return "Invalid string";
	}
	else if(keyString.length === 1 && valueString === null)	//atleast one intent (list all issues)
	{
		return "List all issues";
	}
	else
	{	
		//fetch the values
		valueString = message.match(/(\s"[\w-_&@!?,'\/[\]\s(){}]+")|((\s*@[\w-_/,]+)+)|(\s#[0-9]+)/gi);

		// FETCH MANDATORY DETAILS //

		// fetch project details if creating project //
		project = valueString[0].match(/\s@[\w]{2}[\w-_/]+/);
		if( project !== null)
		{
			project = project.toString().split('/');
			owner = project[0].replace('@','').trim();
			repo = project[1].trim();
		}

		json.owner = owner;
		json.repo = repo;

		// fetch title //
		// temp = valueString[1].match(/\s"[\w-_&@!?,'\/[\]\s(){}]+"/g)
		// if(temp !== null)
		// 	json.title = temp.toString().replace(/"+/g,'').trim();
		
		//FETCH OPTIONAL DETAILS //

		for(let index in keyString)
		{
			//check for project if it already exists
			//patterns [in, under, in project, under project]
			if((keyString[index].match(/in/gi) || keyString[index].match(/under/gi)) && keyString[index].match(/project/gi))
			{
				project = valueString[index].match(/\s@[\w]{2}[\w-_/]+/);
				if( project !== null)
				{
				project = project.toString().trim().split('/');
				owner = project[0].replace('@','').trim();
				repo = project[1].trim();
				json.owner = owner;
				json.repo = repo;

				}
			}
			//check for title
			//patterns [create issue, open issue, add issue]
			else if((keyString[index].match(/create/gi) || keyString[index].match(/open/gi) || keyString[index].match(/add/gi)) && keyString[index].match(/issue/gi))
			{
				json.title = valueString[index].match(/\s"[\w-_&@!?,'\/[\]\s(){}]+"/).toString().replace(/"+/g,'').trim();
			}
			//check for description
			//patterns [description, desc, details, content, comment]
			if((keyString[index].match(/comment/gi) && !keyString[index].match(/on/gi)) || (keyString[index].match(/description/gi) || keyString[index].match(/desc/gi) || keyString[index].match(/detail/gi) || keyString[index].match(/content/gi) && !(keyString[index].match(/create/gi)&&keyString[index].match(/issue/gi))))
			{
				json.body = valueString[index].match(/"[\w-_&@!?,'\/[\]\s(){}]+"/).toString().replace(/"+/g,'').trim();
			}
			//check for assignees
			//patterns [to, assign to, give to,]	//eg. [assign issue to, assign to, give issue to, give to]
			else if(!keyString[index].match(/label/gi) && keyString[index].match(/to/gi))// || keyString[index].match(/give/gi)) && keyString[index].match(/to/gi))
			{
				json.assignees = valueString[index].match(/[\w-_]+/g);
			}
			//check for labels
			//patterns [label, with, tag, assign label, add label, assign tag, add tag]
			else if(!keyString[index].match(/issue/gi) && (keyString[index].match(/label/gi) || keyString[index].match(/with/gi) || keyString[index].match(/tag/gi) || (keyString[index].match(/assign/gi) && keyString[index].match(/label/gi)) || (keyString[index].match(/add/gi) && keyString[index].match(/label/gi))))
			{
				json.labels = valueString[index].match(/(help wanted)|([\w-_]+)/g);
			}
			//check for issue number
			//patterns [assign issue #number, give issue #number, label issue #number, tag issue #number, list issue #number, edit issue #number, close issue #number, on issue #number, comment on #number]
			else if(((keyString[index].match(/assign/gi) || keyString[index].match(/give/gi) || keyString[index].match(/label/gi) || keyString[index].match(/tag/gi) || keyString[index].match(/close/gi) || keyString[index].match(/list/gi) || keyString[index].match(/show/gi) || keyString[index].match(/display	/gi) || keyString[index].match(/edit/gi)) && keyString[index].match(/issue/gi)) || keyString[index].match(/close/gi) ||(keyString[index].match(/comment/gi) && (keyString[index].match(/on/gi) || keyString[index].match(/issue/gi))))
			{
				temp = valueString[index].match(/#[0-9]+/).toString().replace('#','').trim();
				json.number = Number(temp);
			}
		}
		
		return json;
	}
}

function getIntent(message)
{
	let intent = [];

	keyString = message.replace(/(\s"[\w-_&@!?,'\/[\]\s(){}]+")|((\s*@[\w-_/,]+)+)|(\s#[0-9]+)/gi,'~').trim();
	
	if(keyString.search(/[~]+/g) > 0)
	{
		keyString = keyString.replace(/[~]+/g,'~');
	}
	//console-------------------
	let segments = keyString.split('~');
	console.log(keyString);
	//check the intent
	for(let index in segments)
	{
		//create project intent checker
		if(segments[index].match(/create/gi) && segments[index].match(/project/gi))
		{
			intent.push("createProject");
		}
		//create issue intent checker
		else if((segments[index].match(/create/gi)||segments[index].match(/open/gi)||segments[index].match(/add/gi)) && segments[index].match(/issue/gi))
		{
			intent.push("createIssue");
		}
		//list all issues intent checker
		else if((segments[index].match(/list/gi)||segments[index].match(/show/gi)||segments[index].match(/display/gi)) && segments[index].match(/issue/gi))
		{
			//2 options:
			//if #number is given, fetch the number and list that issue only OTHERWISE list all issues
			intent.push("listIssues");
		}
		//assign issue intent checker
		else if(segments[index].match(/assign/gi)||segments[index].match(/give/gi))
		{
			intent.push("assignIssue");
		}
		//label issue intent checker
		else if(((segments[index].match(/label/gi)||segments[index].match(/tag/gi))&& keyString.match(/issue/gi)) || ((keyString.match(/create/gi)||keyString.match(/open/gi)||keyString.match(/add/gi)) && keyString.match(/issue/gi) && !(segments[index].match(/desc/gi)||segments[index].match(/description/gi)||segments[index].match(/content/gi)||segments[index].match(/detail/gi)) && (segments[index].match(/with/gi) || segments[index].match(/label/gi) || segments[index].match(/tag/gi))))//||(segments[index].match(/with/gi) && !keyString.match(/issue/gi)&&!(segments[index].match(/desc/gi)||segments[index].match(/description/gi)||segments[index].match(/content/gi)||segments[index].match(/detail/gi))))//|| (segments[index].match(/assign/gi) && (segments[index].match(/tag/gi) || segments[index].match(/label/gi) || segments[index].match(/type/gi))))
		{
			intent.push("labelIssue");
		}
		//close issue intent checker
		else if(segments[index].match(/close/gi)||segments[index].match(/end/gi))
		{
			intent.push("closeIssue");
		}
		//comment on an issue intent checker
		else if((segments[index].match(/create/gi)&&segments[index].match(/comment/gi))||segments[index].match(/comment/gi))
		{
			intent.push("commentOnIssue");
		}
		
	}
	return intent;
}

function generateExecutionSequence(intents)
{
	let tempIntentString = intents.toString();
	let executionSequence = [];

	//create project owner/repo
	//create project "repo" under "owner"

	//create issue "title" in/under project @owner/repo with desc/detail/description "description" assign/give to @aptDroid, @ruchika with labels "bug, help wanted, duplicate"
	//add issue "title" with desc/detail/description "description" in/under project @owner/repo  with labels "bug, help wanted, duplicate" assign/give to @aptDroid, @ruchika
	//open issue "title" with desc/detail/description "description" in/under project @owner/repo  with tags "bug, help wanted, duplicate" assign/give to @aptDroid, @ruchika

	//label issue #101 with labels "help wanted, bug, duplicate, wontfix"
	//label issue #101 with "help wanted, bug, duplicate, wontfix"
	//tag issue #101 with labels/tags "help wanted, bug, duplicate, wontfix"

	//assign issue #101 to @qwerty
	//give issue #101 to @qwerty

	//edit issue #number

	//close issue #number

	//list issues
	//list issue #number
	//show issue #number
	//display issue #number

	//comment on issue #number comment "my comment"
	//on issue #number comment "my comment"

	if(tempIntentString.match(/createProject/gi))
	{
		executionSequence.push("createProject");
	}
	if(tempIntentString.match(/createIssue/gi) && (tempIntentString.match(/assignIssue/gi) || tempIntentString.match(/labelIssue/gi)))
	{
		executionSequence.push("createIssue");
	}
	else 	//either createIssue is present OR assignIssue OR labeIssue OR (assignIssue AND labelIssue) 
	{
		for (let intent in intents)
		{
			if(!intents[intent].match(/createProject/gi))	//neglect createProject
				executionSequence.push(intents[intent]);
		}
	}
	return executionSequence;
}

gitBotSubscriber.on("message",function( channel, message)
{
	intents = '';
	let intentExecutionOrder = '';
	//let tempMessage = message.trim();
	let strArr = '';
	keyString = '';
	valueString = '';

	//FETCH USER INTENT
	intents = getIntent(message);	//will generate keyString
	intentString = intents.toString();
	keyString = keyString.split('~');
	keyString.pop();	//remove the trailing ~

	//FETCH JSON DATA
	jsonObject = fetchJsonObject(message);	//set processFurther to false on error
		jsonObject.authToken = '0523e987fa405f83cf06fb46bf8419d488652606';

		//GENERATE EXECUTION SEQUENCE
		intentExecutionOrder = generateExecutionSequence(intents);
		console.log("Sequence :");
		console.log(intentExecutionOrder);

		//check all the data
		console.log("user intent : ");
		console.log(intents);

		console.log("\nkeys :");
		console.log(keyString);

		console.log("\nvalues :");
		console.log(valueString);

		if(!jsonObject.toString().match(/(invalid)|(list all)/gi))
		{
			console.log("\njson :");
			console.log(jsonObject);
		}
		for(let intent in intentExecutionOrder)
		{
			switch(intentExecutionOrder[intent])
			{
				case "assignIssue":
					console.log("\ncommand to assign issue ");//NOTE:	//not working cuz of asyn
					break;
				case "commentOnIssue":
					console.log("\ncommand to comment on issue ");
					break;
				case "closeIssue":
					console.log("\ncommand to close issue ");
					break;
				case "createIssue":
				let result = createIssue( jsonObject.owner, jsonObject.repo, jsonObject.authToken, jsonObject.title, jsonObject.body, jsonObject.labels, jsonObject.assignees, (err, res) => {
						if(isNaN(res))
						{
							if(res.toString().match(/not found/gi))
							{
								console.log("Error : Project not found!");
								return "Error : Project not found!"
							}
							else if(res.toString().match(/unprocessable entity/gi))
							{	
								console.log("Error : Input string is not in the correct format!");
								return "Error : Input string is not in the correct format!";
							}
							else
							{
								console.log(res.toString());
								return res.toString();
							}
						}
						else
						{	
							console.log("\ncommand to create issue ");
							console.log("Issue has been created with id : "+res);
							return "Issue has been created with id : "+res;
						}
					});
				if(result !== undefined && result!== "no values for this query")
					console.log(result);
					break;
				case "createProject":
					if(jsonObject.owner === '' )
						console.log("Error : Owner name invalid/not present");
					else if(jsonObject.repo === '' )
						console.log("Error : Project information not present");
					else
					{
						console.log("\nCommand to Create Project");
					}	
					break;
				case "labelIssue":
					console.log("\ncommand to label issue ");
					break;
				case "listIssues":
					console.log("\ncommand to list issues ");
					break;
				case "call GitBot":
					console.log("\nHello! How can I help you?");
					break;
				default:
					console.log(jsonObject);
			}
		}
	
	// //perform create project query if exists
	// if(intentString.match(/createProject/gi))
	// {
	// 	//steps to execute CREATE PROJECT
	// 	console.log("CREATE PROJECT COMMAND");
	// }
	// //perform create issue queries
	// if(intentString.match(/createIssue/gi))
	// {
	// 	//steps to execute CREATE ISSUE
	// 	//data is in (2*index + 1)
	// 	console.log("CREATE ISSUE COMMAND");		
	// }
	// //perform assign issue queries
	// if(intentString.match(/assignIssue/gi))
	// {
	// 	//steps to execute ASSIGN ISSUE
	// 	//data is in (2*index + 1)
	// 	console.log("ASSIGN ISSUE COMMAND");
	// }
	// //perform label issue queries
	// if(intentString.match(/labelIssue/gi))
	// {
	// 	//steps to execute LABEL ISSUE
	// 	//data is in (2*index + 1)
	// 	console.log("LABEL ISSUE COMMAND");
	// }
	// //perform comment on an issue queries
	// if(intentString.match(/commentOnIssue/gi))
	// {
	// 	//steps to execute COMMENT ON ISSUE
	// 	//data is in (2*index + 1)
	// 	console.log("COMMENT ON ISSUE COMMAND");		
	// }
	// //perform list all issues querie
	// if(intentString.match(/listIssues/gi))
	// {
	// 	//steps to execute LIST ALL ISSUES
	// 	//data is in (2*index + 1)
	// 	console.log("LIST ALL ISSUES COMMAND");		
	// }
	// //perform close issue queries
	// if(intentString.match(/closeIssue/gi))
	// {
	// 	//steps to execute COMMENT ON ISSUE
	// 	//data is in (2*index + 1)
	// 	console.log("COMMENT ON ISSUE COMMAND");		
	// }

	//--------------------------------

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