# JsonChecker

JsonChecker regularly retrieves json from http or https and checks.

It will also notify slack of the results.

## Installation

### 1. Get JsonChecker code

```
$ git clone https://github.com/akio62/json_checker.git
```

### 2. Install node modules

```
$ cd json_checker

$ npm install
```

### 3. Custom settings

check.js

```
// const transferProtocol = require('https');
const transferProtocol = require('http');

// target JSON url
const URL = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=400040';

// JSON check interval (ms)
const checkInterval = 3000;
```

slack.js

```
path: '/services/xxxxxxxxxxxxxxxx', // This param is your slack url of the 'Incoming Webhook'
```
See here for slack settings: 

https://slack.com/intl/ja-jp/help/articles/115005265063-Slack-%E3%81%A7%E3%81%AE-Incoming-Webhook-%E3%81%AE%E5%88%A9%E7%94%A8

### 4. Start JsonChecker

```
$ node checker.js
```

### 5. Stop JsonChecker

Control + c

---

Thank you for reading! :)

