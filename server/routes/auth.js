import express from 'express';

import { whoId, whoProfile, google, signUp, logIn, ifLogIn } from '../controllers/auth.js';

import auth from '../middleware/auth.js';

const router = express.Router();

// router.get('/', getUser);
router.post('/whoId', whoId);
router.post('/whoProfile', whoProfile);
router.post('/login', logIn);
router.post('/iflogin', auth, ifLogIn);
router.post('/create', signUp);
router.post('/google', google);

export default router;