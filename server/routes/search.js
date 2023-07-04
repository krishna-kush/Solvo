import express from 'express';

import { question, topic, channel } from '../controllers/search.js';

const router = express.Router();

router.post('/question', question);
router.post('/topic', topic);
router.post('/channel', channel);

export default router;