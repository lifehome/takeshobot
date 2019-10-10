const restify  = require("restify");

// Import Route Handler
const catchAllHandler = require("./handlers/endpointModules/catchall").default,
      botHandler      = require("./handlers/endpointModules/botInitializer").default;

// Initialize restify
const server = new restify.createServer({
  name: 'Telegram Bot API / Client-side endpoint service',
  version: '0.1.0'
});

// Initialize restify server with request parser
server.use(restify.plugins.queryParser({
    mapParams: true
}));
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

// Bot handler
server.post('/botService', botHandler);

// Final catch-all handler
server.get('*', catchAllHandler);
server.post('*', catchAllHandler);

// Set the server to listen on something
if(process.env.NODE_ENV != "production"){
  let devport = process.env.dev_port || 3000
  server.listen(devport)
  console.log(`[*] Development server now listening on port ${devport}...\n[+] API server is now up...`)
} else {
  fs.existsSync(process.env.socket_path) && fs.unlinkSync(process.env.socket_path)

  server.listen(process.env.socket_path, ()=>{
    fs.chmodSync(process.env.socket_path, '777');
    console.log(`[*] Booting up at ${new Date()}\n[+] API server is now up...`);
  })
}
