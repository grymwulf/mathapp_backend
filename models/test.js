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

const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('test', {

        // id: primary ID for the test
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        //category: practice(false, 0) or graded(true, 1)
        category: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        //attempts_remaining: number of attempts left to take test
        attemptsRemaining: {
            type: Sequelize.INTEGER,
            validate: {
                isValid(value) {
                    if (value <= 0 && value != -1) {
                        throw new Error('Attempts must be initially set to -1 or greater than 0')
                    }
                }
            },
            allowNull: false
        },
        //baseNumber: the number used as the base for each test i.e. 1, 2, 3, 4 etc.
        baseNumber: {
            type: Sequelize.INTEGER,
            validate: {
                min: {
                    args: process.env.APP_MIN_OPERAND,
                    msg: `baseNumber is out of application bounds; value must be ` +
                            `greater than or equal to ${process.env.APP_MIN_OPERAND}`
                },
                max: {
                    args: process.env.APP_MAX_OPERAND,
                    msg: `baseNumber is out of application bounds; value must be ` +
                    `less than or equal to ${process.env.APP_MAX_OPERAND}`
                }
            },
            allowNull: false
        },
        //operation: the operation used for each test i.e. +(add), -(subtract), *(multiply), /(divide).
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
        
        //level: difficulty of test i.e. 1+, 2+, 3+, etc.
        level: {
            type: Sequelize.VIRTUAL,
            get() {
                return `${this.baseNumber}${this.operation}`;
            },
            set(value) {
                throw new Error("Do not set level directly");
            }
        }

    }, {
        timestamps: false
    })
}
