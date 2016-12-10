var request = require('superagent');
const createIssue = function (owner,repo,authToken,title,body,callback)
{
	var result = '';

    var jsonObj = {
        'title' : title,
        'state' : 'open'
    };

    if(body !== '')
        jsonObj.body = body;
    // if(labels !== '')
    //     jsonObj.labels = labels;
    // if(assignees !== '')
    //     jsonObj.assignees = assignees;

	request.post('https://api.github.com/repos/'+owner+'/'+repo+'/issues?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            //callback(error, 'error');
            //return
            console.log(error);
        }
        //callback(null, response.body.number);
        console.log(response.body.number);
    });
    //return result;
}
module.exports = createIssue;