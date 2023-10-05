import express from 'express';

import { select } from '../controllers/comment.js';

const router = express.Router();

router.post('/select', select);

export default router;