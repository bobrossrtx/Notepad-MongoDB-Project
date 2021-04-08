const mongoose = require('mongoose');
const marked = require('marked');
// const slugify = require('slugify');
const createDomPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const domPurify = createDomPurifier(new JSDOM().window);

const noteSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    /**
     * Leaving slug out for now since
     * I keep getting errors when redirect...
     *      Errors:
     *          Cannot read property '*' of null (* = all items in schema (e.g. title))
     * 
     * I get a result and everything shows up just fine,
     * I get the error in my terminal
     */

    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    sanitizedHtml: {
        type: String,
        required: true
    }
});

noteSchema.pre('validate', function(next) {
    // if (this.title && this.id) {
    //     this.slug = slugify(this.title + " " + this.id, {
    //         lower: true,
    //         strict: true
    //     });
    // }

    if (this.markdown) {
        this.sanitizedHtml = domPurify.sanitize(marked(this.markdown));
    } // Sanitizes the html from markdown to prevent malicious scripts put into the markdown

    next();
});

module.exports = mongoose.model('Note', noteSchema);