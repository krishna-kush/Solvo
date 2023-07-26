import express from 'express';

import { create, upAnswer, getAll, getEnumerated, getBySearch, getComment, upComment, increment } from '../controllers/posts.js';

const router = express.Router();

router.post('/create', create);
router.post('/upAnswer', upAnswer);
router.post('/getAll', getAll);
router.post('/getEnumerated', getEnumerated);
router.post('/getBySearch', getBySearch);

router.post('/comment', getComment);
router.post('/upComment', upComment);

router.post('/increment', increment);

export default router;