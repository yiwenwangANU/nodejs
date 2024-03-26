const { MongoClient } = require('mongodb');
let _db;

const mongoConnect = cb => {
    MongoClient.connect('mongodb+srv://paradoxraphael:cL0HrZ7dGvVbD9hk@cluster0.rb9vaxh.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
        console.log('Mongodb Atlas Connected');
        _db = client.db()
        cb();
    })
    .catch(err => {
        console.log(err);
        throw err;
    })
}

const getDb = () => {
    if(_db){
        return _db
    }
    throw 'No database found!'
    
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;