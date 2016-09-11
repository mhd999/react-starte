import express from 'express';
import itemRoutes from './itemRoutes';

let router = express.Router();

router.use('/items', itemRoutes);

export default router;