import Booking from '../models/Booking.js';
import Event from '../models/Event.js';

export const createBooking = async (req, res) => {
  try {
    const { eventId, ticketCount } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.seatsAvailable < ticketCount) return res.status(400).json({ message: 'Not enough seats available' });
    const totalAmount = event.price * ticketCount;
    const booking = new Booking({
      userId: req.user.userId,
      eventId,
      ticketCount,
      totalAmount
    });
    await booking.save();
    event.seatsAvailable -= ticketCount;
    await event.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('eventId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};

export const getEventBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ eventId: req.params.eventId }).populate('userId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    // Only booking owner or admin can cancel
    if (req.user.role !== 'admin' && booking.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }
    await Booking.findByIdAndDelete(req.params.id);
    // Optionally, add seats back to event
    const event = await Event.findById(booking.eventId);
    if (event) {
      event.seatsAvailable += booking.ticketCount;
      await event.save();
    }
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
};
