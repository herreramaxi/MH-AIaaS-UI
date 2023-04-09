const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/aiaa-s-ui'));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/aiaa-s-ui/index.html'));
});

const port = process.env.PORT || 8080;
console.log(`listening on port: ${port}`)

app.listen(port);