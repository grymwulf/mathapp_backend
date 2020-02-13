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
    return sequelize.define('answer', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        student_answer: {
            type: Sequelize.INTEGER,
            allowNull: true,
            set(value) {
                if (value === null) {
                    this.setDataValue('student_answer', null)
                } else {
                    this.setDataValue('student_answer', parseInt(value));
                }
            }
        },

        correctly_answered: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        operation: {
            type: Sequelize.ENUM,
            values: ['+', '-', '*', '/'],
            validate: {
                isIn: {
                    args: [['+', '-', '*', '/']],
                    msg: "Must be basic arithmetic operation"
                }
            },
            allowNull: false
        },

        operand1: {
            type: Sequelize.INTEGER,
            validate: {
                min: 0,
                max: 14,
                isInt: true
            },
            allowNull: false,
            set(value) {
                this.setDataValue('operand1', parseInt(value));
            }
        },

        operand2: {
            type: Sequelize.INTEGER,
            validate: {
                min: 0,
                max: 14,
                isInt: true
            },
            allowNull: false,
            set(value) {
                this.setDataValue('operand2', parseInt(value));
            }
        }

    },{
        timestamps: false
    })
}