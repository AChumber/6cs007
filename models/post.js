const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentAuthor: { type: String },
    commentBody: { type: String },
    commentPosted: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    authorEmail: { type:String, required: true },
    postTitle: { type: String, required: true },
    postDesc: { type: String },
    postBody: { type: String, required: true },
    posted: { type: Date, required: true, default: Date.now },
    comments: { 
        type: [commentSchema],
        required: false 
    }
});

module.exports = mongoose.model('Post', postSchema);