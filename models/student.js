const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('student', {

        // id: primary ID of student, should match any 
        // tracking ID for underlying student info
        // retained at the school
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        // firstName: students first name
        firstName: Sequelize.STRING,

        // lastName: students last name
        lastName: Sequelize.STRING,
    })
}