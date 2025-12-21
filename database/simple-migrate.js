// database/simple-migrate.js
const fs = require('fs').promises;
const path = require('path');
const connection = require('./connection');

class SimpleMigrate {
    constructor() {
        this.migrationsDir = path.join(__dirname, 'migrations');
        this.migrationsTable = 'migrations';
    }

    async init() {
        await connection.connect();
        return connection.getConnection();
    }

    async createMigrationsTable(db) {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS ${this.migrationsTable} (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    async getExecutedMigrations(db) {
        try {
            const rows = await db.all(`SELECT name FROM ${this.migrationsTable} ORDER BY id`);
            return rows.map(row => row.name);
        } catch (error) {
            // If migrations table doesn't exist yet, return empty array
            return [];
        }
    }

    async runMigrations() {
        console.log('🚀 Starting migrations...\n');
        
        const db = await this.init();
        
        try {
            // Create migrations table if it doesn't exist
            await this.createMigrationsTable(db);
            
            // Get all migration files
            const files = await fs.readdir(this.migrationsDir);
            const migrationFiles = files
                .filter(file => file.endsWith('.js') && file !== 'migration-template.js')
                .sort();
            
            // Get already executed migrations
            const executed = await this.getExecutedMigrations(db);
            
            console.log(`📊 Found ${migrationFiles.length} migration files`);
            console.log(`📊 Already executed: ${executed.length}\n`);
            
            // Run pending migrations
            for (const file of migrationFiles) {
                if (!executed.includes(file)) {
                    console.log(`📋 Running: ${file}`);
                    
                    try {
                        const migration = require(path.join(this.migrationsDir, file));
                        await migration.up(db);
                        
                        // Record migration as executed
                        await db.execute(
                            `INSERT INTO ${this.migrationsTable} (name) VALUES (?)`,
                            [file]
                        );
                        
                        console.log(`✅ Completed: ${file}\n`);
                    } catch (error) {
                        console.error(`❌ Failed: ${file} - ${error.message}`);
                        throw error;
                    }
                } else {
                    console.log(`⏭️  Skipping: ${file} (already executed)\n`);
                }
            }
            
            console.log('🎉 All migrations completed!');
            
        } finally {
            await connection.close();
        }
    }

    async status() {
        console.log('📊 Migration Status\n');
        
        const db = await this.init();
        
        try {
            // Get all migration files
            const files = await fs.readdir(this.migrationsDir);
            const migrationFiles = files
                .filter(file => file.endsWith('.js') && file !== 'migration-template.js')
                .sort();
            
            // Get executed migrations
            const executed = await this.getExecutedMigrations(db);
            const pending = migrationFiles.filter(file => !executed.includes(file));
            
            console.log(`Total migrations: ${migrationFiles.length}`);
            console.log(`Executed: ${executed.length}`);
            console.log(`Pending: ${pending.length}\n`);
            
            if (executed.length > 0) {
                console.log('✅ Executed migrations:');
                executed.forEach(m => console.log(`  - ${m}`));
            }
            
            if (pending.length > 0) {
                console.log('\n⏳ Pending migrations:');
                pending.forEach(m => console.log(`  - ${m}`));
            }
            
        } finally {
            await connection.close();
        }
    }
}

// Create instance
const migrator = new SimpleMigrate();

// Export for use in other files
module.exports = migrator;

// If called directly from command line
if (require.main === module) {
    const command = process.argv[2] || 'help';
    
    async function main() {
        switch (command) {
            case 'up':
                await migrator.runMigrations();
                break;
                
            case 'status':
                await migrator.status();
                break;
                
            case 'help':
            default:
                console.log(`
📦 Database Migration Tool
==========================

Usage: node database/simple-migrate.js [command]

Commands:
  up        Run all pending migrations
  status    Show migration status
  help      Show this help message

Examples:
  node database/simple-migrate.js up
  node database/simple-migrate.js status
                `);
                break;
        }
    }
    
    main().catch(error => {
        console.error('❌ Error:', error.message);
        process.exit(1);
    });
}