const express = require('express');
const Note = require('./../models/note');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('notes/new', { note: new Note() });
});

router.get('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (note == null | undefined) res.redirect('/');
    res.render('notes/note', { note });
});

router.post('/', async (req, res) => {
    let note = new Note({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    });
    try {
        note = await note.save();
        console.log(note)
        res.redirect(`/notes/${note.id}`);
    } catch (err) {
        console.log(err)
        res.render('notes/new', { note });
    }
});

router.delete('/:id', async (req, res) => {
    await note.findByIdAndDelete(req.params.id);
    re.redirect('/');
})

module.exports = router;