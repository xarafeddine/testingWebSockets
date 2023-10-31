const net = require("net");
const readline = require("readline");

const port = 3500;
const host = "127.0.0.1"; // Change this to the IP address or hostname of your server

var client = new net.Socket();

client.connect(port, host, function () {
  console.log("Connected to the server");
  client.write("Hello from the client!");
});

client.on("data", function (data) {
  console.log("Msg from server:", data.toString());
});

client.on("close", function () {
  console.log("Connection closed");
});

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.prompt();
rl.on("line", function (line) {
  client.write(line);
  rl.prompt();
});
