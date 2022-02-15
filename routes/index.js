/**
 * Index page router
 * @name /routes/index.js
 * @author Scott Gingras
 * @since 2022-Feb-15
 */
const express = require('express'),
    router = express.Router();
router.get("/:named?", (req, res) => {
    const title = 'Express',
        named = req.params.named;
    res.render( 'index', {
        title: title,
        named: named
    });
});
router.post( '/data', (req, res) => {
    res.redirect( `/${req.body.named}` );
});
module.exports = router;
/*
router.get("/", (req, res) => {
    const title = "Clinic";
    res.render( 'index', {
        title: 'Clinic with EJS',
    });
});
*/
