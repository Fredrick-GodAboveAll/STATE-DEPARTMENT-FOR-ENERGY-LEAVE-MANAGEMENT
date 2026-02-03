const connection = require('./database/connection');

async function debug() {
  try {
    await connection.connect();
    
    const employees = await connection.all('SELECT id, full_name, disability FROM employees');
    console.log('Employees from database:');
    console.log('========================');
    employees.forEach(emp => {
      console.log(`ID: ${emp.id}, Name: ${emp.full_name}, Disability: ${emp.disability}, Type: ${typeof emp.disability}`);
    });
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await connection.close();
    process.exit(0);
  }
}

debug();
