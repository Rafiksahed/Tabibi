// app.js
const app = require('./app/middleware');
const routes = require('./app/routes');

app.use(routes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
