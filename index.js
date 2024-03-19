require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5050;

app.get('/', (req, res) => {
  res.send({isAlive: 'True'});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});