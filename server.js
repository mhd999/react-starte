import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import {MongoClient} from 'mongodb';

let app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

const dbUrl = 'mongodb://admin:12345678@ds019866.mlab.com:19866/reactdb';

(async () => {
	try {
		let db = await MongoClient.connect(dbUrl);
		let schema = Schema(db);

		app.use('/graphql', GraphQLHTTP({
				schema,
				graphiql: true
			}));


		app.get('/', (req, res) => {
			db.collection('items').find({}).toArray((err, items) => {
				if(err) throw err;
				res.status(200).json(items);
			});
		});

		if(!module.parent){ 
				app.listen(3000,  () => console.log('Listening on port 3000')); 
			}
		//generate schema.json should be removed
		let json = await graphql(schema, introspectionQuery);
		fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err=> {
			if(err) throw err;
			console.log('JSON schema created');
		});
		
	} catch(e) {
		console.log(e);
	}


})();

	

// MongoClient.connect(dbUrl, (err, database) => {
// 	if (err) throw err;

//   	db = database;
// 	app.use('/graphql', GraphQLHTTP({
// 		schema: schema(db),
// 		graphiql: true
// 	}));




// 	// app.listen(3000, () => console.log('Listening on port 3000'));
// 	if(!module.parent){ 
//     	app.listen(3000); 
// 	}
// });

export default app;

