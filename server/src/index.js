require('dotenv').config();

const dg = require('debug')('MERN:main');
const config = require('config');
const app = require('./app');

const port = process.env.PORT || config.port;

(async () => {
  await app.listen(port);
  dg(`Server is listening on port ${port}`);
})();
