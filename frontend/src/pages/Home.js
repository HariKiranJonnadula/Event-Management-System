import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import Hero from '../components/Hero';
import Features from '../components/Features';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ title: '', date: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (filters.title) params.title = filters.title;
      if (filters.date) params.date = filters.date;
      if (filters.category) params.category = filters.category;
      const res = await API.get('/api/events', { params });
      setEvents(res.data);
    } catch (err) {
      setError('Failed to fetch events');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, [filters]);

  const handleChange = e => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <>
      <Hero />
      <Features />
      <section id="events">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="event-filters">
          <input
            name="title"
            placeholder="Search by Title"
            value={filters.title}
            onChange={handleChange}
          />
          <input
            name="date"
            type="date"
            value={filters.date}
            onChange={handleChange}
          />
          <input
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleChange}
          />
        </div>
        {loading ? <p>Loading events...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
          <div className="event-list">
            {events.length === 0 ? <p>No events found.</p> : (
              events.map(event => (
                <div key={event._id} className="event-card">
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="event-image" />
                  ) : (
                    <div className="event-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '2rem' }}>No Image</div>
                  )}
                  <div className="event-card-content">
                    <div className="event-title">{event.title}</div>
                    <div className="event-meta"><b>Date:</b> {new Date(event.date).toLocaleDateString()} <b>Time:</b> {event.time}</div>
                    <div className="event-meta"><b>Location:</b> {event.location}</div>
                    <div className="event-meta"><b>Category:</b> {event.category}</div>
                    <div className="event-meta"><b>Price:</b> ₹{event.price}</div>
                    <div className="event-meta"><b>Seats:</b> {event.seatsAvailable}</div>
                    <Link to={`/event/${event._id}`} className="event-view-btn">View Details</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
