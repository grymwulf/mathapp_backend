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
    return sequelize.define('result', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        timeTaken: {
            type: Sequelize.TIME,
            defaultValue: process.env.APP_MAX_ATTEMPT_TIME,
            validate: {
                is: /^\d{2}:\d{2}:\d{2}$/,
                isUnderMax(value) {
                    var times = value.split(":");
                    var maxTimes = process.env.APP_MAX_ATTEMPT_TIME.split(":");

                    var timesSeconds = new Date();
                    var maxTimesSeconds = new Date();

                    timesSeconds.setHours(times[0], times[1], times[2]);
                    maxTimesSeconds.setHours(maxTimes[0], maxTimes[1], maxTimes[2]);

                    if (timesSeconds.getTime() > maxTimesSeconds.getTime()) {
                        throw new Error('Time exceeds allotted');
                    }
                }
            }
        }

    },{
        timestamps: false
    })
}