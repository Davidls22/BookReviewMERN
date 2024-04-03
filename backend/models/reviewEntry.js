const mongoose = require('mongoose');

const blogEntrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0, 
        max: 5, 
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    bookCoverUrl: {
        type: String  
    },
    genre: {
        type: String 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BlogEntry', blogEntrySchema);
