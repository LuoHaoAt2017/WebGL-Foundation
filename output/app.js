import express from 'express';
const port = 9090;
const server = express();
server.use(express.static('assets'));
server.use(express.static('shader'));
server.listen(port, 'localhost', function () {
  console.log('server listen on ', port);
});
export default server;