import { Router } from 'express';
import { AuthController } from './auth.controller';
import authentication from '../../middlewares/authentication';

const router = Router();

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected routes
router.get('/profile', authentication, AuthController.getProfile);

export default router;
