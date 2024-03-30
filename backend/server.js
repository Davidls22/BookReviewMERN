const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const reviewRoutes = require('./routes/reviewRoutes'); 



const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors());

// MongoDB connection string
const MONGODB_URI = "mongodb+srv://davidsugden1:VUPryZi8L88Vwom9@cluster0.igizvfd.mongodb.net/";

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Define routes
app.use('/api', reviewRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
