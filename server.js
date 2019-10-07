const restify  = require("restify");

// Import Route Handler
const catchAllHandler = require("./handlers/catchall"),
      botHandler      = require("./handlers/botInitializer");

// Initialize restify
const server = new restify();

// Initialize restify server with request parser
server.use(restify.plugins.queryParser({
    mapParams: true
}));
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

// Bot handler
server.post('/botService', botHandler(req, res, next));

// Final catch-all handler
server.get('*'. catchAllHandler(req, res, next));
server.post('*'. catchAllHandler(req, res, next));