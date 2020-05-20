// ./build-installer.js

// 1. Import Modules
const { MSICreator } = require ('electron-wix-msi');
const path =require('path');


// Note: Insert Absolute path
const APP_DIR = path.resolve (__dirname, './DataAnalyticsApp-win32-x64');
const OUT_DIR = path.resolve (__dirname, './windows_installer');

const msiCreator = new MSICreator ({
    appDirectory: APP_DIR,
    outputDirectory : OUT_DIR,

    // Configure metadata
    description : "This is a fun app for data analytics",
    exe: 'DataAnalyticsAPP',
    name: 'Data App',
    manufacturer: 'Alborz',
    version: '1.0.0',

    // Configure installer User Interface
    ui:{
        chooseDirectory:true
    }
});

msiCreator.create().then(function(){

    //step5: Compile the template to .msi file
    msiCreator.compile();
})