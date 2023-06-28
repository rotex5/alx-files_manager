import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();

// GET
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router;
