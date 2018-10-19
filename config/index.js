const privateRoutes = require('./routes/publicRoutes');
const publicRoutes = require('./routes/privateRoutes');

const config = {
  privateRoutes,
  publicRoutes
};

module.exports = config;
