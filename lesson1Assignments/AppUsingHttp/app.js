const http = require('http');
const fs = require('fs');
const PORT = 7272;


const serverRouter = function (req, res) {


    if (req.method === "POST") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({'json-body':'sadhana'}));
        // res.end();
    }
    else {
        res.setHeader("Content-Type", "text/html");
        switch (req.url) {

            case "/page1":
                fs.readFile(__dirname + "/public/page1.html", function (err, buffer) {
                    res.writeHead(200);
                    res.write(buffer);
                    res.end();
                })
                break;
            case "/page2":
                fs.readFile(__dirname + "/public/page2.html", function (err, buffer) {
                    res.writeHead(200);
                    res.write(buffer);
                    res.end();
                })
                break;
            case "/":
                fs.readFile(__dirname + "/public/index.html", function (err, buffer) {
                    res.writeHead(200);
                    res.write(buffer);
                    res.end();
                });
                break;


        }
    }
}
const server = http.createServer(serverRouter)
server.listen(PORT, function () {
    console.log("Server Listening on Port", PORT);
});
