const express = require('express');
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

let books = [];

app.get('/books', (req, res) => {
    res.json(books);
});


let nextId = 1;

app.use(express.json());

app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;
    const book = { id: nextId++, title, author, publishedDate };
    books.push(book);
    res.json(book);

});


app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        res.json({ message: `Book with ID ${id} deleted.` });
    } else {
        res.status(404).json({ message: `Book with ID ${id} not found.` })
    }
})
