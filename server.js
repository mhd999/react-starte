// import express from 'express';
const express  = require('express');
const mongoClient = require('mongodb').MongoClient;

let app = express();

app.use(express.static('public'));

//DB url
const dbUrl = 'mongodb://admin:12345678@ds019866.mlab.com:19866/reactdb';

mongoClient.connect(dbUrl, (err, database) => {
    if(err) throw err;

    let db = database;


    app.get('/api/v1/items', (req, res) => {
        db.collection('items').find({}).toArray((err, items) => {
            if(err) throw err;
            res.json(items);
        });
    });


    //start node server
    app.listen(3000, () => {console.log('App listen to port 3000')});

    

}); 


