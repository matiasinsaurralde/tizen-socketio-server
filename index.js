var http = require('http'),
    app = http.createServer();

var io = require('socket.io').listen(app),
    nicknames = {};

io.sockets.on('connection', function(socket) {
  socket.on( 'ident', function(data) {
    console.log( 'Client identification! ', data );
    nicknames[ socket.id ] = data.nickname;
  });

  socket.on( 'chat', function(data) {
    nickname = nicknames[ socket.id ];
    console.log( 'chat from ' + nickname + ': ' + data.message );
    io.sockets.emit( 'chat', { nickname: nickname, message: data.message } );
  });

});

app.listen(5555);
