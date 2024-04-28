const express = require('express');
const appMiddleware = require('./app/middleware'); // Importez le middleware
const routes = require('./app/routes');

const app = express();

// Utilisez le middleware de session en premier
appMiddleware(app);

// Ensuite, définissez vos routes
app.use(routes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
