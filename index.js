require('dotenv').config();
const app = require('./src/app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5050;


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, console.log(`Connected to DB and server started on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });