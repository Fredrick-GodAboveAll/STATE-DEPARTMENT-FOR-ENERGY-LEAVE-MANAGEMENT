// database/index.js
'use strict';

const connection = require('./connection');
const migrations = require('./migrations');
const seeder = require('./seed');

// Repository instances
const UserRepository = require('./repositories/UserRepository');
const HolidayRepository = require('./repositories/HolidayRepository');
const LeaveTypeRepository = require('./repositories/LeaveTypeRepository');
const EmployeeRepository = require('./repositories/EmployeeRepository');
const ResetRepository = require('./repositories/ResetRepository');
const DepartmentRepository = require('./repositories/DepartmentRepository');
const LeaveApplicationRepository = require('./repositories/LeaveApplicationRepository');

// Schemas
const schemas = require('./schemas');

class Database {
    constructor() {
        this.connection = connection;
        this.migrations = migrations;
        this.seeder = seeder;

        // Repositories
        this.users = UserRepository;
        this.holidays = HolidayRepository;
        this.leaveTypes = LeaveTypeRepository;
        this.employees = EmployeeRepository;
        this.resets = ResetRepository;
        this.departments = DepartmentRepository;
        this.leaveApplications = LeaveApplicationRepository;

        this.schemas = schemas;
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return true;

        console.log('🔄 Initializing database...');
        await this.connection.connect();
        await this.migrations.createTables();
        
        await this.seeder.seedAll();

        this.initialized = true;
        console.log('✅ Database initialization completed');
        return true;
    }

    async getStatus() {
        try {
            const tables = await this.migrations.getDatabaseInfo();
            return {
                connected: this.connection.isConnected,
                initialized: this.initialized,
                databasePath: this.connection.dbPath,
                tables: tables || []
            };
        } catch (error) {
            console.error('⚠️ Could not get database status:', error.message);
            return {
                connected: this.connection.isConnected,
                initialized: this.initialized,
                databasePath: this.connection.dbPath,
                tables: [],
                error: error.message
            };
        }
    }

    async close() {
        await this.connection.close();
        this.initialized = false;
        console.log('✅ Database connection closed');
    }
}

// Singleton instance
const dbInstance = new Database();

// Backward-compatible initializer
const initializeDatabase = async () => dbInstance.initialize();

module.exports = {
    db: dbInstance,

    // Direct repository exports
    users: UserRepository,
    holidays: HolidayRepository,
    leaveTypes: LeaveTypeRepository,
    employees: EmployeeRepository,
    resets: ResetRepository,
    departments: DepartmentRepository,  // Make sure this is here

    // Core modules
    connection,
    migrations,
    seeder,

    schemas,

    initializeDatabase
};