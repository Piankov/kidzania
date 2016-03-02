********************************
*To run these tests on windows:*
********************************
1) Install google chrome

2) Install selenium webdriver
http://docs.seleniumhq.org/download/

3) Run webdriver in separate window:
java -jar C:\YOURPATH\selenium-server-standalone-2.52.0.jar

4) Start tests
npm test

***********************
*Known issues in tests*
***********************
1) Complicated selectors works wrong: I.e. '.calendar-item.holyday.high:nth-Child(5)' finds 5th calendar item and then checks if it is a holyday

**************************
*What is not covered yet:*
**************************
1) Clicking on month names and movings calendar
2) Checking summ of order

**************
*Futher plans*
**************
1) Setup regular runs on Travis CI