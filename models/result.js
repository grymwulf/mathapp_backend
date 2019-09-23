module.exports = (sequelize, type) => {
    return sequelize.define('result', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // instructorID: UD of teacher administering test
        instructorID: type.INTEGER,

        // testID: identifier for specific test stored in test table
        testID: type.INTEGER,

        // testDate: date/time test was submitted
        testDate: type.DATE,

        // numQuestions: needs to match test stored via testID, 
        // might not be needed - but might retain this for easy access
        numQuestions: type.INTEGER,

        // numCorrect: number of correct answers
        // might not be needed if we track the specific test, since
        // we do store the answers - but might retain this for easy access
        numCorrect: type.INTEGER,

        // answers: submitted answers for tracking specific questions
        // that were correct/incorrect - this should be a stringified JSON object
        // storing as a string because some DBMS don't have a JSON datatype
        answers: type.STRING,

        // classID: similar to how ASU does this
        // should match format of FALL2019X{classname}
        // ex: FALL2019XMATH
        classID: type.STRING
    })
}