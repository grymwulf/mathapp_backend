const Sequelize = require('sequelize')

module.exports = (sequelize, type) => {
    return sequelize.define('result', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // instructorID: UD of teacher administering test
        instructorID: Sequelize.INTEGER,

        // testID: identifier for specific test stored in test table
        testID: Sequelize.INTEGER,

        // testDate: date/time test was submitted
        // store as string
        testDate: Sequelize.DATE,

        // numQuestions: needs to match test stored via testID, 
        // might not be needed - but might retain this for easy access
        numQuestions: Sequelize.INTEGER,

        // numCorrect: number of correct answers
        // might not be needed if we track the specific test, since
        // we do store the answers - but might retain this for easy access
        numCorrect: Sequelize.INTEGER,

        // answers: submitted answers for tracking specific questions
        // that were correct/incorrect - this should be a stringified JSON object
        // storing as a string because some DBMS don't have a JSON datatype
        answers: Sequelize.STRING,

        // classID: similar to how ASU does this
        // should match format of FALL2019X{classname}
        // ex: FALL2019XMATH
        classID: Sequelize.STRING
    })
}