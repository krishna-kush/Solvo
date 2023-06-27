import express from 'express';

import { create, upAnswer, getAll, getComment, upComment, increment } from '../controllers/posts.js';

const router = express.Router();

router.post('/create', create);
router.post('/upAnswer', upAnswer);
router.post('/getAll', getAll);

router.post('/comment', getComment);
router.post('/upComment', upComment);

router.post('/increment', increment);

export default router;