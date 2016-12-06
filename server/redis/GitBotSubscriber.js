var redis = require("redis");
var createIssue = require("../gitBot/createIssue");
var gitBotSubscriber = redis.createClient();

gitBotSubscriber.on("message",function( channel, message)
{
	let tempMessage = message.trim();
	let strArr = '';

	var jsonObject = {
				'username' : 'aptDroid',
				'owner': '',
				'repo' : '',
				'authToken' : '',
				'title' : '',
				'body' : '',
				'labels' : '',
				'assignees' : '',
				'state' : 'open'
			}

	// FOR CREATE ISSUE
	if(tempMessage.match(/create/i) && tempMessage.match(/issue/i))
	{	
		strArr = tempMessage.split('"');
		if(strArr.length % 2 === 0)
			console.log('error in input string');
		else
		{
			console.log('processing..');
			
			//checking number of paramteres
			for(let index=0; index < strArr.length; index++)
			{
				if((strArr[index].match(/issue/i) && strArr[index].match(/create/i)) && !strArr[index].match(/description/i)|| (strArr[index].match(/issue/i) || (strArr[index].match(/title/i)&&strArr[index].match(/issue/i))))
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
				else if(strArr[index].match(/assign/i) || (strArr[index].match(/give/i) && strArr[index].match(/to/i)))
				{
					let assignees = strArr[++index].split(',');
					let assigneesArr = [];
					for(let i in assignees)
					{
						assigneesArr.push(assignees[i].trim());
					}
					jsonObject.assignees = assigneesArr;		//assignees
				}
				else if(strArr[index].match(/token/i) || strArr[index].match(/key/i))
				{
					jsonObject.authToken = strArr[++index].trim();	//token
				}
			}


			console.log(jsonObject);

			createIssue(jsonObject.username, jsonObject.owner, jsonObject.repo, jsonObject.authToken, jsonObject.title, jsonObject.body, jsonObject.labels, jsonObject.assignees, (err, result) => {
				console.log(result);
			});

		}
		
	}
});

gitBotSubscriber.subscribe("GitBot");

//publish GitBot 'issue create {"username":"aptDroid","repo":"HTML5","authToken":"4aff7267295cc1c030ee62c13ce82e3ffc205656","title":"new issue","body":"first comment","labels":["bug","help wanted"],"assignees":["aptDroid","suganya-g"],"state":"open"}'

/* Format-1
publish GitBot 'create issue "title of the issue"
under project "aptDroid/HTML5" 
having description "Somebody describe the issue!!" 
with label "bug, help wanted"
and assign it to "aptDroid,suganya-g"
with token "4aff7267295cc1c030ee62c13ce82e3ffc205656"'

*/

/* Format-2
'in project "aptDroid/HTML5" 
create issue "my issue" 
assigned to "aptDroid, suganya-g" 
with description "content of the issue" 
and token is "4aff7267295cc1c030ee62c13ce82e3ffc205656" 
with label "bug, help Wanted" '
*/