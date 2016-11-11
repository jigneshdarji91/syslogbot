# Syslog Bot - Service Milestone


## Team

<table>
<tr>
<td> Aparna Patil </td>
<td> akpatil </td>
</tr>
<tr>
<td> Jignesh Darji </td>
<td> jndarji </td>
</tr>
<tr>
<td> Saurabh Sakpal </td>
<td> ssakpal </td>
</tr>
<tr>
<td> Sushant Tongaonkar </td>
<td>  stongao </td>
</tr>
</table>

## Use Cases
<b>Use Case 1: Add Server to user info database</b><br>

- Preconditions<br>
	User must have slack bot token in system and set to "ALTCODETOKEN"
- Main Flow<br>
	User will write following command to add new server<br>
	@syslogbot manage add-server=<SERVER_NAME> ip=<IP_ADDRESS>
- Subflows<br>
	[S1] Bot will parse the message to find message type. If it's a command message, it will create the query to insert or delete a server [S2]. <br>
	[S2] Bot will create and run a query to add the provided server to the DB <br>
- Alternative Flows<br>
	[E1] Error in adding server

<b>Use Case 2: Delete Server from user info database</b><br>

- Preconditions<br>
	User must have slack bot token in system and set to "ALTCODETOKEN"
- Main Flow<br>
	User will write following command to delete new server<br>
	@syslogbot manage delete-server=<SERVER_NAME>
- Subflows<br>
	[S1] Bot will parse the message to find message type. Since it's a command message, it will create the query to insert or delete a server [S2] <br>
	[S2] Bot will create and run a query to delete the provided server to the DB <br>
- Alternative Flows<br>
	[E1] Error in deleting server

<b>Use Case 3: Query log database for</b><br>

- Preconditions<br>
	User must have slack bot token in system and set to "ALTCODETOKEN"<br>
	User must have access to server availabl in user info database
- Main Flow<br>
	User will write following command to query logs<br>
	@syslogbot query server_ip=<IP_ADDRESS> loglevel=<LOG_LEVEL>
- Subflows<br>
	[S1] Bot will parse the message to find message type. Since it's a command message, it will create the query to insert or delete a server [S3] <br>
	[S3] Bot will create a DB query to pull logs from the servers specified <br>
- Alternative Flows<br>
	[E1] User does not have access to server<br>
	[E2] No logs in the database

## Service Implementation
We have implemented service to gather logs from servers and present to user via bot created in previous milestone. Following is the architecture diagram of service.
![architecture](architecture.jpg)
####Service performs following functions.
- Gathers data from different nodes and places it on messaging queue.
- Fetches data from messaging queue and inserts it into database
- The data from database is fetched by bot as requested by user.


What does service do?
- Service can read data from syslog of server and enqueue it on kafka messaging queue, running on an independent node.
- Service can insert syslog read from different nodes in database.
- Service can add server to userinfo database to store it with alias.



## Screencast ##
### Use Case 1: Adding a server
![Screencast 1](cast_usecase_1.gif)
### Use Case 2: Deleting a server
![Screencast 2](cast_usecase_2.gif)
### Use Case 3: Running query
![Screencast 3](cast_usecase_3.gif)

