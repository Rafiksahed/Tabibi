const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors({
        origin: 'http://localhost:3000', // Assurez-vous que ceci correspond à l'URL de votre frontend
        credentials: true
    }));
    app.use(bodyParser.json());
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false, // Mettez à true si vous êtes en HTTPS
            maxAge: 24 * 60 * 60 * 1000 // 24 heures
        }
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
