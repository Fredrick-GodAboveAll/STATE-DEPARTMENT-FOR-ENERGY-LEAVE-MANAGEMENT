// database/connection.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DatabaseConnection {
    constructor(dbPath = './auth.db') {
        this.dbPath = dbPath;
        this.db = null;
        this.isConnected = false;
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                // If already connected, return existing connection
                if (this.db && this.isConnected) {
                    resolve(this.db);
                    return;
                }

                this.db = new sqlite3.Database(this.dbPath, (err) => {
                    if (err) {
                        console.error('❌ Database connection error:', err.message);
                        reject(err);
                        return;
                    }
                    
                    this.isConnected = true;
                    console.log('✅ Connected to SQLite database');
                    
                    // Enable foreign keys
                    this.db.run('PRAGMA foreign_keys = ON', (err) => {
                        if (err) {
                            console.warn('⚠️ Could not enable foreign keys:', err.message);
                        }
                        resolve(this.db);
                    });
                });
            } catch (error) {
                console.error('❌ Database connection failed:', error);
                reject(error);
            }
        });
    }

    getConnection() {
        if (!this.db || !this.isConnected) {
            throw new Error('Database not connected. Call connect() first.');
        }
        return this.db;
    }

    close() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                this.db.close((err) => {
                    if (err) {
                        console.error('❌ Database close error:', err.message);
                        reject(err);
                        return;
                    }
                    this.isConnected = false;
                    console.log('✅ Database connection closed');
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    // Helper method for executing queries
    execute(sql, params = []) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not connected'));
                return;
            }
            
            this.db.run(sql, ...params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ lastID: this.lastID, changes: this.changes });
                }
            });
        });
    }

    // Helper method for fetching single row
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not connected'));
                return;
            }
            
            this.db.get(sql, ...params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row || null);
                }
            });
        });
    }

    // Helper method for fetching multiple rows
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database not connected'));
                return;
            }
            
            this.db.all(sql, ...params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows || []);
                }
            });
        });
    }
}

// Create singleton instance
const databaseConnection = new DatabaseConnection();

module.exports = databaseConnection;