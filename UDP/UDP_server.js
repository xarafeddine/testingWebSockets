// const dgram = require("dgram");
// const server = dgram.createSocket("udp4");
// const port = 3500;
// server.on("message", (data, rinfo) => {
//   console.log(`Msg from client at port: ${rinfo.port}: ${data}`);
//   server.send("Hello from server", rinfo.port, "localhost");
// });
// server.on("listening", function () {
//   console.log("Server is listening on port", port);
// });
// server.on("close", function (err) {
//   if (err) {
//     console.log("Client disconnected due to error");
//   } else {
//     console.log("Client disconnected");
//   }
//   server.close();
// });
// server.bind(port);

const dgram = require("dgram");
const readline = require("readline");
const server = dgram.createSocket("udp4");
const port = 3500;
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});
let clientPort = 0;
server.on("message", (data, rinfo) => {
  console.log(`Msg from client at port: ${rinfo.port}: ${data}`);
  clientPort = rinfo.port;
});
server.on("listening", function () {
  console.log("Server is listening on port", port);
});
server.on("close", function (err) {
  if (err) {
    console.log("Client disconnected due to error");
  } else {
    console.log("Client disconnected");
  }
  server.close();
});

rl.prompt();
rl.on("line", (message) => {
  server.send(message, clientPort, "localhost");
  rl.prompt();
});

server.bind(port);
