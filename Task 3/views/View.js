module.exports = {
  Header: function (response) {
    if (!response.finished) {
      response.write("<html>");
      response.write("<body>");
      response.write("<h1>Following are the titles of given websites: </h1>");
      response.write("<ul>");
    }
  },

  title: function (response, title) {
    if (!response.finished) {
      response.write("<li>" + title + "</li>");
    }
  },

  footer: function (response) {
    if (!response.finished) {
      response.write("</ul>");
      response.write("</body>");
      response.write("</html>");
      response.end();
    }
  },
  errorLog: function (response, msg) {
    if (!response.finished) {
      response.write(msg);
    }
  },
};
