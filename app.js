var Kinect2 = require('kinect2'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    opener = require('opener');

var kinect = new Kinect2();


if(kinect.open()) {
    server.listen(8000);

    app.use(express.static(__dirname + '/public'));
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    kinect.on('bodyFrame', function(bodyFrame){
        io.sockets.emit('bodyFrame', bodyFrame);
    });

    kinect.openBodyReader();

    opener('http://localhost:8000');
}