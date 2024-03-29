const { MongoClient } = require('mongodb')
const {connectionString} = require('./pass')
let dbConnection;

module.exports =  {
    connectToDb: cb => {
        MongoClient.connect(connectionString)
        .then(client => {
            dbConnection = client.db();
            cb();
        })
        .catch(err => {
            console.log(err);
            return err
        });
    },
    getDb: () => {
        if(dbConnection){
            return dbConnection
        }
        throw "No database found"
    }
}