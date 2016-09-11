import express from 'express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import GraphQLHTTP from 'express-graphql';

import {MongoClient} from 'mongodb';

let app = express();
app.use(express.static('public'));
app.use(bodyParser.json());


let db;
const dbUrl = 'mongodb://admin:12345678@ds019866.mlab.com:19866/reactdb';	

MongoClient.connect(dbUrl, (err, database) => {
	if (err) throw err;

  	db = database;
	app.use('/graphql', GraphQLHTTP({
		schema: schema(db),
		graphiql: true
	}));


	app.get('/', (req, res) => {
	    db.collection('items').find({}).toArray((err, items) => {
	        if(err) throw err;
	        res.status(200).json(items);
	    });
	});


	// app.listen(3000, () => console.log('Listening on port 3000'));
	if(!module.parent){ 
    	app.listen(3000); 
	}
});

export default app;

