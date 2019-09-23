module.exports = (sequelize, type) => {
    return sequelize.define('instructor', {

        // id: primary ID of instructor, should match any 
        // tracking ID for underlying student info
        // retained at the school
        id: {
            type: type.INTEGER,
            primaryKey: true
        },

        // firstName: instructor first name
        firstName: type.STRING,

        // latName: instructor last name
        lastName: type.STRING,
    })
}