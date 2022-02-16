/**
 * pincher-creek-clinic
 * Associate Clinic | Pincher Creek, Alberta, Canada
 * Based on: Express 4.17.2, EJS 3.1.6
 * @name pc_clinic_app.js
 * @author Scott Gingras
 * @since 2022-Feb-13
 * @summary instantiate Express from here in this pc_clinic_app file
 */
const express = require( 'express' ),
    path = require( 'path' ),
    blogger = require( './middleware/blogger' ),
    bodyParser = require( 'body-parser' ),
    yields = require( 'express-yields' ),
    index = require( './routes/index' );
/**
 * 1) PC Clinic APP
 * ------------------------------------------------
 * define the port for the server and initialize express
 * @member pc_clinic_app
 */
const PORT = process.env.PORT || 3000,
    pc_clinic_app = express();
/**
 * 2) MIDDLEWARE
 * ------------------------------------------------
 * @implements /middleware/blogger
 * @implements body-parser
 */
pc_clinic_app.use( blogger() );
pc_clinic_app.use( bodyParser.urlencoded( { extended: false, } ) );
/**
 * 3) VIEWS
 * ------------------------------------------------
 * set views namespace to our views folder and instruct Express server to use EJS engine
 * @implements /views
 * @implements /views/EJS
 */
pc_clinic_app.set( 'views', path.join( __dirname, 'views' ) );
pc_clinic_app.set( 'view engine', 'ejs' );
/**
 * 4) STATIC hosting /public
 * ------------------------------------------------
 * register the static middleware to host the public directory
 * @implements /express.static
 */
pc_clinic_app.use( express.static( path.join( __dirname, 'public' ) ) );
/**
 * 5) / INDEX ROUTE
 * ------------------------------------------------
 * mount our index route
 * @implements /routes/index
 */
pc_clinic_app.use( '/', index );
/**
 * 6) ERROR HANDLING
 */
process.on('uncaughtException', function(err) {
    console.error(`I've crashed!!! - ${(err.stack || err)}`);
    process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
    console.error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
    process.exit(1);
});
/**
 * RUN APP
 * ------------------------------------------------
 */
pc_clinic_app.listen( PORT, () => {
    console.log( `Server listening on port ${PORT}` );
});
