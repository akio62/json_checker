// const transferProtocol = require('https');
const transferProtocol = require('http');
const jsonDiff = require('json-diff')
const fs = require('fs');
const slack = require('./slack');

// target JSON url
const URL = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=400040';

// JSON check interval (ms)
const checkInterval = 3000;

function chackJSON() {
  const buffer_data = [];
  const file_descriptor = fs.readFileSync('./check.json');
  const oldData = JSON.parse(file_descriptor);

  transferProtocol.get(URL, function(res) {
  
    res.on('data', function(chunk) {
      buffer_data.push(chunk);
  
    }).on('end', function() {
      const json = Buffer.concat(buffer_data);
      const diff = jsonDiff.diffString(oldData, JSON.parse(json));
      if (diff) {
        console.log(diff);
        slack({ message: diff });
        fs.writeFile('check.json', json, function(err) {
          if (!err) { return; }
          slack({ message: '[Error] can\'t save data :' + err });
          console.log('[Error] can\'t save data :' + err);
        });
      } else {
        console.log('No change :)');
        slack({ message: 'No change :)' });
      }
  
    });
  });
};

chackJSON();

setInterval(() => chackJSON(), checkInterval);
