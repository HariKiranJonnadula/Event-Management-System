import express from 'express';
import {
  createBooking,
  getUserBookings,
  getEventBookings,
  deleteBooking
} from '../controllers/bookingController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createBooking);
router.get('/user/:userId', authenticateToken, getUserBookings);
router.get('/event/:eventId', authenticateToken, getEventBookings);
router.delete('/:id', authenticateToken, deleteBooking);

export default router;
