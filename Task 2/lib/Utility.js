var http = require("http");
var cheerio = require("cheerio");

module.exports = {
  requestTitle: function (address, getTitle) {
    var splitUrl = address.split("/");

    if (splitUrl[0].indexOf(".com") !== -1) {
      var urlOpts = {
        host: splitUrl[0],
        path: splitUrl[1] == undefined ? "/" : "/" + splitUrl[1] + "/",
        port: "80",
      };

      http
        .get(urlOpts, function (res) {
          var data = "";
          res.on("data", function (chunk) {
            data += chunk;
          });

          res.on("end", function () {
            var $ = cheerio.load(data);
            var title = $("title").text();
            getTitle(title + " - " + address);
          });
        })
        .on("error", function (e) {
          getTitle("Error: " + e.message);
        });
    } else {
      getTitle("Error processing query");
    }
  },
  getCompleteUrl: function (i, callback) {
    return callback(i);
  },
};
