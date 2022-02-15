/**
 * blogs to the console
 * @name middleware/blogger
 * @exports blogger
 * @author Scott Gingras
 * @since 2022-Feb-15
 */
module.exports = blogger;
function blogger() {
    return ( req, res, next ) => {
        console.log( 'Request received: ', req.method, req.url );
        next();
    };
}
