
const fs = require('fs');


const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        console.log('nodemon log');
        res.write('<html><header><title>Enter Message</title></header>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body></html>')
        return res.end();
    }
    // Parsing the request bodies (parsing the data)
    if (url === '/message' && method === 'POST'){
        const body = []; // For the buffers
        req.on('data', (chunk) => { // Event listener, 'data' is the event and the arrow function is the listener, executed async
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end' ,() => { // Another event listener, use return to make sure the lines after do not get executed
                const parseBody = Buffer.concat(body).toString();
                console.log(parseBody);
                const message = parseBody.split('=')[1];
                //fs.writeFileSync('message.txt', message); // Create file sync, block the code execution until file was done
                fs.writeFile('message.txt', message, err => { // Another event listener
                    res.statusCode = 302; // Redirect back to /
                    res.setHeader('Location', '/');
                    return res.end();
                });
            
        });
    }
    
    res.setHeader('Content-Type', 'http');
    res.write('<html><header><title>Hello World</title></header>');
    res.write('<body><h1>Hello World From Node.js</h1></body></html>')
    res.end();
}

module.exports = {
    handler: requestHandler,
    someText: 'some text'
}; // How to export local module