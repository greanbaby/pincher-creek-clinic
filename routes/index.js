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
    res.render( 'index', {
        title: 'Clinic with EJS',
    });
});
module.exports = router;
