require('dotenv').config();

const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [{
    title: "post1",
    description: "this is post1"
}, {
    title: "post2",
    description: "this is post2"
}, {
    title: "post3",
    description: "this is post3"
}, {
    title: "post4",
    description: "this is post4"
}];

app.get('/', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name));
});

app.post('/login', (req, res) => {
    // Authenticate user

    const username = req.body.username;
    const user = { user: username };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
});


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, proess.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user;
        next();

    });
}

app.listen(3000, () => {
    console.log("Server is started at port 3000");
})