const { getIndex } = require('../controllers');

function setRoutes(app) {
  app.get('/', getIndex);
}

module.exports = setRoutes;