const router = require('express').Router();
const { Post, Comment } = require('../../../models/post');
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

//@POST myPosts
//@DESC Return all blogs that are authored by the email passed(unique)
//@ACCESS Public - Need to be logged in
router.post('/my-posts', verifyToken, async (req, res) => {
    const { authorEmail } = req.body;

    //Validate if body of req is valid
    if(!authorEmail){
        return res.status(400).json({ msg: "Enter all fields" });
    }
    //Find all posts by email passed
    await Post.find({ authorEmail })
        .then(blogs => {
            return res.status(200).json({ blogs });
        })
        .catch(err => res.status(400).json({ msg: "Could not retrieve recent posts" }));
});

//@GET blogPosts
//@DESC Gets all blogs in DB. Returns an array of objects.
//@ACCESS Public
router.get('/', async (req, res) => {
    const offset = Number.parseInt(req.query.offset) || 0;
    const limit = Number.parseInt(req.query.limit) || 0;
    //If no query found return all documents retrieved
    if(!offset && !limit){
        await Post.find({})
            .then(blogs => {
                return res.status(200).json({ blogs });
            })
            .catch(err => {
                return res.status(404).json({ msg: "Could not retrieve posts" });
            });
    } else {
        await Post.find({}, null, { limit: limit, skip: offset })
            .then(blogs => {
                return res.status(200).json({ blogs });
            })
            .catch(err => {
                return res.status(404).json({ msg: "Could not retrieve posts" })
            });
    }
});

//@GET blogPosts
//@DESC Gets 3 most recent blogs in DB. Returns an array of objects.
//@ACCESS Public
router.get('/mostrecent', async (req, res) => {
    await Post.find().sort({ posted: -1 }).limit(3)
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
    await Post.findById(id)
        .then(blog => {
            return res.status(200).json({ blog });
        })
        .catch(err => res.status(404).json({ msg: "Could not find Post", blog:{} }));
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
router.post('/comment', async (req, res) => {
    const { commentAuthor, commentBody, postId } = req.body;
    const comment = new Comment({
        commentAuthor, 
        commentBody
    });
    //Push the comment model created to the blog post
    await Post.findByIdAndUpdate({ _id: postId }, 
        { $push: { comments: comment } },
        { new: true, safe: true, upsert: true })
        .then(blog => {
            if(!blog) {
                return res.status(404).json({ msg: "Blog Post not found. Could not add comment" });
            }
            return res.status(200).json({ msg: "Commented added to blog", comment });
        })
        .catch(err => res.status(400).json({ msg: "Comment Could not be added to the blog post", err }));
});

module.exports = router;