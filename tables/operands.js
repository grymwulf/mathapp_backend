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

class OPERAND extends Model {}
OPERAND.init({ 
	value: Sequelize. INTEGER
}, {
	sequelize, 
	modelName: ‘operand’ 
});

OPERAND.hasMany(Question);
OPERAND.hasMany(Level);
