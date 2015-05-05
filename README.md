# Pre-requisites:
1. NodeJS
2. Cordova
3. Ionic
4. Gulp
5. Bower
6. Karma

# Installation steps (web):
1. Clone this repository (https://github.com/lostintangent/Ionic.git)
2. cd into the newly created directory
3. Run "npm install" to acquire all app dependencies
4. Run "npm start" to compile and run the app

# Installation steps (Cordova):
1. Perform steps 1-3 in the web setup steps if not done already
2. Run "ionic state restore" to acquire Cordova platforms and plugins
3. Run "ionic hooks add" to add the Ionic build hooks