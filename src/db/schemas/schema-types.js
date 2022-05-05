const shortId = require('shortid');

const SchemaTypes = {
    ANY: '',
    BOOLEAN: {
        type: Boolean,
        required: true,
        default: false,
    },
    OPTIONAL_BOOLEAN: {
        type: Boolean,
        required: false,
        default: false,
    },
    SHORT_ID: {
        type: String,
        required: true,
        default: shortId.generate,
    },
    MANDATORY_STRING: {
        type: String,
        required: true,
        trim: true,
    },
    OPTIONAL_STRING: {
        type: String,
        required: false,
        default: '',
        trim: true,
    },
    MANDATORY_NUMBER: {
        type: Number,
        required: true,
    },
    MANDATORY_ENUM: (values) => ({
        type: String,
        required: true,
        enum: values,
    }),
    OPTIONAL_ENUM: (values) => ({
        type: String,
        required: false,
        enum: values,
    }),
    MANDATORY_TIMESTAMP: {
        type: Date,
        required: true,
    },
    MANDATORY_TIMESTAMP_DEFAULT_NOW: {
        type: Date,
        required: true,
        default: Date.now,
    },
};

module.exports = SchemaTypes;
