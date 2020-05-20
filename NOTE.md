# Setup Electron Project

**Step 1:** npm init:

    - give a project name
    - for entry point use enter main.js
    - give an author name
    - all other options, leave as default

**Step 2:** npm install --save electron

**NOTE:** If could not install electron due to SSL certificate, you can do it manually. You can install electron on your own pc, then just copy and paste the whole folder in to **"node_modules"**. Then, in its **"package.json"** file (which is located in electron folder), change the field **"_where"** to where the project is located.


**Step 3:** go to *package.json* and change the following:

    "test": "echo \"Error: no test specified\" && exit 1"   --->    "start": "electron ."

**Step 4:** create main.js file in main root.

**Step 5:** import electron in main.js. Then import *app* and *BrowserWindow*.

**Step 6:** use app.on('ready', function(){...}) to create the main window.

**Step 7:** create the mainWindow HTML 

**Step 8:** Alter main menu. Import *Menu* from electron, then add desired menu list in main.js


**NOTE:** On Mac, electron would be shown as the first menu item instead of file. To treat this, an empty menu object should be added.

**NOTE:** .unshift is a method similar to .push. However, instead of adding to the end of an array, it would add it at the beginning.



# Compile Electron Project
## Options
At present, there are two main options to build an electron project:
- electron-builder
- electron-packager

we use electron-packager:

**Step 1**: install electron-packager globally: npm install electron-packager -g
**Step 2**: add the package to the project: npm install electron-packager --save-dev
**Step 3**: add electron to dev dependencies: npm install electron --save-dev
**Step 4**: add the following block to the scripts key in package.json:

    "package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/vehicle.png --prune=true --out=release-builds",
    "package-win": "electron-packager . data-analytics-dashboard-electron --overwrite --asar=true --platform=win32 --arch=ia32 --icon=<path-to-icon> --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"<project-name>\"",
    "package-linux": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/vehicle.png --prune=true --out=release-builds"

**Step 5**: run the following command in cmd/terminal: electron-packager ./ --platform=win32 --arch=x64 <build-name>


# Build MSI Installer

To build MSI installer we use electron-packager. First, we need to install WiXToolset. 

**Step 1**: Install WiXToolset. Get the installer from the following link: https://github.com/wixtoolset/wix3/releases

**Step 2**: Add WiXToolset to the *Environmental Variables*. You should add the bin path (e.g. C:\Program Files (x86)\WiX Toolset v3.11\bin)

**Step 3**: Verify WiXToolset are available. Run the following in cmd: candle

**Step 4**: go to the project folder and run the following command in cmd/terminal: npm install electron-wix-msi --save-dev

**Step 5**: Create the build_installer.js script (look at this script in this project).

**Step 6**: Run the following: node build_installer.js





# COMMANDS:

### Node.js

    npm config edit: Opens the config file for npm.

### Git

Git commands with SSL_Certificate:
     
     env GIT_SSL_NO_VERIFY=true git <command>

Git commands to pull latest commit:

    1. env GIT_SSL_NO_VERIFY=true git fetch --all
    2. git reset --hard origin/<branch>
