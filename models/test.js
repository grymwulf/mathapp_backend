module.exports = (sequelize, type) => {
    return sequelize.define('test', {

        // id: primary ID for the test
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // questions in test
        // should be a stringified JSON object
        // many DBMS don't have a JSON dataype
        // JSON object should resemble 
        /*
        {
            "questions": [
                {
                    "questionNum": 1,
                    "varX": 4,
                    "varY": 4,
                    "operand": "+",
                    "answer": 8
                },
                {
                    "questionNum": 2,
                    "varX": 3,
                    "varY": 3,
                    "operand": "-",
                    "answer": 0
                }
            ]
        }
        */
        questions: type.STRING,

        // type of test
        // ADDITION, SUBTRACTION, DIVISION, MULTIPLICATION, MIXED
        type: type.STRING

        

    })
}