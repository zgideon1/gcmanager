PROJECT-NAME: G.C. Manager
PROJECT-AUTHOR: Zach Gideon

PROJECT DESCRIPTION: 
  G.C. Manager, or "Golf Course Manager", is an all-in-one web application for mitigating the stress of managing a golf course. G.C. Manager
  creates role-based dashboards for owners, employees, and customers of a course. Owners can manage all users and manage scheduling for tee-times,
  employees, and tournaments, allowing for an easy overview of course operations. Employees can log-in to view their upcoming schedules with the 
  built-in calendars. All users can post an official course score while viewing their handicap and assigned scorecard, as well as book their own
  tee-times.

  
FUTURE ENHANCEMENTS:
  G.C. Manager will include ways to manage inventory, such as keeping track of all in-stock concessions, course chemicals, and merchandise

  Maintenance scheduling along with notes and description will be implemented

  Account settings will be accessible, such as the ability to change a logged-in user's name or address information
  
  English to Spanish and French translations will be viewable, increasing accessibility.
  

PROJECT BUILT WITH:
  Windows 10 with Node.js v24.11.1
  
  MySql 8.0, edited using MySql Workbench 8.0 and installed with MySql Installer 1.6

  
CURRENT PROJECT INSTRUCTIONS FOR COMPILING
  Ensure you have installed a MySql server, running version 8.0, and as a Windows service (this ensures server is constantly running)
  
  In one command window, navigate to project_location\.\zgideon-gcmanager\server
  Run this command line:
    npm start

  In another command window, navigate to project_location\.\zgideon-gcmanager\client
  Run this command line:
    npm build
