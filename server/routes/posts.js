import express from 'express';

import { create, upAnswer, getAll, getComments } from '../controllers/posts.js';

const router = express.Router();

router.post('/create', create);
router.post('/upAnswer', upAnswer);
router.post('/getAll', getAll);
router.get('/comments', getComments);

export default router;