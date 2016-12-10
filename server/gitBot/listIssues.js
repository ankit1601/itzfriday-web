var request = require('superagent');
const listIssues = function (owner,repo,authToken,callback)
{
	var result = '';

	request.get('https://api.github.com/repos/'+owner+'/'+repo+'/issues?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .end(function(error,response){
        if(error)
        {
            callback(error);
            //return
        }
        callback(null, response.body);
    });
    //return result;
}
module.exports = listIssues;