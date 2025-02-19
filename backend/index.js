require('dotenv').config()
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const validateRouter = require('./routes/validate');
const scoresRouter = require('./routes/scores');

const app = express();

// Application level middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend API' })
});

app.use('/validate', validateRouter);
app.use('/scores', scoresRouter);

// Global error handler
app.use(errorHandler);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));