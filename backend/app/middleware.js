// middleware.js
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));
  
  // Route pour récupérer les informations de session
  app.get('/api/session', (req, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ message: 'User session not found' });
    }
  });
};
