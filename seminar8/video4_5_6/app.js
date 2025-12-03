const express = require('express')
const Book = require('./Book')
const app = express()
const port = 3000


const bookRouter = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', bookRouter)


let books = [new Book(1, "Dune", "sf", "Frank Herbert"),
new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
new Book(3, "Foundation", "sf", "Asimov")]

bookRouter.route('/books')
    .get((req, res) => {
        let filteredBooks = [];
        if (req.query.genre) {
            filteredBooks = books.filter(x => x.genre === req.query.genre)
        }
        else {
            filteredBooks = books;
        }
        res.json(filteredBooks);
    })

    .post((req, res) => {
        let newBook = new Book(req.body.id, req.body.name, req.body.genre, req.body.author);

        books.push(newBook);
        console.log(books);
        return res.json(newBook);
    })
bookRouter.route('/books/:bookId')
    .put((req, res) => {
        let bookModif = books.find(e => e.id === Number(req.params.bookId))
        bookModif.genre = req.body.genre
        bookModif.author = bookModif.author
        return res.json(bookModif)
    })
    .delete((req, res) => {
        let bookIndex = books.findIndex(e => e.id === Number(req.params.bookId))
        if (bookIndex === -1) {
            return res.status(404).json({ message: 'Book not found' })
        }
        let deletedBook = books.splice(bookIndex, 1)[0]
        return res.json(deletedBook)
    })


app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.listen(port, () => {
    console.log('Running on the port ' + port)
})