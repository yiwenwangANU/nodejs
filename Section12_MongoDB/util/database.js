const { MongoClient } = require('mongodb')

let dbConnection;

module.exports =  {
    connectToDb: cb => {
        MongoClient.connect('mongodb+srv://paradoxraphael:cL0HrZ7dGvVbD9hk@cluster0.rb9vaxh.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
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