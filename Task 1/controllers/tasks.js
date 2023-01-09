var Utility = require("../lib/Utility.js");

var View = require("../views/View.js");

exports.getTitles = function (request, response) {
  View.Header(response);

  if (request.query.address instanceof Array) {
    var arrayLength = request.query.address.length;
    for (var counter = 0; counter < arrayLength; counter++) {
      Utility.requestTitle(request.query.address[counter], function (title) {
        View.title(response, title);
        if (arrayLength == counter + 1) {
          View.footer(response);
        }
      });
    }
  } else {
    Utility.requestTitle(request.query.address, function (title) {
      View.title(response, title);
      View.footer(response);
    });
  }
};
