import express from 'express';

// import { getUser, createUser, checkUser } from '../controllers/auth.js';
import { checkUser } from '../controllers/auth.js';

const router = express.Router();

// router.get('/', getUser);
// router.post('/create', createUser);
router.post('/check', checkUser);

export default router;