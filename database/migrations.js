// database/migrations.js
const connection = require('./connection');
const schemas = require('./schemas');

class DatabaseMigrations {
    constructor() {
        this.connection = connection;
        this.tables = [
            { name: 'users', schema: schemas.user.CREATE_TABLE },
            { name: 'resets', schema: schemas.reset.CREATE_TABLE },
            { name: 'profiles', schema: schemas.reset.CREATE_PROFILES_TABLE },
            { name: 'holidays', schema: schemas.holiday.CREATE_TABLE },
            { name: 'leave_types', schema: schemas.leavetype.CREATE_TABLE },
            { name: 'employees', schema: schemas.employee.CREATE_TABLE }
        ];
    }

    async createTables() {
        try {
            await this.connection.connect();
            const db = this.connection.getConnection();
            
            console.log('🔄 Creating database tables...');
            
            for (const table of this.tables) {
                await this.connection.execute(table.schema);
                console.log(`✅ Created table: ${table.name}`);
            }
            
            console.log('✅ All tables created successfully');
            return true;
        } catch (error) {
            console.error('❌ Error creating tables:', error.message);
            throw error;
        }
    }

    async dropTables() {
        try {
            await this.connection.connect();
            const db = this.connection.getConnection();
            
            console.log('🔄 Dropping database tables...');
            
            // Drop in reverse order to respect foreign key constraints
            const tables = this.tables.reverse();
            
            for (const table of tables) {
                await this.connection.execute(`DROP TABLE IF EXISTS ${table.name}`);
                console.log(`✅ Dropped table: ${table.name}`);
            }
            
            console.log('✅ All tables dropped successfully');
            return true;
        } catch (error) {
            console.error('❌ Error dropping tables:', error.message);
            throw error;
        }
    }

    async resetDatabase() {
        try {
            console.log('🔄 Resetting database...');
            await this.dropTables();
            await this.createTables();
            console.log('✅ Database reset completed');
            return true;
        } catch (error) {
            console.error('❌ Error resetting database:', error.message);
            throw error;
        }
    }

    async checkTableExists(tableName) {
        try {
            await this.connection.connect();
            const result = await this.connection.get(
                "SELECT name FROM sqlite_master WHERE type='table' AND name=?",
                [tableName]
            );
            return result !== null;
        } catch (error) {
            console.error('❌ Error checking table:', error.message);
            return false;
        }
    }

    async getDatabaseInfo() {
        try {
            await this.connection.connect();
            const tables = await this.connection.all(
                "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
            );
            
            const info = [];
            for (const table of tables) {
                const count = await this.connection.get(`SELECT COUNT(*) as count FROM ${table.name}`);
                info.push({
                    table: table.name,
                    records: count.count
                });
            }
            
            return info;
        } catch (error) {
            console.error('❌ Error getting database info:', error.message);
            throw error;
        }
    }
}

module.exports = new DatabaseMigrations();