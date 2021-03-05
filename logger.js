const EventEmitter = require('events');
const { v4: uuidv4 } = require('uuid');

class Logger extends EventEmitter{
    log(msg) {
        // Call event
        this.emit('message', { id: uuidv4(), msg } );
    }
}

// module.exports = Logger;
const logger = new Logger();

logger.on('message', data => console.log('Called Listener', data));

logger.log("Hello World!");