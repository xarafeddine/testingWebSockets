const dgram = require("dgram");
const readline = require("readline");
const client = dgram.createSocket("udp4");

const serverPort = 3500;
const serverHost = "localhost";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

client.on("message", (message, rinfo) => {
  console.log(`Msg from server at port: ${rinfo.port}: ${message}`);
});

rl.prompt();
rl.on("line", (message) => {
  client.send(message, serverPort, serverHost, (err) => {
    if (err) {
      console.error("Error sending message:", err);
      client.close();
    }
  });
});

client.on("close", () => {
  console.log("Client disconnected");
  client.close();
});
