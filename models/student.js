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
            primaryKey: true
        },

        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        lastName: {
            type: Sequelize.STRING,
            allowNull: false        
        },

        level: {
            type: Sequelize.STRING,
            allowNull: false
        },
    
        // implement a data field to store data for testing get/post
        data: Sequelize.TEXT,
    },{
        timestamps: false
    })
}