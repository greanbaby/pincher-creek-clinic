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
function makeid( length ) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
    }
    return result;
}
/**
 * ADD
 * @implements Router.get( '/notes/add' )
 * @requires /views/noteedit.ejs
 * @requires makeid
 */
router.get( '/add', ( req, res, next ) => {
    let dataNotesPage = {};
    dataNotesPage.display = {};
    dataNotesPage[ 'display' ].title = 'Add a Note';
    dataNotesPage[ 'display' ].docreate = true;
    dataNotesPage[ 'display' ].notekey = makeid( 14 );
    dataNotesPage.note = undefined;
    res.render( 'noteedit', dataNotesPage );
} );
/**
 * SAVE
 * @async
 * @implements Router.get( '/notes/save' )
 */
router.post( '/save', async ( req, res, next ) => {
    let note;
    if ( req.body.docreate === "create" ) {
        note = await notes.create( req.body.notekey, req.body.title, req.body.body );
    } else {
        note = await notes.update( req.body.notekey, req.body.title, req.body.body );
    }
    res.redirect( '/notes/view?key=' + req.body.notekey );
} );
/**
 * VIEW
 * @async
 * @implements Router.get( '/notes/view' )
 * @requires /views/noteview.ejs
 */
router.get( '/view', async ( req, res, next ) => {
    let note = await notes.read( req.query.key );
    let dataNotesPage = {};
    dataNotesPage.display = {};
    dataNotesPage[ 'display' ].title = note.title;
    dataNotesPage[ 'display' ].notekey = req.query.key;
    dataNotesPage.note = note;
    res.render( 'noteview', dataNotesPage );
} );
/**
 * EDIT
 * @async
 * @implements Router.get( '/notes/edit' )
 * @requires /views/noteedit.ejs
 */
router.get( '/edit', async ( req, res, next ) => {
    let note = await notes.read( req.query.key );
    let dataNotesPage = {};
    dataNotesPage.display = {};
    dataNotesPage[ 'display' ].title = 'Edit ' + note.title;
    dataNotesPage[ 'display' ].notekey = req.query.key;
    dataNotesPage.note = note;
    res.render( 'noteedit', dataNotesPage );
} );
/**
 * DELETE CONFIRMATION
 * @async
 * @implements Router.get( '/notes/destroy' )
 * @requires /views/notedestroy.ejs
 */
router.get( '/destroy', async (req, res, next) => {
    let note = await notes.read( req.query.key );
    let dataNotesPage = {};
    dataNotesPage.display = {};
    dataNotesPage[ 'display' ].title = 'Delete ' + note.title;
    dataNotesPage[ 'display' ].notekey = req.query.key;
    dataNotesPage.note = note;
    res.render( 'notedestroy', dataNotesPage );
} );
/**
 * DELETE (DESTROY)
 * @async
 * @implements Router.get( '/notes/destroy/confirm' )
 */
router.post( '/destroy/confirm', async ( req, res, next ) => {
    await notes.destroy( req.body.notekey );
    res.redirect( '/' );
} );
