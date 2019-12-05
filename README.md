Copyright 2019 SER401 Project 14 Team - All Rights Reserved

# Team Members: 
 - RAYMOND ACEVEDO
 - SHAWN WEINER
 - CHRISTOPHER SALAZAR
 - ROBERT PILLITTERI
 - SHELTON LACY 

Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential


# mathapp_backend
 Backend Development for mathapp ASU Capstone Project
 
# Requirements
 - Node v10.15.3
 - NPM v6.4.1
 - MySQL (current - see note on installation below)
 - Apache Ant v1.10.5 (optional for ant build scripts)
 - Java SE 1.8.0_202 (optional for ant build scripts)

# Installation
1. Install MySQL
    1. Note:  MySQL version 8.0 and higher has changed authentication methods.  AWS has mysql_native_password enabled by default. 
    Please ensure when installing MySQL 8.0 or greater that you choose to use the `mysql_native_password` authentication.  If during database installation
    you recieve an error similar to: "Client does not support authentication protocol requested by server" your MySQL installation has the new 
    authentication enabled.  Review several fixes [here](https://medium.com/@crmcmullen/how-to-run-mysql-8-0-with-native-password-authentication-502de5bac661).
2. Download source code or clone the repository.
3. For local development copy .env-sample to .env and update the environment variables located there
4. Edit `database_setup.js` to update the `ADMIN_USER` and `ADMIN_PASSWORD` constants for an account with admin privileges on the MySQL db
5. For AWS Deployment, use the `ant aws` command in the base directory - this will assemble the correct package for uploading to AWS Elastic Beanstalk under `aws/mathapp.zip` - Just upload this zip file. 
    1. Review the `.env_sample` file - I've adjusted the files to use the default RDS_ environment variables supplied by Elastic Beanstalk
6. In root directory type the following commands:
    1. npm install (only once, on initial install)
    2. node database_setup.js (only once, on initial install)
    3. npm start
7. Application will listen on port indicated by the environment variable PORT specified in .env or by default 8000


# Generate API Docs:
 - `apidoc -i /routes -o /doc`
 - Sample Instructors route endpoint documented as an example for the rest of the coders. 
 
