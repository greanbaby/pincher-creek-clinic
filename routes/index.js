/**
 * Index page router
 * @name /routes/index.js
 * @author Scott Gingras
 * @since 2022-Feb-15
 */
const express = require('express'),
    router = express.Router();
router.get("/", (req, res) => {
    const title = "Clinic";
    res.send(` <html> <head> <title> ${title} </title> <link rel="stylesheet" href="styles.css"></head><body> <h1> ${title} </h1> <p> Running ${title} </p> </body> </html> `);
    });
module.exports = router;
