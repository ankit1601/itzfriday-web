var redis = require("redis");
var createIssue = require("../gitBot/createIssue");
var gitBotSubscriber = redis.createClient();

var toDo = ['add','create','open','list','show','display', 'comment','close'];
var context = {
	project:'',
	repo:''
	};

const getIntent = function(message)
{

}

gitBotSubscriber.on("message",function( channel, message)
{
	let tempMessage = message.trim();
	let strArr = '';

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

	// FOR CREATE ISSUE
	if((tempMessage.match(/create/i) ||tempMessage.match(/open/i) ||tempMessage.match(/new/i)) && tempMessage.match(/issue/i))
	{	
		strArr = tempMessage.split('"');
		if(strArr.length % 2 === 0)
			console.log('error in input string');
		else
		{
			//checking number of paramteres
			for(let index=0; index < strArr.length; index++)
			{
				if((strArr[index].match(/issue/i) && (strArr[index].match(/create/i) ||tempMessage.match(/open/i) ||tempMessage.match(/new/i))) && !strArr[index].match(/description/i)|| (strArr[index].match(/issue/i) || (strArr[index].match(/title/i)&&strArr[index].match(/issue/i))))
					jsonObject.title = strArr[++index].trim();		//title
				else if (strArr[index].match(/project/i))
				{
					index++;
					if(strArr[index].indexOf('/')>1) 
					{	
						let temp = strArr[index].split('/');
						jsonObject.owner = temp[0];			//owner
						if(strArr[index].indexOf('/')<(strArr[index].length-1))	//atleast 2 chars in owner && / is not the last character
						{
							jsonObject.repo = temp[1];		//repo
						}
						else
							console.log("invalid repository name");
					}
					else
					{
						console.log("invalid owner name");
						if(strArr[index].indexOf('/')<(strArr[index].length-1))	//atleast 2 chars in owner && / is not the last character
						{
							let temp = strArr[index].split('/');
							jsonObject.repo = temp[1].trim();	//repo
						}
						else
							console.log("invalid repository name");
					}
				}
				else if(strArr[index].match(/description/i) || strArr[index].match(/desc/i) || strArr[index].match(/detail/i))
				{
					jsonObject.body = strArr[++index].trim();			//body
				}
				else if(strArr[index].match(/label/i) || strArr[index].match(/type/i))
				{
					let labels = strArr[++index].split(',');
					let labelsArr = [];
					for(let i in labels)
					{
						labelsArr.push(labels[i].trim());
					}
					jsonObject.labels = labelsArr;				//labels
				}
				else if( strArr[index].match(/assign/i) || strArr[index].match(/give/i))
				{
					let assignees = strArr[++index].split(',');
					let assigneesArr = [];
					for(let i in assignees)
					{
						assigneesArr.push(assignees[i].trim());
					}
					jsonObject.assignees = assigneesArr;		//assignees
				}
			}


			console.log(jsonObject);
			console.log('processing..');			
			createIssue( jsonObject.owner, jsonObject.repo, jsonObject.authToken, jsonObject.title, jsonObject.body, jsonObject.labels, jsonObject.assignees, (err, result) => {
				console.log(result);
			});

		}
		
	}
});

gitBotSubscriber.subscribe("GitBot");