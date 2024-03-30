const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.post('/entries', reviewController.createPost);
router.get('/entries', reviewController.getAllPosts);
router.delete('/entries/:id', reviewController.deletePosts);


module.exports = router;
