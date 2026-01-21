// database/repositories/HolidayRepository.js - FIXED for Node.js v13
const connection = require('../connection');
const schemas = require('../schemas');

class HolidayRepository {
    constructor() {
        this.connection = connection;
        this.schema = schemas.holiday;
    }

    async create(holidayData) {
        try {
            const { holiday_name, holiday_date, holiday_type, year, recurring, description, created_by } = holidayData;
            const result = await this.connection.execute(
                this.schema.INSERT_HOLIDAY,
                [
                    holiday_name, 
                    holiday_date, 
                    holiday_type, 
                    year, 
                    recurring || 0, 
                    description, 
                    created_by
                ]
            );
            
            return { id: result.lastID, ...holidayData };
        } catch (error) {
            console.error('HolidayRepository.create error:', error.message);
            throw error;
        }
    }

    async findAll() {
        try {
            const holidays = await this.connection.all(this.schema.GET_ALL_HOLIDAYS);
            return holidays;
        } catch (error) {
            console.error('HolidayRepository.findAll error:', error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            const holiday = await this.connection.get(this.schema.GET_HOLIDAY_BY_ID, [id]);
            return holiday;
        } catch (error) {
            console.error('HolidayRepository.findById error:', error.message);
            throw error;
        }
    }

    async findByYear(year) {
        try {
            const holidays = await this.connection.all(this.schema.GET_HOLIDAYS_BY_YEAR, [year]);
            return holidays;
        } catch (error) {
            console.error('HolidayRepository.findByYear error:', error.message);
            throw error;
        }
    }

    async findByTypeAndYear(holiday_type, year) {
        try {
            const holidays = await this.connection.all(this.schema.GET_HOLIDAYS_BY_TYPE, [holiday_type, year]);
            return holidays;
        } catch (error) {
            console.error('HolidayRepository.findByTypeAndYear error:', error.message);
            throw error;
        }
    }

    async findUpcoming() {
        try {
            const holidays = await this.connection.all(this.schema.GET_UPCOMING_HOLIDAYS);
            return holidays;
        } catch (error) {
            console.error('HolidayRepository.findUpcoming error:', error.message);
            throw error;
        }
    }

    async findByMonth(yearMonth) {
        try {
            const holidays = await this.connection.all(this.schema.GET_HOLIDAYS_BY_MONTH, [yearMonth]);
            return holidays;
        } catch (error) {
            console.error('HolidayRepository.findByMonth error:', error.message);
            throw error;
        }
    }

    async update(id, holidayData) {
        try {
            const { holiday_name, holiday_date, holiday_type, year, recurring, description } = holidayData;
            const result = await this.connection.execute(
                this.schema.UPDATE_HOLIDAY,
                [
                    holiday_name, 
                    holiday_date, 
                    holiday_type, 
                    year, 
                    recurring || 0, 
                    description, 
                    id
                ]
            );
            
            return result.changes > 0 ? await this.findById(id) : null;
        } catch (error) {
            console.error('HolidayRepository.update error:', error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.connection.execute(this.schema.DELETE_HOLIDAY, [id]);
            return result.changes > 0;
        } catch (error) {
            console.error('HolidayRepository.delete error:', error.message);
            throw error;
        }
    }

    async getStatistics() {
        try {
            const yearCounts = await this.connection.all(this.schema.GET_HOLIDAY_COUNT_BY_YEAR);
            
            const total = yearCounts.reduce((sum, item) => sum + item.count, 0);
            const currentYear = new Date().getFullYear();
            
            // FIXED: No optional chaining for Node.js v13
            const foundYearItem = yearCounts.find(item => item.year === currentYear);
            const currentYearCount = foundYearItem ? foundYearItem.count : 0;
            
            const byYear = {};
            yearCounts.forEach(item => {
                byYear[item.year] = item.count;
            });
            
            return {
                total,
                currentYearCount,
                yearCounts,
                byYear: byYear
            };
        } catch (error) {
            console.error('HolidayRepository.getStatistics error:', error.message);
            throw error;
        }
    }

    async search(query) {
        try {
            const searchQuery = `%${query}%`;
            const sql = `
                SELECT h.*, u.first_name, u.last_name 
                FROM holidays h 
                LEFT JOIN users u ON h.created_by = u.id 
                WHERE h.holiday_name LIKE ? OR h.description LIKE ? OR h.holiday_type LIKE ?
                ORDER BY h.holiday_date
            `;
            
            const holidays = await this.connection.all(sql, [searchQuery, searchQuery, searchQuery]);
            return holidays;
        } catch (error) {
            console.error('HolidayRepository.search error:', error.message);
            throw error;
        }
    }
}

module.exports = new HolidayRepository();