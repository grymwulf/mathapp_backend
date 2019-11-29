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

class Teachers extends Model {}
Teachers.init({ 
	fistName: Sequelize.STRING(50)
	lastName: Sequelize.STRING(50)
}, {
	sequelize, 
	modelName: ‘teacher’ 
});

Teachers.hasMany(Test);
Teachers.hasMany(Class);
