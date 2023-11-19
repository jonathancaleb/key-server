require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const licenseRoutes = require('./routes/licenseRoutes');

const app = express();
app.use(express.json());

// Connect to MongoDB using the connection string from the environment variable
const mongoURI = process.env.MONGO_URI; // This variable should contain your MongoDB connection string
mongoose.connect(mongoURI, {
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Use license routes
app.use('/license', licenseRoutes);
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
