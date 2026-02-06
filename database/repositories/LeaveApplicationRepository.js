// database/repositories/LeaveApplicationRepository.js
const connection = require('../connection');
const schemas = require('../schemas');

class LeaveApplicationRepository {
    constructor() {
        this.connection = connection;
        this.schema = schemas.leave_application;
    }

    async create(leaveApplicationData) {
        try {
            const {
                ref_no, employee_id, leave_type_id, start_date, end_date, back_on,
                duration_days, applied_on, letter_date, status, reason
            } = leaveApplicationData;

            const result = await this.connection.execute(
                this.schema.INSERT_LEAVE_APPLICATION,
                [
                    ref_no, employee_id, leave_type_id, start_date, end_date, back_on,
                    duration_days, applied_on, letter_date || null, status || 'Pending', reason || null
                ]
            );

            return { id: result.lastID, ...leaveApplicationData };
        } catch (error) {
            console.error('LeaveApplicationRepository.create error:', error.message);
            // Do not auto-modify or auto-increment ref_no here; propagate the error
            throw error;
        }
    }

    async findAll() {
        try {
            const leaveApplications = await this.connection.all(this.schema.GET_ALL_LEAVE_APPLICATIONS);
            return leaveApplications;
        } catch (error) {
            console.error('LeaveApplicationRepository.findAll error:', error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            const leaveApplication = await this.connection.get(this.schema.GET_LEAVE_APPLICATION_BY_ID, [id]);
            return leaveApplication;
        } catch (error) {
            console.error('LeaveApplicationRepository.findById error:', error.message);
            throw error;
        }
    }

    async findByEmployee(employeeId) {
        try {
            const leaveApplications = await this.connection.all(this.schema.GET_LEAVE_APPLICATIONS_BY_EMPLOYEE, [employeeId]);
            return leaveApplications;
        } catch (error) {
            console.error('LeaveApplicationRepository.findByEmployee error:', error.message);
            throw error;
        }
    }

    async updateStatus(id, status) {
        try {
            await this.connection.execute(this.schema.UPDATE_LEAVE_APPLICATION_STATUS, [status, id]);
            return true;
        } catch (error) {
            console.error('LeaveApplicationRepository.updateStatus error:', error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.connection.execute(this.schema.DELETE_LEAVE_APPLICATION, [id]);
            return true;
        } catch (error) {
            console.error('LeaveApplicationRepository.delete error:', error.message);
            throw error;
        }
    }

    async count() {
        try {
            const result = await this.connection.get(this.schema.GET_LEAVE_APPLICATIONS_COUNT);
            return result.count;
        } catch (error) {
            console.error('LeaveApplicationRepository.count error:', error.message);
            throw error;
        }
    }

    async countByStatus(status) {
        try {
            const result = await this.connection.get(this.schema.GET_LEAVE_APPLICATIONS_BY_STATUS, [status]);
            return result.count;
        } catch (error) {
            console.error('LeaveApplicationRepository.countByStatus error:', error.message);
            throw error;
        }
    }
}

module.exports = new LeaveApplicationRepository();