import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  ticketCount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', bookingSchema);
