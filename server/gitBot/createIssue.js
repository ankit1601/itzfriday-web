var request = require('superagent');
const createIssue = function (owner,repo,authToken,title,body,labels,assignees,callback)
{
	var jsonObj = {
        "title" : "",
        "state": "open"
    };

    if(owner === '' || owner.length<2)
    {
        return "Error: Invalid syntax in project name!";
    }
    if(title === '')
    {
        return "Error: Invalid syntax in project name!";
    }
    if(title === '')
    {
        return "Error: Title not present in the information!";
    }

    jsonObj.title = title;

    if(body !== '')
        jsonObj.body = body;
    if(labels !== '')
        jsonObj.labels = labels;
    if(assignees !== '')
        jsonObj.assignees = assignees;

    console.log("Sending the following JSON");
    console.log(jsonObj);

	request.post('https://api.github.com/repos/'+owner+'/'+repo+'/issues?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback(error,error);
            //console.log(callback);
            return
            //console.log(error);
        }
         callback(null, response.body.number);
          //  console.log(callback);
        //console.log(response.body.number);
    });
    return 
}
module.exports = createIssue;