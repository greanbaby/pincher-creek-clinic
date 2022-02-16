/**
 * Index page router
 * @name /routes/index.js
 * @author Scott Gingras
 * @since 2022-Feb-15
 */
import express from 'express';
import util from 'util';
import { NotesStore as notes } from '../models/notes-store.mjs';

export const router = express.Router();

let dataHomePage = {};


/**
 * Application Home Page '/'
 * @inner dataHomePage
 * @member display - field holding display text
 */
dataHomePage.display = {
    title: 'Pincher Creek Clinic',
};
/**
 * Use EJS to render the Home Page with our dataHomePage object fed to it
 * @requires /views/index.ejs
 */
router.get( '/', async ( req, res ) => {
    /**
     * Get the notes.keylist() to get the keys for all Notes objects,
     * then go get Notes object from the keys to populate noteslist
     * @member noteslist - field holding the array of Notes objects
     * @requires NotesStore.keylist
     * @requires NotesStore.read(key)
     */
    let keylist = await notes.keylist();
    let keyPromises = keylist.map(key => {
        return notes.read(key)
    });
    let notelist = await Promise.all(keyPromises);
    dataHomePage.noteslist = notelist;
    // now dataHomePage will have these fields: 1)display  2)noteslist
//    console.log( dataHomePage );
    res.render( 'index', dataHomePage );
} );
