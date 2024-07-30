const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const flightRoutes = require('./routes/flightRoutes');
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api', flightRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));