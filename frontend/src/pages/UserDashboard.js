import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import AuthContext from '../context/AuthContext';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelStatus, setCancelStatus] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get(`/bookings/user/${user.userId}`);
      setBookings(res.data);
    } catch (err) {
      setError('Failed to fetch bookings');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchBookings();
    // eslint-disable-next-line
  }, [user]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancelStatus('');
    try {
      await API.delete(`/bookings/${bookingId}`);
      setCancelStatus('Booking cancelled successfully');
      setBookings(bookings.filter(b => b._id !== bookingId));
    } catch (err) {
      setCancelStatus('Failed to cancel booking');
    }
  };

  if (!user) return <p>Not authorized.</p>;
  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>My Bookings</h2>
      {cancelStatus && <p style={{ color: cancelStatus.includes('success') ? 'green' : 'red' }}>{cancelStatus}</p>}
      {bookings.length === 0 ? <p>No bookings found.</p> : (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Tickets</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.eventId?.title || 'Event'}</td>
                <td>{booking.eventId?.date ? new Date(booking.eventId.date).toLocaleDateString() : '-'}</td>
                <td>{booking.ticketCount}</td>
                <td>₹{booking.totalAmount}</td>
                <td>Booked</td>
                <td>
                  <button onClick={() => handleCancel(booking._id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserDashboard;
