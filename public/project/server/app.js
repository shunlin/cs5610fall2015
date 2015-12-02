"use strict";

module.exports = function(app, db, mongoose) {
    var books = require("./models/book.model.js")(app, mongoose);
    var users = require("./models/user.model.js")(app, mongoose);

    require("./services/book.service.js")(app, books);
    require("./services/user.service.js")(app, users);
};