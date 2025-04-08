const app = require('./app');
const connectDB = require('./config/db');
const { port } = require('./config/config');


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});