"use strict";

module.exports = function(app) {
    var users = require("./models/user.model.js")(app);
    var forms = require("./models/form.model.js")(app);

    require("./services/user.service.js")(app, users);
    require("./services/form.service.js")(app, forms);
    require("./services/field.service.js")(app, forms);
};