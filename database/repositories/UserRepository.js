// database/repositories/UserRepository.js - UPDATED
const connection = require('../connection');
const schemas = require('../schemas');

class UserRepository {
    constructor() {
        this.connection = connection;
        this.schema = schemas.user;
    }

    async create(userData) {
        try {
            const { first_name, last_name, email, password, last_login } = userData;
            const result = await this.connection.execute(
                this.schema.INSERT_USER,
                [first_name, last_name, email, password, last_login || new Date().toISOString()]
            );
            
            return { id: result.lastID, ...userData };
        } catch (error) {
            console.error('UserRepository.create error:', error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            const user = await this.connection.get(this.schema.GET_USER_BY_ID, [id]);
            return user;
        } catch (error) {
            console.error('UserRepository.findById error:', error.message);
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const user = await this.connection.get(this.schema.GET_USER_BY_EMAIL, [email]);
            return user;
        } catch (error) {
            console.error('UserRepository.findByEmail error:', error.message);
            throw error;
        }
    }

    async findAll() {
        try {
            const users = await this.connection.all(this.schema.GET_ALL_USERS);
            return users;
        } catch (error) {
            console.error('UserRepository.findAll error:', error.message);
            throw error;
        }
    }

    async update(id, userData) {
        try {
            const { first_name, last_name, email, last_login } = userData;
            await this.connection.execute(
                this.schema.UPDATE_USER,
                [first_name, last_name, email, last_login || null, id]
            );
            
            return await this.findById(id);
        } catch (error) {
            console.error('UserRepository.update error:', error.message);
            throw error;
        }
    }

    async updatePassword(id, password) {
        try {
            await this.connection.execute(this.schema.UPDATE_PASSWORD, [password, id]);
            return true;
        } catch (error) {
            console.error('UserRepository.updatePassword error:', error.message);
            throw error;
        }
    }

    async updateLastLogin(id) {
        try {
            await this.connection.execute(this.schema.UPDATE_LAST_LOGIN, [id]);
            return true;
        } catch (error) {
            console.error('UserRepository.updateLastLogin error:', error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.connection.execute(this.schema.DELETE_USER, [id]);
            return result.changes > 0;
        } catch (error) {
            console.error('UserRepository.delete error:', error.message);
            throw error;
        }
    }

    async count() {
        try {
            const result = await this.connection.get(this.schema.COUNT_USERS);
            return result ? result.count : 0;
        } catch (error) {
            console.error('UserRepository.count error:', error.message);
            return 0;
        }
    }

    async search(query) {
        try {
            const searchQuery = `%${query}%`;
            const sql = `
                SELECT id, first_name, last_name, email, created_at, last_login 
                FROM users 
                WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?
                ORDER BY last_name, first_name
            `;
            
            const users = await this.connection.all(sql, [searchQuery, searchQuery, searchQuery]);
            return users;
        } catch (error) {
            console.error('UserRepository.search error:', error.message);
            throw error;
        }
    }
}

module.exports = new UserRepository();