/**
 * Index page router
 * @name /routes/index.mjs
 * @author Scott Gingras
 * @since 2022-Feb-15
 */
import express from 'express';
import util from 'util';
import { NotesStore as notes } from '../models/notes-store.mjs';

export const router = express.Router();

let dataHomePage = {};  // fill this object with all data fields to pass into EJS template for rendering
/**
 * Home Page display data
 * @inner dataHomePage
 * @member display - field holding display text
 * @requires null
 */
dataHomePage.display = {
    title: 'Pincher Creek Clinic',
};
/**
 * Use EJS to render the Home Page with our dataHomePage object fed to it
 * @async
 * @implements Router.get( '/' )
 * @requires /views/index.ejs
 * @requires dataHomePage
 */
router.get( '/', async ( req, res ) => {
    /**
     * Home Page noteslist data
     * Get the notes.keylist() to get the keys for all Notes objects,
     * then go get Notes object from the keys to populate noteslist
     * @inner dataHomePage
     * @member noteslist - field holding the array of Notes objects
     * @requires NotesStore.keylist
     * @requires NotesStore.read(key)
     */
    let keylist = await notes.keylist();
    let keyPromises = keylist.map(key => {
        return notes.read(key)
    });
    let noteslist = await Promise.all(keyPromises);
    dataHomePage.noteslist = noteslist;

    // .render INDEX / Home Page using dataHomePage {display, noteslist}
    res.render( 'index', dataHomePage );
} );
