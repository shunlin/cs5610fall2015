"use strict";

module.exports = function(app, mongoose) {
    var FieldSchema = require("./field.schema.js")(app, mongoose);

    var FormSchema = mongoose.Schema({
        title : String,
        userId: String,
        fields: [FieldSchema]
    }, {
        collection: "cs5610.assignment.form"
    });
    return FormSchema;
};