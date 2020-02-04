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

	//level: difficulty of test i.e. 1+, 2+, 3+, etc.
	level: {
		type: Sequelize.STRING(50),
		allowNull: false
	},
	
	//attempts_remaining: number of attempts left to take test
	attempts_remaining: {
		type: Sequelize.INTEGER,
	},

        // implement a data field to store data for testing get/post
        data: Sequelize.TEXT
    },{
        timestamps: false
    })
}