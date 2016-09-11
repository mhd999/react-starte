import express from 'express';
import itemMiddleware from '../../middlewares/itemMiddleware';

let router = express.Router();

router.route('/')
	.get(itemMiddleware.getItems);

export default router;