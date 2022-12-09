const EventEmitter = require('events');
const celebrity = new EventEmitter();

// subscribe to celebrity for observer1
celebrity.on('race', (result) => {
    if (result == 'win'){
        console.log('Congratulation!');
    }
        
});

// subscribe to celebrity for observer2
celebrity.on('race', (result) => {
    if (result == 'lost'){
        console.log('Failed!');
    }
});

// subscribe to celebrity for observer3
process.on('exit', (code) => {
    console.log('Press exit event with code: ', code);
});

celebrity.emit('race', 'win');
celebrity.emit('race', 'lost');
//celebrity.emit('exit');