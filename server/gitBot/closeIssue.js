var request = require('superagent');
const closeIssue = function (username,owner,repo,authToken,issueNumber,callback)
{
	var result = '';

    if(body !== '')
        jsonObj.body = body;
    if(labels !== '')
        jsonObj.labels = labels;
    if(assignees !== '')
        jsonObj.assignees = assignees;

	request.post('https://api.github.com/repos/'+owner+'/'+repo+'/issues/'+issueNumber+'?oauth_token='+authToken)
    .set('User-Agent',username)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify({"state":"closed"}))
    .end(function(error,response){
        if(error)
        {
            callback(error);
            return
        }
        callback(null, "Issue "+response.body.number + " has been closed!");
    });
}
module.exports = closeIssue;