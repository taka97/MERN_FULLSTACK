require('dotenv').config();

const dg = require('debug')('MERN:main');
const app = require('./app');

const port = process.env.PORT || 5000;

(async () => {
  await app.listen(port);
  dg(`Server is listening on port ${port}`);
})();
