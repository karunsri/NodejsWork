import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken"; // ES module
// const jwt = require("jsonwebtoken");

const app = new express();

const router = express.Router();

app.listen(8000, () => {
    console.log("server is running on port 8000");
});

app.use("/", router);

app.use(express.json()); // built in middlewares(express.static, express.urlencoded)
app.use(bodyParser.json()); // third party middlewares

router.use((req, res, next) => {
    console.log("Request", req.method);
    next();
})

function logger(req, res, next) {
    console.log("Logging request");
    next();
}

router.get("/user", (req, res) => {
    console.log("User path on router instance");
    next();
    ll
});

router.get("/user/:id", logger, (req, res) => {
    console.log("User with some id");
    res.send("user id");
});



app.use((req, res, next) => {
    console.log(req.method);
    next();
},
    (req, res, next) => {
        console.log("Coming to next middleware");
        next();
    });

const books = [
    {
        id: 1,
        title: "Eloquent JavaScript, Third Edition",
        subtitle: "A Modern Introduction to Programming",
        author: "Marijn Haverbeke",
        published: "2018-12-04T00:00:00.000Z",
        publisher: "No Starch Press",
        pages: 472,
        description: "JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.",
        website: "http://eloquentjavascript.net/"
    },
    {
        id: 2,
        title: "Practical Modern JavaScript",
        subtitle: "Dive into ES6 and the Future of JavaScript",
        author: "Nicolás Bevacqua",
        published: "2017-07-16T00:00:00.000Z",
        publisher: "O'Reilly Media",
        pages: 334,
        description: "To get the most out of modern JavaScript, you need learn the latest features of its parent specification, ECMAScript 6 (ES6). This book provides a highly practical look at ES6, without getting lost in the specification or its implementation details.",
        website: "https://github.com/mjavascript/practical-modern-javascript"
    },

];


app.get("/", (req, res) => {
    res.send("Learning APIs");
});

app.get("/books", authenticateUser, (req, res) => {
    res.send(books);
});

app.post("/books", (req, res) => {
    const { title, author, pages } = req.body;
    const newBook = {
        id: Math.random() * 10,
        title: title,
        author: author,
        pages: pages,
    };
    books.push(newBook);
    res.send(books);
})

app.put("/book/:id", (req, res) => {
    const bookId = req.params.id;

    const book = books.find(book => book.id == bookId)

    if (!book) {
        return res.status(404).json({ messsage: "Book not found" });
    }
    const keys = Object.keys(req.body);

    keys.forEach((key) => {
        book[key] = req.body[key];
    });
    res.send(books);
});

app.delete("/book/:id", (req, res) => {
    const bookId = req.params.id;
    const book = books.find(book => book.id == bookId);

    if (!book) {
        return res.status(404).json({ messsage: "Not found" });
    }

    const filteredBooks = books.filter((book) => book.id != bookId);

    res.send(filteredBooks);


});

app.post("/login", (req, res) => {
    const user = req.body.username;

    const accessToken = jwt.sign({user: user}, "secretKey", {expiresIn : "1m"});

    res.send({ token: accessToken });
})

function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, "secretKey", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Jwt Token" });
        }
        req.user = user;
        next();

    })
}



