const slack = function(params) {
  const https = require('https');
  const host = 'hooks.slack.com';

  const data = JSON.stringify({'text': params['message']});

  const options = {
    hostname: 'hooks.slack.com',
    port: 443,
    path: '/services/xxxxxxxxxxxxxxxx', // This param is your slack url of the 'Incoming Webhook' 
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }
  };

  const req = https.request(options);
  req.on('error', function(error) {
    console.log(error);
  });

  req.write(data);
  req.end();
}

module.exports = slack;
