// database/migrations/migration-template.js
/**
 * MIGRATION TEMPLATE
 * 
 * How to use:
 * 1. Copy this file: cp migration-template.js 00X_description.js
 * 2. Replace 00X with the next number (001, 002, etc.)
 * 3. Write your SQL in up() and down() functions
 * 4. Test before running
 */

module.exports = {
    /**
     * Apply changes to database
     * @param {Object} db - Database connection object
     */
    async up(db) {
        // WRITE YOUR SQL HERE
        // Example: await db.execute('CREATE TABLE users (id INTEGER PRIMARY KEY)');
    },

    /**
     * Undo the changes (rollback)
     * @param {Object} db - Database connection object
     */
    async down(db) {
        // WRITE ROLLBACK SQL HERE
        // Example: await db.execute('DROP TABLE users');
    }
};