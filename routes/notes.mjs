/**
 * /notes router
 * @name /routes/notes.mjs
 * @author Scott Gingras
 * @since 2022-Feb-16
 */
import util from 'util';
import express from 'express';
import { NotesStore as notes } from '../models/notes-store.mjs';
export const router = express.Router();
/**
 * Create a random id with length specified
 * @function makeid
 * @param length the length of the return random id value
 * @returns random alphanumeric id with length specified by parameter
 * @author Scott Gingras
 * @since 2019-Dec-12
 */
function makeid(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
let dataNotesPage = {};  // fill this object with all data fields to pass into EJS template for rendering
/**
 * Notes Page display data
 * @inner dataNotesPage
 * @member display - field holding display text
 * @requires null
 */
dataNotesPage.display = {
};
/**
 * Use EJS with our dataNotesPage object fed to it
 * @async
 * @implements Router.get( '/notes/' )
 * @requires /views/index.ejs
 * @requires dataNotesPage
 */
// /notes/add
router.get( '/add', (req, res, next) => {
    dataNotesPage[ 'display' ].title = 'Add a Note';
    dataNotesPage[ 'display' ].docreate = true;
    dataNotesPage[ 'display' ].notekey = makeid( 24 );
    dataNotesPage.note = undefined;
    res.render( 'noteedit', dataNotesPage );
});

// Save Note (update)
router.post('/save', async (req, res, next) => {
    var note;
    if (req.body.docreate === "create") {
        note = await notes.create(req.body.notekey,
                req.body.title, req.body.body);
    } else {
        note = await notes.update(req.body.notekey,
                req.body.title, req.body.body);
    }
    res.redirect('/notes/view?key='+ req.body.notekey);
});

// Read Note (read)
router.get('/view', async (req, res, next) => {
    var note = await notes.read(req.query.key);
    res.render('noteview', {
            title: note ? note.title : "",
            notekey: req.query.key,
            note: note
    });
});

// Edit note (update)
router.get('/edit', async (req, res, next) => {
    var note = await notes.read(req.query.key);
    res.render('noteedit', {
            title: note ? ("Edit " + note.title) : "Add a Note",
            docreate: false,
            notekey: req.query.key,
            note: note
    });
});

// Ask to Delete note (destroy)
router.get('/destroy', async (req, res, next) => {
    var note = await notes.read(req.query.key);
    res.render('notedestroy', {
            title: note ? note.title : "",
            notekey: req.query.key,
            note: note
    });
});

// Really destroy note (destroy)
router.post('/destroy/confirm', async (req, res, next) => {
    await notes.destroy(req.body.notekey);
    res.redirect('/');
});
