//FILE: bg.js
/**
 * this is a background service and this code will run *every* time the 
 * application goes into the foreground
 */
//var value = "Hello from Running BG service - bg.js";
//Ti.API.info(value);
 
 
  
// var notification = Ti.App.iOS.scheduleLocalNotification({
	// alertBody:"Your new daily good is ready!",
	// alertAction:"View your actionable good!",
	// date:new Date(new Date().setHour(12)), // 3 seconds after backgrounding
	// //date:new Date(new Date().getTime() + 3000) // 3 seconds after backgrounding
	// repeat: 'daily'
// });
 
// Ti.App.iOS.addEventListener('notification',function(){
	// Ti.API.info('background event received = '+notification);
	// //Ti.App.currentService.unregister();
// });
 
// we need to explicitly stop the service or it will continue to run
// you should only stop it if you aren't listening for notifications in the background
// to conserve system resources. you can stop like this:
//Ti.App.currentService.stop();
 
 
// you can unregister the service by calling 
// Ti.App.currentService.unregister() 
// and this service will be unregistered and never invoked again