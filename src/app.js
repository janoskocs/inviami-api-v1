const express = require('express');
const app = express();

const EventsRoutes = require('./routes/events.routes');
const CustomersRoutes = require('./routes/customers.routes');
const AttendeesRoutes = require('./routes/attendees.routes');
const AdministrationRoutes = require('./routes/administration.routes');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({isAlive: true});
});
  
app.use('/api/v1/events', EventsRoutes);
app.use('/api/v1/customers', CustomersRoutes);
app.use('/api/v1/attendees', AttendeesRoutes);

app.use('/api/v1/administration', AdministrationRoutes);

module.exports = app;