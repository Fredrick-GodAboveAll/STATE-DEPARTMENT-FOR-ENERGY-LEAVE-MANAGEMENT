// database/migrations.js - CORRECTED VERSION
const fs = require('fs').promises;
const path = require('path');
const connection = require('./connection');

class MigrationRunner {
    constructor() {
        this.migrationsDir = path.join(__dirname, 'migrations');
        this.migrationsTable = 'migrations';
    }

    async createTables() {
        console.log('🚀 Running database migrations...\n');
        
        try {
            // Connect FIRST
            await connection.connect();
            console.log('✅ Connected to database for migrations\n');
            
            // STEP 1: CREATE MIGRATIONS TABLE FIRST - THIS IS CRITICAL!
            await connection.execute(`
                CREATE TABLE IF NOT EXISTS migrations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT UNIQUE NOT NULL,
                    executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log('✅ Created migrations table (or it already exists)\n');
            
            // STEP 2: Get all migration files
            const files = await fs.readdir(this.migrationsDir);
            const migrationFiles = files
                .filter(file => file.endsWith('.js') && file !== 'migration-template.js')
                .sort();
            
            console.log(`📊 Found ${migrationFiles.length} migration files\n`);
            
            // STEP 3: Get already executed migrations
            // Use try-catch in case migrations table has issues
            let executed = [];
            try {
                executed = await connection.all(`SELECT name FROM migrations`);
                console.log(`📊 Already executed: ${executed.length} migrations\n`);
            } catch (error) {
                console.log('⚠️  Could not read migrations table, assuming empty');
                executed = [];
            }
            
            const executedNames = executed.map(row => row.name);
            
            // STEP 4: Run pending migrations
            let runCount = 0;
            for (const file of migrationFiles) {
                if (!executedNames.includes(file)) {
                    console.log(`📋 Running: ${file}`);
                    
                    try {
                        const migration = require(path.join(this.migrationsDir, file));
                        await migration.up(connection);
                        
                        await connection.execute(
                            `INSERT INTO migrations (name) VALUES (?)`,
                            [file]
                        );
                        
                        console.log(`✅ Completed: ${file}\n`);
                        runCount++;
                    } catch (error) {
                        console.error(`❌ Failed to run ${file}:`, error.message);
                        throw error;
                    }
                } else {
                    console.log(`⏭️  Skipping: ${file} (already executed)\n`);
                }
            }
            
            console.log(`🎉 Migration complete! Ran ${runCount} new migration(s)`);
            
        } catch (error) {
            console.error('❌ Migration failed:', error.message);
            throw error;
        }
    }

    async getDatabaseInfo() {
        try {
            // Ensure connection
            if (!connection.isConnected) {
                await connection.connect();
            }
            
            const tables = await connection.all(`
                SELECT name FROM sqlite_master 
                WHERE type='table' AND name NOT LIKE 'sqlite_%'
                ORDER BY name
            `);
            
            // For each table, get the row count
            const tableInfo = [];
            for (const table of tables) {
                try {
                    const countResult = await connection.get(`SELECT COUNT(*) as count FROM ${table.name}`);
                    tableInfo.push({
                        name: table.name,
                        count: countResult.count
                    });
                } catch (countError) {
                    // If we can't count, just add the table name
                    tableInfo.push({
                        name: table.name,
                        count: 0
                    });
                }
            }
            
            return tableInfo;
        } catch (error) {
            console.error('❌ Error in getDatabaseInfo:', error.message);
            return [];
        }
    }
}

// Create and export the runner
const migrationRunner = new MigrationRunner();
module.exports = migrationRunner;