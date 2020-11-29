# Ongaku
Onkagu est une librairie de multiple outil pour créer / manager / automatiser vos noeuds, ainsi vous pouvez votre propre serveur de musique privée à partire d'une API ou implémenter dans votre code.

# Installation
avec npm
```bash
npm install
```
avec yarn
```bash
yarn
```

# Exemples
Démarrer le serveur par défaut (port 1452)
```bash
# with npm
npm start
# with yarn
yarn start
```

<img src="https://raw.githubusercontent.com/Shaynlink/ongaku/master/assets/images/loadRoute.png" />

### routes du serveur par défaut
```bash
# index
GET http://localhost:1452/

# Create node
GET http://localhost:1452/node/create

# Delete node
DELETE http://localhost:1452/node/delete

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

Example de serveur
```js
'use strict';

const {Client, content, routes} = require('ongaku');
const client = new Client({
    token: false, // Default, Vous pouvez ajouté un token, pour les requêtes via votre api avec le headers Authorization
    host: '0.0.0.0', // Default, Authoriser la connexion via des requêtes externe du réseau
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