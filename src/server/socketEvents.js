exports = module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Connection to socket');
    socket.on('user invited to bid', function(data) {
      socket.emit('new bid invitation', data);
      console.log(data);
    })

    socket.on('disconnect', function () {
      console.log('A user disconnected');
    });
  });
}
