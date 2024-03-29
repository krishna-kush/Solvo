import express from 'express';
import expressWs from 'express-ws'

import { create, deleteAny, close, upAnswer, take, hide, getAll, getEnumerated, getBySearch, getComment, upComment, increment } from '../controllers/posts.js';
import { wsGetEnumerated } from '../controllers/posts.js';

const router = express.Router();
expressWs(router);

router.post('/create', create);
router.post('/delete', deleteAny);
router.post('/close', close);
router.post('/upAnswer', upAnswer);

router.post('/take', take);
router.post('/hide', hide);

router.post('/getAll', getAll);
router.post('/getEnumerated', getEnumerated);
router.post('/getBySearch', getBySearch);

router.post('/comment', getComment);
router.post('/upComment', upComment);

router.post('/increment', increment);

router.ws('/websocket', wsGetEnumerated);

export default router;