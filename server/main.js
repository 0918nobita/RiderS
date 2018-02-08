const express = require('express');
const app = express();

app.get('/', function(request, response) {
	response.send('Hello, world!');
});

const server = app.listen(3000, function() {
	console.log('It works!');
});
