// database/migrate.js
const migrationRunner = require('./migrations');

async function showStatus() {
    console.log('📊 Migration Status\n');
    
    try {
        const status = await migrationRunner.getStatus();
        
        console.log(`Total migrations: ${status.total}`);
        console.log(`Executed: ${status.executed}`);
        console.log(`Pending: ${status.pending}`);
        
        if (status.details.length > 0) {
            console.log('\n✅ Executed migrations:');
            status.details.forEach(m => {
                const date = new Date(m.executed_at).toLocaleString();
                console.log(`  - ${m.name} (${date})`);
            });
        }
        
        console.log('\n💡 Run migrations: node -e "require(\'./database/migrations\').createTables()"');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function runMigrations() {
    console.log('🚀 Running all migrations...\n');
    
    try {
        await migrationRunner.createTables();
        console.log('\n✅ Migration completed!');
    } catch (error) {
        console.error('\n❌ Migration failed:', error.message);
    }
}

// If called from command line
if (require.main === module) {
    const command = process.argv[2] || 'status';
    
    if (command === 'up') {
        runMigrations();
    } else if (command === 'status') {
        showStatus();
    } else {
        console.log(`
📦 Migration Commands:
  node database/migrate.js status   Show migration status
  node database/migrate.js up       Run pending migrations
  
Or use the direct method:
  node -e "require('./database/migrations').createTables()"
        `);
    }
}

// Export for testing
module.exports = { runMigrations, showStatus };