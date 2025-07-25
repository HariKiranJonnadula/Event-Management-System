import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import AuthContext from '../context/AuthContext';

const EventDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [bookingStatus, setBookingStatus] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await API.get(`/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError('Failed to fetch event details');
      }
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const handleBooking = async e => {
    e.preventDefault();
    setBookingStatus('');
    try {
      await API.post('/api/bookings', { eventId: id, ticketCount });
      setBookingStatus('Booking successful!');
      setEvent({ ...event, seatsAvailable: event.seatsAvailable - ticketCount });
    } catch (err) {
      setBookingStatus(err.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <p>Loading event...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!event) return null;

  return (
    <div className="event-details-card">
      <h2>{event.title}</h2>
      <p><b>Date:</b> {new Date(event.date).toLocaleDateString()} <b>Time:</b> {event.time}</p>
      <p><b>Location:</b> {event.location}</p>
      <p><b>Category:</b> {event.category}</p>
      <p><b>Description:</b> {event.description}</p>
      <p><b>Price:</b> ₹{event.price}</p>
      <p><b>Seats Available:</b> {event.seatsAvailable}</p>
      {event.imageUrl && <img src={event.imageUrl} alt={event.title} className="event-details-image" />}
      <hr />
      {user ? (
        event.seatsAvailable > 0 ? (
          <form onSubmit={handleBooking} className="event-booking-form">
            <label>Tickets: </label>
            <input
              type="number"
              min={1}
              max={event.seatsAvailable}
              value={ticketCount}
              onChange={e => setTicketCount(Number(e.target.value))}
              required
            />
            <button type="submit">Book Now</button>
          </form>
        ) : <p className="event-soldout-msg">Sold Out</p>
      ) : <p className="event-login-msg"><i>Login to book tickets.</i></p>}
      {bookingStatus && <p className={bookingStatus === 'Booking successful!' ? 'event-booking-success' : 'event-booking-error'}>{bookingStatus}</p>}
    </div>
  );
};

export default EventDetails;
