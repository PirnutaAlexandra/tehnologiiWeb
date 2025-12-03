const express=require('express');
const app=express();
const port =3000;
const Book=require('./Book')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const bookRouter=express.Router();
app.use('/api', bookRouter);

app.get('/', (req, res)=>{
    res.send('Welcome to my api');
})

let books = [new Book(1, "Dune", "sf", "Frank Herbert"),
new Book(2, "Robinson Crusoe", "adventure", "Daniel Defoe"),
new Book(3, "Foundation", "sf", "Asimov")];

app.get('/books', (req, res)=>{
  let filteredBooks = [];
  if(req.query.genre){
      filteredBooks=books.filter(x=>x.genre == req.query.genre);
  }else{
    filteredBooks=books;
  }
  res.json(filteredBooks);
})

app.get('/books/sorted', (req, res)=>{
  let sortedBooks = [...books].sort((a, b) => {
    if(a.name > b.name) return 1;
    if(a.name < b.name) return -1;
    return 0;
  });
  res.json(sortedBooks);
})

app.post('/addBooks', (req, res) => {
    const { id, name, genre, author } = req.body;

    if (id === undefined || id === null || !name || !genre || !author) {
        return res.status(400).json({
            error: "Toti parametrii sunt obligatorii: id, name, genre, author"
        });
    }

    const numericId = Number(id);

    if (Number.isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
        return res.status(400).json({
            error: "ID-ul trebuie sa fie un numar intreg pozitiv"
        });
    }

    if (books.find(b => b.id === numericId)) {
        return res.status(400).json({
            error: "Exista deja o carte cu acest ID"
        });
    }

    const newBook = new Book(
        numericId,
        name.trim(),
        genre.trim(),
        author.trim()
    );

    books.push(newBook);

    return res.status(201).json(newBook);
});

app.listen(port, ()=>{
    console.log('Running on port' + port);

})