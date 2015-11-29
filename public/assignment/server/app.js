"use strict";

module.exports = function(app, db, mongoose) {
    var users = require("./models/user.model.js")(app, mongoose);
    var forms = require("./models/form.model.js")(app, mongoose);

    require("./services/user.service.js")(app, users);
    require("./services/form.service.js")(app, forms);
    require("./services/field.service.js")(app, forms);
};