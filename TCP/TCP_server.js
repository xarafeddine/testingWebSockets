// var net = require("net");
// var server = net.createServer();
// const port = 3500;
// server.on("connection", function (socket) {
//   console.log("Client connected from", socket.remoteAddress, socket.remotePort);
//   socket.write("Hello from the server!");
//   socket.on("data", function (data) {
//     console.log("Msg from client:", data.toString());
//   });
//   socket.on("close", function (err) {
//     if (err) {
//       console.log("Client disconnected due to error");
//     } else {
//       console.log("Client disconnected");
//     }
//   });
// });
// server.on("listening", function () {
//   console.log("Server is listening on port", port);
// });
// server.listen(port);

const net = require("net");
const readline = require("readline");

const port = 3500;

var server = net.createServer();
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

server.on("connection", function (socket) {
  console.log("Client connected from", socket.remoteAddress, socket.remotePort);
  socket.write("Hello from the server!");

  socket.on("data", function (data) {
    console.log("Msg from client:", data.toString());
  });

  rl.prompt();

  rl.on("line", function (line) {
    socket.write(line);
    rl.prompt();
  });

  socket.on("close", function (err) {
    if (err) {
      console.log("Client disconnected due to error");
    } else {
      console.log("Client disconnected");
    }
  });
});

server.on("listening", function () {
  console.log("Server is listening on port", port);
});

server.listen(port);
