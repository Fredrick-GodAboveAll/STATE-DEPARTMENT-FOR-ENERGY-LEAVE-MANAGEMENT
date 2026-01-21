// database/repositories/DepartmentRepository.js
const connection = require('../connection');
const schemas = require('../schemas');

class DepartmentRepository {
    constructor() {
        this.connection = connection;
        this.schema = schemas.department;
    }

    async create(departmentData) {
        try {
            const { name, code, description, status } = departmentData;
            const result = await this.connection.execute(
                this.schema.INSERT_DEPARTMENT,
                [
                    name, 
                    code, 
                    description, 
                    status || 'Active'
                ]
            );
            
            return { id: result.lastID, ...departmentData };
        } catch (error) {
            console.error('DepartmentRepository.create error:', error.message);
            throw error;
        }
    }

    async findAll() {
        try {
            const departments = await this.connection.all(this.schema.GET_ALL_DEPARTMENTS);
            return departments;
        } catch (error) {
            console.error('DepartmentRepository.findAll error:', error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            const department = await this.connection.get(this.schema.GET_DEPARTMENT_BY_ID, [id]);
            return department;
        } catch (error) {
            console.error('DepartmentRepository.findById error:', error.message);
            throw error;
        }
    }

    async findByCode(code) {
        try {
            const department = await this.connection.get(this.schema.GET_DEPARTMENT_BY_CODE, [code]);
            return department;
        } catch (error) {
            console.error('DepartmentRepository.findByCode error:', error.message);
            throw error;
        }
    }

    async findByStatus(status) {
        try {
            const departments = await this.connection.all(this.schema.GET_DEPARTMENTS_BY_STATUS, [status]);
            return departments;
        } catch (error) {
            console.error('DepartmentRepository.findByStatus error:', error.message);
            throw error;
        }
    }

    async findActive() {
        try {
            const departments = await this.connection.all(this.schema.GET_ACTIVE_DEPARTMENTS);
            return departments;
        } catch (error) {
            console.error('DepartmentRepository.findActive error:', error.message);
            throw error;
        }
    }

    async update(id, departmentData) {
        try {
            const { name, code, description, status } = departmentData;
            const result = await this.connection.execute(
                this.schema.UPDATE_DEPARTMENT,
                [
                    name, 
                    code, 
                    description, 
                    status || 'Active', 
                    id
                ]
            );
            
            return result.changes > 0 ? await this.findById(id) : null;
        } catch (error) {
            console.error('DepartmentRepository.update error:', error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.connection.execute(this.schema.DELETE_DEPARTMENT, [id]);
            return result.changes > 0;
        } catch (error) {
            console.error('DepartmentRepository.delete error:', error.message);
            throw error;
        }
    }

    async getStatistics() {
        try {
            const stats = await this.connection.get(this.schema.GET_DEPARTMENT_STATS);
            
            const statusCounts = await this.connection.all(this.schema.GET_DEPARTMENT_COUNT);
            
            const byStatus = {};
            statusCounts.forEach(item => {
                byStatus[item.status] = item.count;
            });
            
            return {
                total: stats.total_departments,
                activeCount: stats.active_departments,
                inactiveCount: stats.inactive_departments,
                archivedCount: stats.archived_departments,
                statusCounts,
                byStatus: byStatus
            };
        } catch (error) {
            console.error('DepartmentRepository.getStatistics error:', error.message);
            throw error;
        }
    }

    async search(query) {
        try {
            const searchQuery = `%${query}%`;
            const departments = await this.connection.all(
                this.schema.SEARCH_DEPARTMENTS,
                [searchQuery, searchQuery, searchQuery]
            );
            return departments;
        } catch (error) {
            console.error('DepartmentRepository.search error:', error.message);
            throw error;
        }
    }

    async toggleStatus(id) {
        try {
            const department = await this.findById(id);
            
            if (!department) {
                throw new Error('Department not found');
            }
            
            let newStatus;
            if (department.status === 'Active') {
                newStatus = 'Inactive';
            } else if (department.status === 'Inactive') {
                newStatus = 'Archived';
            } else {
                newStatus = 'Active';
            }
            
            await this.connection.execute(
                `UPDATE departments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
                [newStatus, id]
            );
            
            return { ...department, status: newStatus };
        } catch (error) {
            console.error('DepartmentRepository.toggleStatus error:', error.message);
            throw error;
        }
    }

    async checkCodeExists(code, excludeId = null) {
        try {
            let sql = 'SELECT COUNT(*) as count FROM departments WHERE code = ?';
            const params = [code];
            
            if (excludeId) {
                sql += ' AND id != ?';
                params.push(excludeId);
            }
            
            const result = await this.connection.get(sql, params);
            return result.count > 0;
        } catch (error) {
            console.error('DepartmentRepository.checkCodeExists error:', error.message);
            throw error;
        }
    }

    async checkNameExists(name, excludeId = null) {
        try {
            let sql = 'SELECT COUNT(*) as count FROM departments WHERE name = ?';
            const params = [name];
            
            if (excludeId) {
                sql += ' AND id != ?';
                params.push(excludeId);
            }
            
            const result = await this.connection.get(sql, params);
            return result.count > 0;
        } catch (error) {
            console.error('DepartmentRepository.checkNameExists error:', error.message);
            throw error;
        }
    }
}

module.exports = new DepartmentRepository();