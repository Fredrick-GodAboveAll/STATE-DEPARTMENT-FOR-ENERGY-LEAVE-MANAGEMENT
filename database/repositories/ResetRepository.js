// database/repositories/ResetRepository.js
const connection = require('../connection');
const schemas = require('../schemas');

class ResetRepository {
    constructor() {
        this.connection = connection;
        this.schema = schemas.reset;
    }

    async createToken(email, token, expires) {
        try {
            // Clean up expired tokens first
            await this.connection.execute(this.schema.DELETE_EXPIRED_TOKENS);
            
            const result = await this.connection.execute(
                this.schema.INSERT_RESET_TOKEN,
                [email, token, expires]
            );
            
            return { id: result.lastID, email, token, expires };
        } catch (error) {
            console.error('ResetRepository.createToken error:', error.message);
            throw error;
        }
    }

    async findToken(token) {
        try {
            // Clean up expired tokens first
            await this.connection.execute(this.schema.DELETE_EXPIRED_TOKENS);
            
            const resetToken = await this.connection.get(this.schema.GET_RESET_TOKEN, [token]);
            return resetToken;
        } catch (error) {
            console.error('ResetRepository.findToken error:', error.message);
            throw error;
        }
    }

    async deleteToken(token) {
        try {
            const result = await this.connection.execute(this.schema.DELETE_RESET_TOKEN, [token]);
            return result.changes > 0;
        } catch (error) {
            console.error('ResetRepository.deleteToken error:', error.message);
            throw error;
        }
    }

    async createProfile(profileData) {
        try {
            const { user_id, avatar_url, bio, website } = profileData;
            const result = await this.connection.execute(
                this.schema.INSERT_PROFILE,
                [user_id, avatar_url || null, bio || null, website || null]
            );
            
            return { id: result.lastID, ...profileData };
        } catch (error) {
            console.error('ResetRepository.createProfile error:', error.message);
            throw error;
        }
    }

    async findProfileByUserId(user_id) {
        try {
            const profile = await this.connection.get(this.schema.GET_PROFILE_BY_USER_ID, [user_id]);
            return profile;
        } catch (error) {
            console.error('ResetRepository.findProfileByUserId error:', error.message);
            throw error;
        }
    }

    async updateProfile(user_id, profileData) {
        try {
            const { avatar_url, bio, website } = profileData;
            const result = await this.connection.execute(
                this.schema.UPDATE_PROFILE,
                [avatar_url || null, bio || null, website || null, user_id]
            );
            
            return result.changes > 0 ? await this.findProfileByUserId(user_id) : null;
        } catch (error) {
            console.error('ResetRepository.updateProfile error:', error.message);
            throw error;
        }
    }

    async deleteExpiredTokens() {
        try {
            const result = await this.connection.execute(this.schema.DELETE_EXPIRED_TOKENS);
            return result.changes;
        } catch (error) {
            console.error('ResetRepository.deleteExpiredTokens error:', error.message);
            throw error;
        }
    }

    async getProfileWithUser(user_id) {
        try {
            const sql = `
                SELECT p.*, u.first_name, u.last_name, u.email
                FROM profiles p
                JOIN users u ON p.user_id = u.id
                WHERE p.user_id = ?
            `;
            
            const profile = await this.connection.get(sql, [user_id]);
            return profile;
        } catch (error) {
            console.error('ResetRepository.getProfileWithUser error:', error.message);
            throw error;
        }
    }
}

module.exports = new ResetRepository();