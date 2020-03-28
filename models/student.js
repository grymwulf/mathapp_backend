/*
    Copyright 2019 SER402 Project 14 Team - All Rights Reserved
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
    return sequelize.define('student', {

        // id: primary ID of student, should match any 
        // tracking ID for underlying student info
        // retained at the school
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        //Student's first name
        firstName: {
            type: Sequelize.STRING,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Only letter characters are allowed for firstName'
                }
            },
            allowNull: false,
        },

        //Student's last name
        lastName: {
            type: Sequelize.STRING,
            validate: {
                isAlpha: {
                    args: true,
                    msg: 'Only letter characters are allowed for lastName'
                }
            },
            allowNull: false,        
        },

        //Stars student has earned
        stars: {
            type: Sequelize.INTEGER(50),
            validate: {
                isInt: {
                    args: true,
                    msg: 'Only integers are allowed for number of stars'
                }
            },
            allowNull: true
        },

        //Level of student
        level: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },{
        timestamps: false
    })
}