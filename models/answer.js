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

        studentAnswer: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                min: -1 * Math.pow(process.env.APP_MAX_OPERAND, 2),
                max: Math.pow(process.env.APP_MAX_OPERAND, 2)
            },
            set(value) {
                if (value === null) {
                    this.setDataValue('studentAnswer', null)
                } else {
                    this.setDataValue('studentAnswer', parseInt(value));
                }
            }
        },

        correctlyAnswered: {
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
                min: process.env.APP_MIN_OPERAND,
                max: process.env.APP_MAX_OPERAND,
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
                min: process.env.APP_MIN_OPERAND,
                max: process.env.APP_MAX_OPERAND,
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