import express from 'express';

import { who, google, signUp, logIn } from '../controllers/auth.js';

const router = express.Router();

// router.get('/', getUser);
router.post('/who', who);
router.post('/check', logIn);
router.post('/create', signUp);
router.post('/google', google);

export default router;