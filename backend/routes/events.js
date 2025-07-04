import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', authenticateToken, authorizeRoles('admin'), createEvent);
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateEvent);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteEvent);

export default router;
