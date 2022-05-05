// eslint-disable-next-line max-classes-per-file
const Mongoose = require('mongoose');
const _ = require('lodash');
const mongoosePaginate = require('mongoose-paginate');
const SchemaTypes = require('./schema-types');

class DBSchema extends Mongoose.Schema {

    constructor(schema = {}, options = {}) {
        // eslint-disable-next-line no-param-reassign
        schema.deleted = schema.deleted || SchemaTypes.OPTIONAL_BOOLEAN;
        super(schema, _.defaults({
            timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
            // read: 'secondaryPreferred'
        }, options));
    }

}

class BaseSchema {

    constructor(...args) {
        const schema = new DBSchema(...args);
        schema.pre('find', function () {
            const query = this.getQuery();
            if (!(query.deleted === false || query.deleted === 'false' || query.deleted)) {
                this.where({ deleted: { $ne: true } });
            }
        });
        schema.pre('findOne', function () {
            const query = this.getQuery();
            if (!(query.deleted === false || query.deleted === 'false' || query.deleted)) {
                this.where({ deleted: { $ne: true } });
            }
        });

        schema.pre('count', function () {
            const query = this.getQuery();
            if (!(query.deleted === false || query.deleted === 'false' || query.deleted)) {
                this.where({ deleted: { $ne: true } });
            }
        });
        schema.plugin(mongoosePaginate);
        return schema;
    }

}

module.exports = BaseSchema;
