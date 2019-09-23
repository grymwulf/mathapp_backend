module.exports = (sequelize, type) => {
    return sequelize.define('student', {

        // id: primary ID of student, should match any 
        // tracking ID for underlying student info
        // retained at the school
        id: {
            type: type.INTEGER,
            primaryKey: true
        },

        // firstName: students first name
        firstName: type.STRING,

        // latName: students last name
        lastName: type.STRING,
    })
}