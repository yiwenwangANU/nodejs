// Create a node server
const http = require('http');// import global module 
// const http = require('./http.js') import local module

/*
http.createServer(rqListener); // use module to create server

function rqListener(req, res){

}
*/
// create server with arrow function
const server = http.createServer((req, res) => {
    console.log(req);
    //set the response
    res.setHeader('Content-Type', 'text/html');     
    res.write('<html>');
    res.write('<head><title>Hello World</title></head>');
    res.write('<body><h1>Hello World</h1></body>')
    res.write('</html>');
    res.end();
});

server.listen(3000); // listen on port 3000