import React from 'react';

const features = [
  {
    icon: '🎉',
    title: 'Plan Events',
    desc: 'Admins can create, update, and manage all campus events with just a few clicks.'
  },
  {
    icon: '🎫',
    title: 'Book Tickets',
    desc: 'Students can browse, filter, and book tickets for upcoming events instantly.'
  },
  {
    icon: '📊',
    title: 'Manage Dashboard',
    desc: 'Track bookings, manage your profile, and view event stats in a modern dashboard.'
  }
];

const Features = () => (
  <section className="features">
    {features.map((f, i) => (
      <div className="feature-card" key={i}>
        <div className="feature-icon">{f.icon}</div>
        <div className="feature-title">{f.title}</div>
        <div className="feature-desc">{f.desc}</div>
      </div>
    ))}
  </section>
);

export default Features;
