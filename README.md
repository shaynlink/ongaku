# Ongaku
Onkagu is a library of several tools to create / manage / automate your nodes, so you can your own private music server from an API or implement in your code.

# Installation
with npm
```bash
npm install Shaynlink/ongaku
```
with yarn
```bash
yarn Shaynlink/ongaku
```

# Exemples
Start default server (port 1452)
```bash
# with npm
npm start
# with yarn
yarn start
```

<img src="https://raw.githubusercontent.com/Shaynlink/ongaku/master/assets/images/loadRoute.png" />

### Default routes
```bash
# index
GET http://localhost:1452/

# Create node
GET http://localhost:1452/node/create

# Delete node
DELETE http://localhost:1452/node/:uuid

    params -> :uuid = node uuid

# Node info
GET http://localhost:1452/node/:uuid

    params -> :uuid = node uuid

# Node queue
GET http://localhost:1452/node/:uuid/queue

    params -> :uuid = node uuid

# add Song
PUT http://localhost:1452/node/:uuid/queue
    
    params -> :uuid = node uuid
    
    body -> url     = Youtube video URL
         -> service = URL Service (actually only youtube)

# Remove Song
DELETE http://localhost:1452/node/:uuid/queue/:suuid

    params -> :uuid  = node uuid
           -> :suuid = song uuid

# Info song
GET http://localhost:1452/node/:uuid/queue/:suuid
    
    params -> :uuid  = node uuid
           -> :suuid = song uuid

# Player
GET http://localhost:1452/node/:uuid/player

    params -> uuid = node uuid

    query -> type = stream encoding
```

<img src="https://raw.githubusercontent.com/Shaynlink/ongaku/master/assets/images/node.png" />

<img src="https://raw.githubusercontent.com/Shaynlink/ongaku/master/assets/images/addQueue.png" />

<img src="https://raw.githubusercontent.com/Shaynlink/ongaku/master/assets/images/player.png" />

Server example
```js
'use strict';

const {Client, content, routes} = require('ongaku');
const client = new Client({
    token: false, // Default, You can add token, for requests via your API with the Authorization headers
    host: '0.0.0.0', // Default, Allow connection via external network requests
    port: '1452', // Default
    app: content, // Default express app
    route: routes, // Default
});

client.on('debug', console.log);

client.rest.createServer();
```

 ## Discord.js exemple
download ongaku
```bash
git clone Shaynlink/ongaku
cd ongaku
```

create `config.js` file in test folder
```js
'use strict';

module.exports = exports = {
  token: 'Your discord token',
};
```
Start discord.js example
```
node ./test/discordjs.test.js
```
**PREFIX**: `.`

### Bot commands


| name       | descriptions                  |
|------------|-------------------------------|
| join       | Join channel                  |
| play       | Play music                    |
| queue      | Display 5 first songs         |
| nowplaying | Display info of actually song |

<img src="https://raw.githubusercontent.com/Shaynlink/ongaku/master/assets/images/Queue.png" />

<img src="https://raw.githubusercontent.com/Shaynlink/ongaku/master/assets/images/nowplaying.png" />