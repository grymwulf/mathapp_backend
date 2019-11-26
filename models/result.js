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
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // implement a data field to store data for testing get/post
        data: Sequelize.TEXT
    })
}