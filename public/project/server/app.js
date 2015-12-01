"use strict";

module.exports = function(app, db, mongoose) {
    var books = require("./models/book.model.js")(app, mongoose);

    require("./services/book.service.js")(app, books);
};