import express from 'express';

import { top } from '../controllers/top.js';

const router = express.Router();

router.post('/', top);

export default router;