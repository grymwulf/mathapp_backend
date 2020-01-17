/*
    Copyright 2019 SER401 Project 14 Team - All Rights Reserved

    Team Members: 
    RAYMOND ACEVEDO
    SHAWN WEINER
    CHRISTOPHER SALAZAR
    ROBERT PILLITTERI
    SHELTON LACY 

    Unauthorized copying of this file, via any medium is strictly prohibited
    Proprietary and confidential
*/

const Sequelize = require('sequelize')

module.exports = (sequelize, type) => {
    return sequelize.define('result', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        student_answer: {
            type: Sequelize.INTEGER,
            require: true
        },

        correct_answer: {
            type: Sequelize.INTEGER,
            require: true
        },

        operation: {
            type: Sequelize.STRING,
            require: true
        },

        operand1: {
            type: Sequelize.INTEGER,
            require: true
        },

        operand2: {
            type: Sequelize.INTEGER,
            require: true
        }

    },{
        timestamps: false
    })
}