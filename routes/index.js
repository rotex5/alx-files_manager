import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();

// GET
router.get('/status', AppController.getstatus);
router.get('/stats', AppController.getstats);

module.exports = router;
