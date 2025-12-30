module.exports = {
    async up(db) {
        console.log('➕ Adding carry_forward_days to leave_types table...');

        const columns = await db.all('PRAGMA table_info(leave_types)');
        const columnNames = columns.map(col => col.name);

        if (!columnNames.includes('carry_forward_days')) {
            await db.execute('ALTER TABLE leave_types ADD COLUMN carry_forward_days INTEGER');
            console.log('✅ Added carry_forward_days column');
        } else {
            console.log('⏭️ carry_forward_days column already exists');
        }

        console.log('✅ carry_forward_days migration complete');
    },

    async down(db) {
        console.log('⚠️ SQLite cannot remove columns easily. Manual rollback required to remove carry_forward_days');
    }
};