const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const authRoutes = require('./routes/auth');
const arbitrosRoutes = require('./routes/arbitros');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/arbitros', arbitrosRoutes);

app.get('/', (req, res) => res.json({ ok: true, name: 'Arbitros API', version: '1.0.0' }));

module.exports = app;
