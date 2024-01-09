const { sequelize, Employee, Immigration } = require('./models');

(async () => {
    try {
        await sequelize.sync();
        // const anil = await Employee.create({ firstName: 'Anil Kumar', lastName: 'Ummidi', employeeId: 10001 });
        // const anilStatus = await Immigration.create({ employeeId: 10001, visaStatus: 'H1', EmployeeEmployeeId: 10001 });
        // const data = await Employee.findOne({ include: Immigration });
        // const imgdata = await Immigration.findOne({
        //     where: {
        //         employeeId: data.employeeId
        //     }
        // })
        console.log('update: ', await Employee.update({state: 'test'}, {where: {employeeId: 10002}}));
            // console.log(JSON.stringify(imgdata));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
