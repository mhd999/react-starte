// import db from '../db';

 function getItems(req, res) {
	console.log('the Database', db);
	db.collection('items').find({}).toArray((err, items) => {
		if(err) throw err;
		res.status(200).json(items);
	});	
}

export default {getItems};

