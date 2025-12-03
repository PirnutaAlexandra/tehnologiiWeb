const express = require('express');
const app = express();
const port = 3000;

const logger = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
};

app.use(logger);

const statusRouter = require('./routes/statusRouter');

app.use((err, req, res, next) => {
    console.error("STACK ERROR în primul handler:");
    console.error(err.stack);   
    next(err); 
});

app.use('/status', statusRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ error: "A apărut o eroare în server." });
});

app.listen(port, () => {
    console.log(`Server ok pe portul ${port}`);
});

