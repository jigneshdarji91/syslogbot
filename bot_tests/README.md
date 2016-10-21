##Test Cases for sherlock bot

This directory contains unit tests for sherlock bot. This directory can be imported as a project in eclipse. The code for tests is located in 
Bot/bot_tests/src/test/java/com/sherlockbot/selenium/bot_tests/WhenSearchingForDrupalUsingGoogleTest.java

###Test Case 1
####Input : manage add-serve='10.0.0.12' alias='my_db_server'
####Expected output: 'server added!!'

###Test Case 2
####Input : manage random invalid input
####Expected output: 'Invalid command'

###Test Case 3
####Input : query server=dns log_level=Error count=10

###Test Case 4

###Test Case 5
####Input: monitor server=firewall log_level=Warning

###Test Case 6
####Input:

###Test Case 7
####Input: summary summary_type=time server=dns,firewall log_level=Error, Warning

