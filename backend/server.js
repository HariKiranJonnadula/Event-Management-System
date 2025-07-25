import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://eventtify.netlify.app' 
  ],
  credentials: true
}));
app.use(express.json());

// Auth Routes
app.use('/api/auth', authRoutes);
// Event Routes
app.use('/api/events', eventRoutes);
// Booking Routes
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventdb';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
