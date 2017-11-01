/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    run: function (req, res) {
        uri = req.param("uri");
        console.log(uri);

        code = req.param("code");
        CrawlService(uri, code, function (err, result) {
            res.json(result);
        });
    },
    form: function (req, res) {
        res.view("crawl/form");
    }
};