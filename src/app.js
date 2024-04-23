const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const cors = require('cors');

const EventRoutes = require('./routes/event.route');
// const CustomersRoutes = require('./routes/customer.route');
// const AttendeesRoutes = require('./routes/attendee.route');
const AdministrationRoutes = require('./routes/administration.route');
const checkAuth = require('./middlewares/auth.middleware');

app.use(express.json({ limit: '1kb' }));
app.use(helmet());

app.disable('x-powered-by');
app.use(xss());
app.use(mongoSanitize());

const { CLIENT_URL } = process.env;
const corsOptions = {
  origin: CLIENT_URL,
  optionsSuccesStatus: 200,
};
//add corsoptions
app.use(cors(corsOptions));

const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});

app.use(limiter);

app.get('/', (req, res) => {
  res.status(200).json({ isAlive: true });
});

app.use('/api/v1/event', EventRoutes);

app.use('/api/v1/administration', AdministrationRoutes);

// custom 404
app.use((req, res, next) => {
  res.status(404).send('Sorry, this resource does not exist!');
});

// custom error handler
app.use((err, req, res, next) => {
  res
    .status(500)
    .send('Something went wrong! Contact us to resolve this issue.');
});
module.exports = app;
