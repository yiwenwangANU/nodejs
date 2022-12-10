const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><p>Greeting</p><form action="/create-user" method="POST"><input type="text" name="username" ><input type="submit" value="submit"></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>List of users</title></head>');
        res.write('<body><ul><li>User1</li><li>User2</li><li>User3</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on('data', chunk => body.push(chunk));
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        })
    }
}

module.exports = {
    handler : requestHandler
}