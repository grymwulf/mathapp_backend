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
    return sequelize.define('experiment', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        data: {
            type: Sequelize.STRING,
            get() {
                return JSON.parse(this.getDataValue('data'));
            },
            set(value) {
                this.setDataValue('data', JSON.stringify(value));
            }
        }
    },{
        timestamps: false
    })
}