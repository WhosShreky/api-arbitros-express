require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Arbitros API listening on port ${port} (env SPRING_API_URL=${process.env.SPRING_API_URL})`);
});
