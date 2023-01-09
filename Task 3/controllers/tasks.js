var stream = require("stream");

var Utility = require("../lib/Utility.js");

var View = require("../views/View.js");

exports.getTitlesStream = function (request, response) {
  View.Header(response);

  if (request.query.address instanceof Array) {
    var transformStream = new stream.Transform({
      transform: function (chunk, encoding, callback) {
        Utility.requestTitle(
          chunk.toString(),
          function (title) {
            this.push(title);
            callback();
          }.bind(this)
        );
      },
    });

    request.query.address.forEach(function (address) {
      transformStream.write(address);
    });
    transformStream.end();

    transformStream.on("data", function (title) {
      View.title(response, title);
    });
    transformStream.on("end", function () {
      View.footer(response);
    });
  } else {
    Utility.requestTitle(request.query.address, function (title) {
      View.title(response, title);
      View.footer(response);
    });
  }
};
