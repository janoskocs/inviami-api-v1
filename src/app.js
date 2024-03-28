const express = require('express');
const app = express();
const cors = require('cors');

const EventRoutes = require('./routes/event.route');
// const CustomersRoutes = require('./routes/customer.route');
// const AttendeesRoutes = require('./routes/attendee.route');
const AdministrationRoutes = require('./routes/administration.route');
const checkAuth = require('./middlewares/auth.middleware');

const {CLIENT_URL} = process.env;
const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccesStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({isAlive: true});
});
  
app.use('/api/v1/event', EventRoutes);

app.use(checkAuth);
app.use('/api/v1/administration', AdministrationRoutes);

module.exports = app;