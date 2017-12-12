const express = require('express');
const path = require('path');
const publicPath = path.join(__dirname, '/../public');

//console.log(__dirname+ '/../public');
//console.log(publicPath);

var app = express();
app.use('/', express.static(publicPath));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started in port ${port}`);
});

