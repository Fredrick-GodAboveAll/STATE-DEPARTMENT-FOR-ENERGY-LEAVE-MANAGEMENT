// database/repositories/LeaveTypeRepository.js - FIXED for Node.js v13
const connection = require('../connection');
const schemas = require('../schemas');

class LeaveTypeRepository {
    constructor() {
        this.connection = connection;
        this.schema = schemas.leavetype;
    }

    async create(leaveData) {
        try {
            const { leave_name, color, entitled_days, gender_restriction, description, carry_forward_days, status } = leaveData;
            const result = await this.connection.execute(
                this.schema.INSERT_LEAVE_TYPE,
                [
                    leave_name, 
                    color || 'primary', 
                    entitled_days, 
                    gender_restriction || 'All', 
                    description, 
                    (typeof carry_forward_days !== 'undefined' && carry_forward_days !== null) ? carry_forward_days : null,
                    status || 'Active'
                ]
            );
            
            return { id: result.lastID, ...leaveData };
        } catch (error) {
            console.error('LeaveTypeRepository.create error:', error.message);
            throw error;
        }
    }

    async findAll() {
        try {
            const leaveTypes = await this.connection.all(this.schema.GET_ALL_LEAVE_TYPES);
            return leaveTypes;
        } catch (error) {
            console.error('LeaveTypeRepository.findAll error:', error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            const leaveType = await this.connection.get(this.schema.GET_LEAVE_TYPE_BY_ID, [id]);
            return leaveType;
        } catch (error) {
            console.error('LeaveTypeRepository.findById error:', error.message);
            throw error;
        }
    }

    async findByStatus(status) {
        try {
            const leaveTypes = await this.connection.all(this.schema.GET_LEAVE_TYPES_BY_STATUS, [status]);
            return leaveTypes;
        } catch (error) {
            console.error('LeaveTypeRepository.findByStatus error:', error.message);
            throw error;
        }
    }

    async findActive() {
        try {
            const leaveTypes = await this.connection.all(this.schema.GET_ACTIVE_LEAVE_TYPES);
            return leaveTypes;
        } catch (error) {
            console.error('LeaveTypeRepository.findActive error:', error.message);
            throw error;
        }
    }

    async update(id, leaveData) {
        try {
            const { leave_name, color, entitled_days, gender_restriction, description, carry_forward_days, status } = leaveData;
            const result = await this.connection.execute(
                this.schema.UPDATE_LEAVE_TYPE,
                [
                    leave_name, 
                    color || 'primary', 
                    entitled_days, 
                    gender_restriction || 'All', 
                    description, 
                    (typeof carry_forward_days !== 'undefined' && carry_forward_days !== null) ? carry_forward_days : null,
                    status || 'Active', 
                    id
                ]
            );
            
            return result.changes > 0 ? await this.findById(id) : null;
        } catch (error) {
            console.error('LeaveTypeRepository.update error:', error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.connection.execute(this.schema.DELETE_LEAVE_TYPE, [id]);
            return result.changes > 0;
        } catch (error) {
            console.error('LeaveTypeRepository.delete error:', error.message);
            throw error;
        }
    }

    async getStatistics() {
        try {
            const statusCounts = await this.connection.all(this.schema.GET_LEAVE_TYPE_COUNT);
            
            const total = statusCounts.reduce((sum, item) => sum + item.count, 0);
            
            // FIXED: No optional chaining for Node.js v13
            const foundActiveItem = statusCounts.find(item => item.status === 'Active');
            const activeCount = foundActiveItem ? foundActiveItem.count : 0;
            
            const byStatus = {};
            statusCounts.forEach(item => {
                byStatus[item.status] = item.count;
            });
            
            return {
                total,
                activeCount,
                statusCounts,
                byStatus: byStatus
            };
        } catch (error) {
            console.error('LeaveTypeRepository.getStatistics error:', error.message);
            throw error;
        }
    }

    async search(query) {
        try {
            const searchQuery = `%${query}%`;
            const sql = `
                SELECT * FROM leave_types 
                WHERE leave_name LIKE ? OR description LIKE ? OR color LIKE ?
                ORDER BY leave_name
            `;
            
            const leaveTypes = await this.connection.all(sql, [searchQuery, searchQuery, searchQuery]);
            return leaveTypes;
        } catch (error) {
            console.error('LeaveTypeRepository.search error:', error.message);
            throw error;
        }
    }

    async toggleStatus(id) {
        try {
            const leaveType = await this.findById(id);
            
            if (!leaveType) {
                throw new Error('Leave type not found');
            }
            
            const newStatus = leaveType.status === 'Active' ? 'Inactive' : 'Active';
            await this.connection.execute(
                `UPDATE leave_types SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
                [newStatus, id]
            );
            
            return { ...leaveType, status: newStatus };
        } catch (error) {
            console.error('LeaveTypeRepository.toggleStatus error:', error.message);
            throw error;
        }
    }
}

module.exports = new LeaveTypeRepository();