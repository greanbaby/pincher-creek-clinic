/**
 * pincher-creek-clinic
 * Associate Clinic | Pincher Creek, Alberta, Canada
 * Based on: Express 4.17.2, EJS 3.1.6
 * @name pc_clinic_app.mjs
 * @author Scott Gingras
 * @since 2022-Feb-13
 * @summary instantiate Express from here in this pc_clinic_app file
 * COMMAND LINE STARTUP OPTIONS:
 * >$ REQUEST_LOG_FILE=log.txt REQUEST_LOG_FORMAT=common DEBUG=pincher-creek-clinic:* npm start
 * >$ REQUEST_LOG_FORMAT=common DEBUG=pincher-creek-clinic:* npm start
 * >$ DEBUG=pincher-creek-clinic:* npm start
 */
 import fs from 'fs-extra';
 import rfs from 'rotating-file-stream';
 import createError from 'http-errors';
 import express from 'express';
 import path from 'path';
 import cookieParser from 'cookie-parser';
 import bodyParser from 'body-parser';
 import * as http from 'http';
 import logger from 'morgan';
 import util from 'util';
 import yields from 'express-yields';
 import { useModel as useNotesModel } from './models/notes-store.mjs';
 import {
     normalizePort, onError, onListening, handle404, basicErrorHandler
 } from './appsupport.mjs';
 import { approotdir } from './approotdir.mjs';
 const __dirname = approotdir;
 import { router as indexRouter } from './routes/index.mjs';
 import { router as notesRouter } from './routes/notes.mjs';
/**
 * 1) PC Clinic APP
 * ------------------------------------------------
 * define the port for the server and initialize express
 * @member pc_clinic_app
 */
const pc_clinic_app = express();
/**
 * 2) MIDDLEWARE
 * ------------------------------------------------
 * @implements /middleware/blogger
 * @implements body-parser
 */
// pc_clinic_app.use( blogger() );
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
// DEFAULT to "memory" storage if not specified by environment variable
let strStorageModel = 'memory';
if (process.env.NOTES_MODEL) {
    strStorageModel = process.env.NOTES_MODEL
};
useNotesModel(strStorageModel)
.then(store => {  })
.catch(error => { onError({ code: 'ENOTESSTORE', error }); });


// LOGGING
var logStream;
// Log to a file if requested for example if started like:
// REQUEST_LOG_FILE=log.txt REQUEST_LOG_FORMAT=common DEBUG=pcwebserver:* npm start
if (process.env.REQUEST_LOG_FILE) {
  (async () => {
    let logDirectory = path.dirname(process.env.REQUEST_LOG_FILE);
    await fs.ensureDir(logDirectory);
  })().catch(err => { console.error(err); });
}
// Use Apache common format for logs if requested
pc_clinic_app.use(logger(process.env.REQUEST_LOG_FORMAT || 'dev', {
    stream: process.env.REQUEST_LOG_FILE ?
        rfs.createStream(process.env.REQUEST_LOG_FILE, {
            size: '10M',     // rotate every 10 MegaBytes written
            interval: '1d',  // rotate daily
            compress: 'gzip' // compress rotated files
        })
        : process.stdout
}));

// OTHER SETUP
pc_clinic_app.use(bodyParser.json());
pc_clinic_app.use(bodyParser.urlencoded({ extended: false }));
pc_clinic_app.use(cookieParser());
pc_clinic_app.use(express.static(path.join(__dirname, 'public')));
pc_clinic_app.use('/assets/vendor/feather-icons', express.static(
   path.join(__dirname, 'node_modules', 'feather-icons', 'dist')));



// --------------------------------------------------------
// CONNECT ROUTERS
pc_clinic_app.use('/', indexRouter);
pc_clinic_app.use('/notes', notesRouter);
// --------------------------------------------------------


// ERROR HANDLER
// catch 404 and forward to error handler
pc_clinic_app.use(handle404);
pc_clinic_app.use(basicErrorHandler);

process.on('uncaughtException', function(err) {
    console.error(`I've crashed!!! - ${(err.stack || err)}`);
    process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
    console.error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
    process.exit(1);
});

// RUN THAT
export const port = normalizePort(process.env.PORT || '3000');
pc_clinic_app.set('port', port);
export const server = http.createServer(pc_clinic_app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
export default pc_clinic_app;
