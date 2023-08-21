import express from 'express';

import { follow, unFollow } from '../controllers/follow.js';

const router = express.Router();

router.post('/follow', follow);
router.post('/unFollow', unFollow);

export default router;