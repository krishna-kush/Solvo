import express from 'express';

// import { getUser, createUser, checkUser } from '../controllers/auth.js';
import { google, signUp, logIn } from '../controllers/auth.js';

const router = express.Router();

// router.get('/', getUser);
router.post('/check', logIn);
router.post('/create', signUp);
router.post('/google', google);

export default router;