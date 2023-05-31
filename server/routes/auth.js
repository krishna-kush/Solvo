import express from 'express';

// import { getUser, createUser, checkUser } from '../controllers/auth.js';
import { google } from '../controllers/auth.js';

const router = express.Router();

// router.get('/', getUser);
// router.post('/create', createUser);
router.post('/google', google);

export default router;