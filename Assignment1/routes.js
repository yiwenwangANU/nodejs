const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/'){
        res.write('<html><head><title>Greeting</title></head><body><h1>Greeting</h1><br>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">username</button></form>')
        res.write('</body></html>');
        return res.end();
    }
    if (url === '/users'){
        res.write('<html><head><title>Users</title></head><body><ul><li>User1</li><li>User2</li><li>User3</li></ul></body></html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST'){
        const body = []; // For the buffers
        req.on('data', (chunk) => { // Event listener, 'data' is the event and the arrow function is the listener, executed async
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end' ,() => { // Another event listener, use return to make sure the lines after do not get executed
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const username = parseBody.split('=')[1];
            console.log(username);
        });
        
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end()
    }
}

module.exports  = {
    handler: requestHandler
}