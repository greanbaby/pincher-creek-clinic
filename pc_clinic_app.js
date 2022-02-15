/**
 * Associate Clinic, Pincher Creek, Alberta
 * pincher-creek-clinic Express 4.17.2 app
 * @name pc_clinic_app.js
 * @author Scott Gingras
 * @since 2022-Feb-13
 * @summary instantiate Express from here in this pc_clinic_app file
 */
const express = require( 'express' ),
    path = require( 'path' ),
    index = require( './routes/index' );
/**
 * define the port for the server and initialize express
 * @member pc_clinic_app
 */
const PORT = process.env.PORT || 3000,
    pc_clinic_app = express();
/**
 * set views namespace to our views folder and
 * instruct Express server to use EJS template engine
 @implements EJS
 */
pc_clinic_app.set( 'views', path.join( __dirname, 'views' ) );
pc_clinic_app.set( 'view engine', 'ejs' );
/**
 * register the static middleware to host the public directory
 * @implements express.static
 */
pc_clinic_app.use( express.static( path.join( __dirname, 'public' ) ) );
/**
 * mount our index route
 * @implements /routes/index
 */
pc_clinic_app.use( '/', index );
/**
 * start Express server on specified port
 * @implements PORT
 */
pc_clinic_app.listen( PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
