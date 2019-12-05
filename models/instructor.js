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
    return sequelize.define('instructor', {

        // id: primary ID of instructor, should match any 
        // tracking ID for underlying student info
        // retained at the school
        id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        // implement a data field to store data for testing get/post
        firstName: {
            type: Sequelize.STRING(50),
            allowNull: false,
            autoIncrement: true,
        },
        lastName: {
            type: Sequelize.STRING(50),
            allowNull: false,
            autoIncrement: true,
        },


        // implement a data field to store data for testing get/post
        data: Sequelize.TEXT

    })

}