const ReviewEntry = require("../models/reviewEntry");

exports.createPost = async (req, res) => {
  const { title, rating, content, author, bookCoverUrl, genre } = req.body;
  try {
    const newPost = new ReviewEntry({ title, rating, content, author, bookCoverUrl, genre });
    await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const post = await ReviewEntry.find();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

  // Delete a blog entry
exports.deletePosts = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEntry = await ReviewEntry.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Review entry not found' });
        }
        res.json({ message: 'Review entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  
