const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/notes')
const Note = require('./models/note')
const app = express();

mongoose.connect("mongodb://localhost/notepad", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.error('App starting error:', err.stack);
})

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const notes = await Note.find().sort({ createdAt: 'desc' });
    res.render('notes/index', { notes });
});

app.use('/notes', postRouter);

app.listen(8000);