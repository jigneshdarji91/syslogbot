# Syslog Bot - Bot Milestone


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
<td> Prathamesh Ghanekar </td>
<td>  pghanek </td>
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

## 3 Use Cases ##
<b>Use Case 1: Add Server to user info database</b><br>

- Preconditions<br>
	User must have slack bot token in system and set to "ALTCODETOKEN"
- Main Flow<br>
	User will write following command to add new server<br>
	@syslogbot manage add-server=<SERVER_NAME> ip=<IP_ADDRESS>
- Subflows<br>
	[S1] Bot will add the server into user info database<br>
	[S2] Bot will post reply
- Alternative Flows<br>
	[E1] Error in adding server

<b>Use Case 2: Delete Server from user info database</b><br>

- Preconditions<br>
	User must have slack bot token in system and set to "ALTCODETOKEN"
- Main Flow<br>
	User will write following command to delete new server<br>
	@syslogbot manage delete-server=<SERVER_NAME>
- Subflows<br>
	[S1] Bot will delete the server from user info database<br>
	[S2] Bot will post reply
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
	[S1] Bot will query the server from log database<br>
	[S2] Bot will list logs depending upon the filter conditions
- Alternative Flows<br>
	[E1] User does not have access to server<br>
	[E2] No logs in the database

## Mocking ##
## Bot Implementation ##
## Selenium testing of each use case ##

| TEST CASE ID                 | TEST CASE                                                                                                       | EXPECTED RESULT                                                      | ACTUAL RESULT                                                        | RESULT |
|------------------------------|-----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|--------|
| SyslogBot.AddServer.Test1    | Add new server to user info database Valid Input:  @syslogbot manage add-server='my_web_server' ip='20.20.43.2' | Server added successfully.                                           | Server added successfully.                                           | PASS   |
| SyslogBot.AddServer.Test2    | Add new server to user info database Invalid Input:  @syslogbot manage add-server='my_web_server'               | Error adding server.                                                 | Error adding server.                                                 | PASS   |
| SyslogBot.DeleteServer.Test1 | Delete server from user info database Valid Input: @syslogbot manage delete-server='my_web_server'              | Server deleted successfully.                                         | Server deleted successfully.                                         | PASS   |
| SyslogBot.DeleteServer.Test2 | Delete server from user info database Invalid Input: @syslogbot manage delete-server='invalid_server_name'      | Error deleting server.                                               | Error deleting server.                                               | PASS   |
| SyslogBot.QueryLogsr.Test1   | Query logs from log database Valid Input: @syslogbot query server_ip="10.10.1.2" loglevel="ERROR"               | List of logs from log database with corresponding server ip address. | List of logs from log database with corresponding server ip address. | PASS   |
| SyslogBot.QueryLogsr.Test2   | Query logs from log database Invalid Input: @syslogbot query server_ip="10.10.1.2" loglevel="ABC"               | Invalid Input.                                                       | Invalid Input.                                                       | PASS   |

## Task Tracking -WORKSHEET.md ##
[Link to WORKSHEET.md]()
## Screencast ##
[SCREENCAST]()
