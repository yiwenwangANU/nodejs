// Using `npm install` to create third party package with their folders(node_module) and update them
// Using NPM Script by `npm init` to create json file and use npm start to start the program
// Using `npm install nodemon --save-dev` to install the 3rd party package that can update the server without restarting

const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes.handler);
console.log(routes.someText);

server.listen(3000);