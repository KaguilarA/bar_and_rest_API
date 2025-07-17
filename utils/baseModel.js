/**
 * Base model schema for common date fields.
 *
 * This object provides reusable fields for tracking creation and update timestamps
 * in Mongoose schemas or similar ORM models.
 *
 * @property {Object} date_created - Field for the creation date.
 * @property {Date}   date_created.type - The type of the field (Date).
 * @property {Date}   date_created.default - The default value (current date/time).
 * @property {Object} date_updated - Field for the last update date.
 * @property {Date}   date_updated.type - The type of the field (Date).
 */
export default {
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
  }
};