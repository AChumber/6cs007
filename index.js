require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/api/users/auth.js');

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
    })
    .then(() => console.log("Connected to DB!"))
    .catch('error', () => console.log("Could not connect to Database!"));
mongoose.set('useCreateIndex', true);

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

/*Routes*/ 
app.use('/api/users', require('./routes/api/users/users.js'));
app.use('/api/auth', authRoute.router);
app.use('/api/blogpost', require('./routes/api/posts/posts.js'));

//Dummy root route
app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Running on localhost on port ${PORT}.`));