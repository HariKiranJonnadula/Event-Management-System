import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const initialForm = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  price: '',
  category: '',
  imageUrl: '',
  seatsAvailable: '',
};

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [bookings, setBookings] = useState({});
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await API.get('/api/events');
      setEvents(res.data);
    } catch {
      setError('Failed to fetch events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      if (editingId) {
        await API.put(`/api/events/${editingId}`, form);
        setStatus('Event updated!');
      } else {
        await API.post('/api/events', form);
        setStatus('Event created!');
      }
      setForm(initialForm);
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      setStatus('Failed to save event');
    }
  };

  const handleEdit = event => {
    setForm({ ...event, date: event.date?.slice(0, 10) });
    setEditingId(event._id);
  };

  const handleDelete = async id => {
    try {
      await API.delete(`/api/events/${id}`);
      setStatus('Event deleted!');
      fetchEvents();
    } catch {
      setStatus('Failed to delete event');
    }
  };

  const handleViewBookings = async eventId => {
    try {
      const res = await API.get(`/api/bookings/event/${eventId}`);
      setBookings(prev => ({ ...prev, [eventId]: res.data }));
    } catch {
      setStatus('Failed to fetch bookings');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Admin Dashboard</h2>
      <h3>{editingId ? 'Edit Event' : 'Create Event'}</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />{' '}
        <input name="date" type="date" value={form.date} onChange={handleChange} required />{' '}
        <input name="time" placeholder="Time" value={form.time} onChange={handleChange} required />{' '}
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />{' '}
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />{' '}
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />{' '}
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />{' '}
        <input name="seatsAvailable" type="number" placeholder="Seats" value={form.seatsAvailable} onChange={handleChange} required />{' '}
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />{' '}
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>{' '}
        {editingId && <button type="button" onClick={() => { setForm(initialForm); setEditingId(null); }}>Cancel</button>}
      </form>
      {status && <p style={{ color: status.includes('fail') ? 'red' : 'green' }}>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>All Events</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Title</th><th>Date</th><th>Location</th><th>Price</th><th>Seats</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{event.date ? new Date(event.date).toLocaleDateString() : '-'}</td>
              <td>{event.location}</td>
              <td>₹{event.price}</td>
              <td>{event.seatsAvailable}</td>
              <td>
                <button onClick={() => handleEdit(event)}>Edit</button>{' '}
                <button onClick={() => handleDelete(event._id)}>Delete</button>{' '}
                <button onClick={() => handleViewBookings(event._id)}>View Bookings</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 24 }}>
        {Object.entries(bookings).map(([eventId, eventBookings]) => (
          <div key={eventId} style={{ marginBottom: 16 }}>
            <h4>Bookings for Event ID: {eventId}</h4>
            {eventBookings.length === 0 ? <p>No bookings.</p> : (
              <table border="1" cellPadding="6" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>User</th><th>Tickets</th><th>Total</th><th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {eventBookings.map(b => (
                    <tr key={b._id}>
                      <td>{b.userId?.name || 'User'}</td>
                      <td>{b.ticketCount}</td>
                      <td>₹{b.totalAmount}</td>
                      <td>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
