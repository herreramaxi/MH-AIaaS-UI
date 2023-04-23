const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    console.log("starting development mode....")
    app.use(cors());
}
else {
    console.log("starting production mode....")

    var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
    const ignoreHosts = [];
    const ignoreRoutes = [];
    app.use(redirectToHTTPS(ignoreHosts, ignoreRoutes));
}

app.use(express.static(__dirname + '/dist/aiaa-s-ui'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/aiaa-s-ui/index.html'));
});

const port = process.env.PORT || 8080;
console.log(`listening on port: ${port}`)

app.listen(port);