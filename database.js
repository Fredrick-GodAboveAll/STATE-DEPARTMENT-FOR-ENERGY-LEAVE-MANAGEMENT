/**
 * database.js
 * -------------------------------------------------
 * Compatibility wrapper.
 * This file ensures that `require('./database')`
 * always loads the new modular database system
 * located in /database/index.js
 */

'use strict';

// Export the modular database entry point
const database = require('./database/index');

module.exports = database;
