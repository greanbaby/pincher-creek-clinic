/**
 * Index page router
 * @name /routes/index.js
 * @author Scott Gingras
 * @since 2022-Feb-15
 */
const express = require( 'express' ),
    router = express.Router(),
    dataHomePage = {};
/**
 * Application Home Page '/'
 * @inner dataHomePage
 * @member display - object holding display text
 */
dataHomePage.display = {
    title: 'Pincher Creek Clinic',
};
/**
 * Use EJS to render the Home Page with our dataHomePage object fed to it
 * @requires /views/index.ejs
 */
router.get( '/', ( req, res ) => {
    res.render( 'index', dataHomePage );
} );
module.exports = router;
