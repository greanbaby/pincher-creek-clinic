/**
 * blogs to the console
 * @name middleware/blogger
 * @exports blogger
 * @author Scott Gingras
 * @since 2022-Feb-15
 */
export default function blogger() {
    return ( req, res, next ) => {
        const date = new Date();
        console.log( 'Request received: ',
            req.method,
            req.url,
            date.toLocaleDateString( 'en-CA'),
            date.toLocaleTimeString( 'en-CA') );
        next();
    };
}
