const {
    app,
    clipboard,
    dialog,
    BrowserWindow,
    Menu,
    MenuItem,
    ipcMain,
    session,
    net,
    nativeTheme,
    shell
} = require('electron')

const DiscordRPC = require('discord-rpc');

let rpc

const {
    autoUpdater
} = require('electron-updater');
let updateAv = false;

const path = require('path');


let pluginName
switch (process.platform) {
case 'win32':
    switch (process.arch) {
    case 'ia32':
        pluginName = 'flash/pepflashplayer32_32_0_0_303.dll'
        break
    case 'x32':
        pluginName = 'flash/pepflashplayer32_32_0_0_303.dll'
        break
    case 'x64':
        pluginName = 'flash/pepflashplayer64_32_0_0_303.dll'
        break
    }
    break
case 'darwin':
    pluginName = 'flash/PepperFlashPlayer.plugin'
    break
case 'linux':
    pluginName = 'flash/libpepflashplayer.so'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));

var win
var pro
app.on('ready', () => {
    createWindow();
})

//window creation function
function createWindow() {

    win = new BrowserWindow
    ({
    title: "HSTesting",
    webPreferences: {
        plugins: true,
        nodeIntegration: true,
    },
    width: 1385,
        height: 840,
    });

    
    makeMenu();
    checkAppForUpdate();
	
    win.loadFile('./web/index.html');

    autoUpdater.checkForUpdatesAndNotify();
    Menu.setApplicationMenu(fsmenu);
	

    

    win.on('closed', () => {
    	win = null;
    });
}
// Check Updates
function checkAppForUpdate()
{
    
}
//prompt
function createPrompt() {
    //Check if window is already open
    if (pro) { 
       pro.focus();
       return;
    }
	
    pro = new BrowserWindow
    ({
	    title: "HSTesting",
	    webPreferences: {
		plugins: true,
		nodeIntegration: true
	    },
	    width: 409,
	    height: 153
    });
    makeMenu();
	
    pro.loadFile('turnIDtoURL.html');
	
    pro.on('closed', () => {
    	pro = null;
    });
}

// start of menubar part

const aboutMessage = `HSTesting v${app.getVersion()}
Created by HSMath.xyz, using code from Electron`;



