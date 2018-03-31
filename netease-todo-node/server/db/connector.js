const mongoose = require('mongoose');

// Override mongoose promise with ES6 Promise
mongoose.Promise = global.Promise;

exports.connectDB = () => {
  connectStr = 'mongodb://localhost:27017/todo';
  mongoose.connect(connectStr);
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log(`todo db connection successful, to${connectStr}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('todo db disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  gracefulExit();
  // process.exit(0);
});

process.on('SIGTERM', () => {
  gracefulExit();
});

function gracefulExit() {
  mongoose.connection.close(() => {
    console.log('todo db connection disconnected through app termination')
    process.exit(0);
  });
}
