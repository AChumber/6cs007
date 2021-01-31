const router = require('express').Router();
const Post = require('../../../models/post');
const verifyToken = require('../users/auth.js').verifyToken;  //Get token verification

//@POST blogPosts
//@DESC Create a new post document in the DB.
//@ACCESS Public - Need to be logged in
router.post('/', verifyToken, async (req,res) => {
    const { authorEmail, postTitle, postDesc, postBody } = req.body;

    //Validate if body of req is valid
    if(!authorEmail || !postTitle || !postBody){
        return res.status(400).json({ msg: "Enter all fields" });
    }

    //Create new post document
    const newBlog = new Post({ 
        authorEmail,
        postTitle,
        postDesc,
        postBody
    });

    //Save blog post to DB
    newBlog.save()
        .then(blog => {
            return res.status(200).json({ msg: "Blog Post posted", blog });
        })
        .catch(err => {
            return res.status(400).json({ msg: "Could not create post" });
        });    
});

//@GET blogPosts
//@DESC Gets all blogs in DB. Returns an array of objects.
//@ACCESS Public
router.get('/', async (req, res) => {
    await Post.find({})
        .then(blogs => {
            return res.status(200).json({ blogs });
        })
        .catch(err => res.status(404).json({ msg: "Could not retrieve posts" }));
});

//@GET blogPosts
//@DESC Gets 5 most recent blogs in DB. Returns an array of objects.
//@ACCESS Public
router.get('/mostrecent', async (req, res) => {
    await Post.find().sort({ posted: -1 }).limit(5)
        .then(blogs => {
            return res.status(200).json({ blogs });
        })
        .catch(err => res.status(400).json({ msg: "Could not retrieve recent posts" }));
});

//@GET blogPost (pass id of blog post)
//@DESC Gets one blogs in DB with specified id in req
//@ACCESS Public
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    await Post.find({ _id: id })
        .then(blog => {
            return res.status(200).json({ blog });
        })
        .catch(err => res.status(404).json({ msg: "Could not find Post" }));
});


//@DELETE blogPost (pass id of blog post)
//@DESC Deletes one blogs in DB with specified id in req.
//      Will verify with middleware 
//@ACCESS Public - Need to be logged in
router.delete('/:id', verifyToken, async (req,res) => {
    const id = req.params.id;
    await Post.findByIdAndDelete(id)
        .then(blog =>{
            return res.status(200).json({ msg: `Post '${blog.postTitle}' Deleted`, blog });
        })
        .catch(err => res.status(404).json({ msg: "Could find post to delete" }));
});


//@PUT blogPost (pass id of blog post)
//@DESC Updates one blogs in DB with specified id in req.
//      Will verify with middleware 
//@ACCESS Public - Need to be logged in 
router.put('/:id', verifyToken, async (req, res) => {
    const { postTitle, postDesc, postBody } = req.body;
    //Wont update all fields. Just fields like title, body or desc
    await Post.findByIdAndUpdate(req.params.id, {
        postTitle,
        postDesc,
        postBody
    })
    .then(blog => {
        if(!blog) {
            return res.status(404).json({ msg: "Blog Post not found. Could not update" });
        }
        return res.status(200).json({ msg: "Blog Post Updated" })
    })
    .catch(err => res.status(400).json({ msg: "Could not update blog post" }));
});


//@PUT comment (pass id of blog post to add comment to 'comments' array)
//@DESC Adds a new comment to post in DB with specified id in req.
//      Will verify with middleware 
//@ACCESS Public - Need to be logged in
router.put('/comment/:id', (req, res) => {

});

module.exports = router;