function makeMenu(val) { // credits to random
        fsmenu = new Menu();
        if (process.platform == 'darwin') {
            fsmenu.append(new MenuItem(
            
                {
                label: 'HSMath',
                submenu: [
                    
                {
                    label: 'About',
                    click: () => {
                        dialog.showMessageBox({
                            type: "info",
                            buttons: ["Ok"],
                            title: "About HSMath",
                            message: aboutMessage
                        });
                    }
                },
                {
                    label: 'Quit',
                    accelerator: 'Cmd+Q',
                    click: () => {
                        app.quit()
                    }
                }
                ],
                
                }
            
            ));
            fsmenu.append(new MenuItem(
            
                {
                label: "Edit",
                    submenu: [
                    
                {
                    label: 'Refresh',
                            submenu: [
                                {
                                    label: 'Page Refresh',
                                    accelerator: 'CmdOrCtrl+R',
                                    click: () => {
                                        win.reload();
                                    },
                                },
                                {
                                    label: 'Strict Page Refresh',
                                    accelerator: 'Shift+CmdOrCtrl+R',
                                    click: () => {
                                        clearCache();
                                        win.reload();
                                    },
                                },
                                {
                                    type: 'separator'
                                },
                                {
                                    label: 'Application Reload',
                                    accelerator: 'Alt+CmdOrCtrl+R',
                                    click: () => {
                                        app.relaunch();
                                        app.exit(0);


                                    },
                                },
                            ],
                },
                    
                {
                    label: 'Copy',
                    accelerator: 'CmdOrCtrl+C',
                    click: () => {
                        
                        
                    }
                },
                    
                {
                    label: 'Cut',
                    accelerator: 'CmdOrCtrl+X',
                    click: () => {
                        
                    }
                },
                    
                {
                    label: 'Paste',
                    accelerator: 'CmdOrCtrl+V',
                    click: () => {
                        
                    }
                },
                ],
                
                }
            
            ));
            fsmenu.append(new MenuItem(
            
                {
                    label: "View",
                    submenu: [
                    
                        {
                            label: 'Fullscreen',
                            accelerator: 'CmdOrCtrl+F',
                            click: () => {
                        
                                win.setFullScreen(!win.isFullScreen());
                                win.webContents.send('fullscreen', win.isFullScreen());
                            }
                        },
                    
                        {
                            label: 'Zoom In',
                            accelerator: 'CmdOrCtrl+Plus',
                            click: () => {
                        
                                win.webContents.zoomFactor += 0.2
                            },
                        },
                    
                        {
                            label: 'Zoom Out',
                            accelerator: 'CmdOrCtrl+-',
                            click: () => {
                        
                                win.webContents.zoomFactor -= 0.2
                            },
                        },
                        {
                            label: 'Zoom',
                            submenu: [
                                {
                                    label: '0% Zoom',
                                    click: () => {
                                        win.webContents.zoomFactor = 0.01;
                                    },
                                },
                                {
                                    label: '50% Zoom',
                                    click: () => {
                                        win.webContents.zoomFactor = 0.4;
                                    },
                                },
                                {
                                    label: '20% Zoom',
                                    click: () => {
                                        win.webContents.zoomFactor = 0.8;
                                    },
                                },
                                {
                                    label: '100% Zoom',
                                    accelerator: 'CmdOrCtrl+0',
                                    click: () => {
                                        win.webContents.zoomFactor = 1;
                                    },
                                },
                                {
                                    label: '120% Zoom',
                                    click: () => {
                                        win.webContents.zoomFactor = 1.2;
                                    },
                                },
                                {
                                    label: '150% Zoom',
                                    click: () => {
                                        win.webContents.zoomFactor = 1.6;
                                    },
                                },
                                {
                                    label: '200% Zoom',
                                    click: () => {
                                        win.webContents.zoomFactor = 2;
                                    },
                                },
                            ],
                        },
                            ],
                
                }
            
                
            
            ));
           


        } else {
        }
}

function clearCache() {
    windows = BrowserWindow.getAllWindows()[0];
    const ses = win.webContents.session;
    ses.clearCache(() => {});
}

ipcMain.on('cpps_code', (event, cppsCode) => {
    win.loadURL("https://play.cppscreator.xyz/embed/" + cppsCode);
    pro.close();
    pro = null;
    const startTimestamp = new Date();
});

// end of menubar

//Auto update part

autoUpdater.on('update-available', (updateInfo) => {
	switch (process.platform) {
	case 'win32':
	    dialog.showMessageBox({
		  type: "info",
		  buttons: ["Ok"],
		  title: "Update Available",
		  message: "There is a new version available (v" + updateInfo.version + "). It will be installed when the app closes."
	    });
	    break
	case 'darwin':
	    dialog.showMessageBox({
		  type: "info",
		  buttons: ["Ok"],
		  title: "Update Available",
		  message: "There is a new version available (v" + updateInfo.version + "). Please go install it manually from the website."
	    });
	    break
	case 'linux':
	    dialog.showMessageBox({
		  type: "info",
		  buttons: ["Ok"],
		  title: "Update Available",
		  message: "There is a new version available (v" + updateInfo.version + "). Auto-update has not been tested on this OS, so if after relaunching app this appears again, please go install it manually."
	    });
	    break
	}
    //win.webContents.send('update_available', updateInfo.version);
});

autoUpdater.on('update-downloaded', () => {
    updateAv = true;
});

/*
ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', {
        version: app.getVersion()
    });
});
ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});
// end of Auto update part*/

app.on('window-all-closed', () => {
	if (updateAv) {
		autoUpdater.quitAndInstall();
	}
	else
	{
		if (process.platform !== 'darwin') {
			app.quit();
		}
	}
});

app.on('activate', () => {
  if (win === null) {
	  createWindow();
	  const startTimestamp = new Date();
  }
});
