var Async = require("async");

var Utility = require("../lib/Utility.js");

var View = require("../views/View.js");

exports.getTitlesAsync = function (request, response) {
  var stack = [];

  View.Header(response);

  if (request.query.address instanceof Array) {
    Async.each(
      request.query.address,
      function (address, callback) {
        Utility.getCompleteUrl(address, function (x2) {
          var getCompleteTitle = function (callback) {
            Utility.requestTitle(x2, function (title) {
              callback(null, title);
            });
          };
          stack.push(getCompleteTitle);
          callback();
        });
      },
      function (err) {
        if (err) {
          console.log("error" + err);
        }
        Async.parallel(stack, function (err, records) {
          if (err) {
            console.log("error" + err);
          }
          for (var i = 0; i < records.length; i++) {
            View.title(response, records[i]);
          }
          View.footer(response);
        });
      }
    );
  } else {
    var getCompleteTitle = function (callback) {
      Utility.requestTitle(request.query.address, function (title) {
        callback(null, title);
      });
    };
    stack.push(getCompleteTitle);
    Async.parallel(stack, function (err, records) {
      if (err) {
        console.log("error" + err);
      }
      for (var i = 0; i < records.length; i++) {
        View.title(response, records[i]);
      }

      View.footer(response);
    });
  }
};
