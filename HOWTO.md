# Steps involved in setup of the branch
- First we need to install mysql

  All the dummy data is being stored in the mysql DB for this submission.

- Second we need to create two DBs namely "slackBotLog_db" and "slackBotUser_db" 

  The db "slackBotUser_db" are used to store the User-Server info mapping and db "slackBotLog_db" is used to store the Log information for each server.

- Finally import the dump files from the "Bot/data" folder
  There are two dump files in the data folder. Execute following commands to import the dump files :  
