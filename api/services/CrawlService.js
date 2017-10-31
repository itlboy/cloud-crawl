const Crawler = require("crawler");
const vm = require('vm');

var crawl = function (uri, code, callback) {
    var c = new Crawler({
        jQuery: true, // set false to suppress warning message.
        callback: function (err, res) {
            if (err) {
                callback(err);
            } else {
                var returnResult = {
                    success: true,
                    message: "success",
                    result: {}
                };
                const sandbox = {
                    $: res.$,
                    result: {},
                };
                const context = vm.createContext(sandbox);
                const script = new vm.Script("var result = function() { " + code + " }()");
                try {
                    script.runInContext(context);
                    returnResult.result = sandbox.result;
                } catch (e) {
                    returnResult.success = false;
                    returnResult.message = "fail";
                    returnResult.error = {
                        type: "Run custom js code fail",
                        message: e.message
                    };
                }
                callback(false, returnResult);
            }
        }
    });

    c.queue(uri);
}

module.exports = crawl;