/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}

// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;

	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		// Android uses platform-specific properties to create windows.
		// All other platforms follow a similar UI pattern.
		if (osname === 'android') {
			Window = require('ui/handheld/android/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/ApplicationWindow');
		}
	}
	
	new Window().open();
		
})();



function isiOS4Plus()
{
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);
		
		// can only test this support on a 3.2+ device
		if (major >= 4)
		{
			return true;
		}
	}
	return false;
}

if (isiOS4Plus())
{
	
var notification = Ti.App.iOS.scheduleLocalNotification({
	alertBody:"Your new daily good is ready!",
	alertAction:"View your actionable good!",
	date:new Date(new Date().setHours(12)), // 3 seconds after backgrounding
	//date:new Date(new Date().getTime() + 3000) // 3 seconds after backgrounding
	repeat: 'daily'
});
	
	// register a background service. this JS will run when the app is backgrounded but screen is OFF!!!
	//var service = Ti.App.iOS.registerBackgroundService({url:'bg.js'});
 
	// Ti.API.info("registered background service = "+service);
//  
	// // listen for a local notification event
	// Ti.App.iOS.addEventListener('notification',function(e)
	// {
		// Ti.API.info("local notification received: "+JSON.stringify(e));
	// });
//  
	// // fired when an app resumes for suspension
	// Ti.App.addEventListener('resume',function(e){
		// Ti.API.info("app is resuming from the background");
	// });
	// Ti.App.addEventListener('resumed',function(e){
		// Ti.API.info("app has resumed from the background");
	// });
//  
	// //This event determines that the app it was just paused
	// Ti.App.addEventListener('pause',function(e){
		// Ti.API.info("app was paused from the foreground");
	// });
}
