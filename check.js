// const https = require('https');
const http = require('http');
const jsonDiff = require('json-diff')
const fs = require('fs');
const slack = require('./slack');


function chackJSON() {
  const buffer_data = [];
  // 古いJSONを読み込み
  const file_descriptor = fs.readFileSync('./check.json');
  const oldData = JSON.parse(file_descriptor);

  // JSON取得のurl
  const URL = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=400040';
  
  http.get(URL, function(res) {
  
    res.on('data', function(chunk) {
      buffer_data.push(chunk);
  
    }).on('end', function() {
      const json = Buffer.concat(buffer_data);
      const diff = jsonDiff.diffString(oldData, JSON.parse(json));
      if (diff) {
        console.log(diff);
        slack({ message: diff });
　　    // 新しいデータを上書き
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

// 3000(3秒に一度実行)
setInterval(() => chackJSON(), 3000);
