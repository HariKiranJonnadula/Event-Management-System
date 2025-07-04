import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';

dotenv.config();

const ADMIN_ID = '68669cbdaa4afa42da7860d6';
const events = [
  {
    title: 'TechnoFest 2025',
    description: 'Annual technical festival with workshops, hackathons, and guest lectures.',
    date: '2025-08-20',
    time: '10:00',
    location: 'Main Auditorium',
    price: 100,
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    seatsAvailable: 200,
    createdBy: ADMIN_ID
  },
  {
    title: 'Cultural Night',
    description: 'A night of music, dance, and drama performances by students.',
    date: '2025-09-05',
    time: '18:30',
    location: 'Open Air Theatre',
    price: 50,
    category: 'Cultural',
    imageUrl: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
    seatsAvailable: 300,
    createdBy: ADMIN_ID
  },
  {
    title: 'Annual Sports Meet',
    description: 'Track and field events, football, cricket, and more.',
    date: '2025-10-15',
    time: '09:00',
    location: 'Sports Ground',
    price: 0,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
    seatsAvailable: 500,
    createdBy: ADMIN_ID
  },
  {
    title: 'Web Development Bootcamp',
    description: 'Hands-on workshop on building web apps using MERN stack.',
    date: '2025-08-25',
    time: '14:00',
    location: 'Lab 3B',
    price: 200,
    category: 'Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    seatsAvailable: 50,
    createdBy: ADMIN_ID
  },
  {
    title: 'Career Guidance Seminar',
    description: 'Expert talks on career planning and higher studies.',
    date: '2025-09-12',
    time: '11:00',
    location: 'Seminar Hall',
    price: 0,
    category: 'Seminar',
    imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    seatsAvailable: 120,
    createdBy: ADMIN_ID
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Event.deleteMany({}); // Clear existing events
    await Event.insertMany(events);
    console.log('Sample events inserted successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding events:', err);
    process.exit(1);
  }
}

seed();
