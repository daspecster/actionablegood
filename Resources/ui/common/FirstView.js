function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	Date.prototype.getDOY = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		var result = 0;
			
		result = Math.ceil((this - onejan.getTime()) / 86400000);
		//Ti.API.info("result: " + result.toString());
		return result;
	}
	
	current_day = new Date();

	Ti.include('/insights.js');
	var insights = Ti.App.Properties.getList('insights', static_insights);
	
	function countYourGoods(){
		var yourGoods = 0;
		for ( var i = 0; i < insights.length; i++){
			if(insights[i].hasOwnProperty('did')){
				yourGoods++;
			}
		}
		return yourGoods;
	}
	
	
	yourGoods = Ti.UI.createLabel({
		color: '#777',
		top: '10%',
		right: 5,
		text: countYourGoods().toString(),
		width: '150',
		height: '50',
		textAlign: 'center',
		fontSize: 20
	});
	//self.add(yourGoods);
    
    current_index = current_day.getDOY() % 365;
	
	todaysGood = Ti.UI.createLabel({
		color: '#777',
		top: '10%',
		left: 5,
		text: "",
		width: '150',
		height: '50',
		textAlign: 'center',
		backgroundImage: "today-flag.png"
	});
	
	var iDidItButton = Ti.UI.createButton({
		title: 'I did this!',
		width: '45%',
		height: '20%',
	    //left : (Ti.Platform.displayCaps.platformWidth - (Ti.Platform.displayCaps.platformWidth / 2) ) / 2,
    	left: 10,
    	bottom: 10,
    	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:22},
		color: '#555',
		borderRadius: 5,
		backgroundImage: 'none',
		borderColor: '#DDD',
		borderWidth: 3
	});
	
	if (Ti.Platform.osname == 'android') {
		iDidItButton.font = {fontFamily:'Arial',fontWeight:'bold',fontSize:22};
	} else {
		iDidItButton.font = {fontFamily:'Arial',fontWeight:'bold',fontSize:18};		
	}
	
    var goodCount = Ti.UI.createLabel({
		color:'#777',
		opacity: 1,
		font: {fontSize: 16},
		text: "",
		textAlign: 'center',
		height:'auto',
		width: 'auto', //Math.round(Ti.Platform.displayCaps.platformWidth*0.8)
		top: '70%'
	});
	
	
	var labelFontSize = 28;
	var labelFontFamily = "serif"
	if(Ti.Platform.osname == 'android'){ 
	    labelFontSize = 34;
	    labelFontFamily = "serif";
	} else {
		labelFontSize = 28;
		labelFontFamily = "AmericanTypewriter";

	}
	
	var goodsView = [];
	var goodsLabels = [];
	
	for (var c=0; c < insights.length; c++) {
		goodsView[c] = Ti.UI.createView({
			backgroundColor:'#fff',
			height:200,
			width:'100%'
	    });
	    
	    goodsLabels[c] = Ti.UI.createLabel({
	    	color:'#555',
			opacity: 1,
			font: {fontFamily: labelFontFamily, fontSize: labelFontSize },
			text: insights[c].quote,
			textAlign: 'center'
			//height:'auto',
			//width: '80%', //Math.round(Ti.Platform.displayCaps.platformWidth*0.8)
			//top: '25%'
	    });
	    
	    goodsView[c].add(goodsLabels[c]);
	}
	
	
	var scrollView = Titanium.UI.createScrollableView({
	    views:goodsView,
	    showPagingControl:false,
	    //pagingControlHeight:30,
	    maxZoomScale:2.0,
	    currentPage: current_index,
	    top: '-50px'
	});
	
	self.add(scrollView);
	
	scrollView.addEventListener('scroll', function(index){
		//Ti.API.info("index: " + index.currentPage);
		if ((index.currentPage) == (current_day.getDOY() % insights.length)) {
			self.add(todaysGood);
		} else {
			self.remove(todaysGood); 
		}
		
		count.text = "#" + index.currentPage;
	});
	
	
	// Twitter button!
	var module	= require('de.marcelpociot.social');
	var tweetButton	= Ti.UI.createButton({
		title: 'Tweet good!',
		bottom: 10,
		right: 10,
		width: '45%',
		height: '20%',
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:18},
		color: '#555',
		borderRadius: 5,
		backgroundImage: 'none',
		borderColor: '#DDD',
		borderWidth: 3
	});
	self.add(tweetButton);
	tweetButton.addEventListener('click',function(e){
		module.showSheet({
			service:	'twitter',
			message: 	'@actionablegood today I completed good ' + count.text,
			urls: 		['http://www.dailyactionablegood.com'],
			//images:		['http://www.marcelpociot.de/badges/titan_logo_256.png'],
			success:	function(){
				alert("Tweet successfully sent");
			},
			cancel:		function(){
				alert("User canceled tweet");
			},
			error:		function(){
				alert("Unable to send tweet");
			}
		});
	});
	
	
	
	
	
	
	function sendGood()  {
		 var url = "http://198.61.167.217:8282";
		 var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		     onload : function(e) {
		         //Ti.API.info("Received text: " + this.responseText);
		         //alert('success ' + this.responseText);
		         this.abort();
		     },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
		         Ti.API.debug(e.error);
		         //alert('error ' + e.error );
		     },
		     timeout : 3000  // in milliseconds
		 });

		 // Prepare the connection.
		 client.open("POST", url);
		 
		 // Send the request.
		 client.send("good=1");
	}
	
	
	function getGoods() {
		 var url = "http://198.61.167.217:8282";
		 var client = Ti.Network.createHTTPClient({
		     // function called when the response data is available
		     onload : function(e) {
		         Ti.API.info("Received text: " + this.responseText);
		         
		         goodCount.text = this.responseText + " good things done by people like you!";
		         self.add(goodCount);
		         this.abort();
		     },
		     // function called when an error occurs, including a timeout
		     onerror : function(e) {
		         Ti.API.debug(e.error);
		         //alert('error ' + e.error );
		     },
		     timeout : 3000  // in milliseconds
		 });
		 
		 // Prepare the connection.
		 client.open("GET", url);
		 
		 // Send the request.
		 client.send();
	}
	
	getGoods();
	
	function toggleIDidIt() {
		if (insights[current_index].hasOwnProperty('did')) {
			iDidItButton.fireEvent('click');
		} else {
			iDidItButton.color = '#555';
			iDidItButton.font = {fontFamily:'Arial',fontWeight:'bold',fontSize:22};
			iDidItButton.title = 'I did this!';
		}
		
		if (current_index == (current_day.getDOY() % insights.length)) {
			self.add(todaysGood);
		} else {
			self.remove(todaysGood); 
		}
		

	}
	
	

	iDidItButton.addEventListener('click', function(){
		iDidItButton.color = "#0D0";
		iDidItButton.title = "\u2714";
		iDidItButton.font = {fontSize:50};
		if (!insights[current_index].hasOwnProperty('did')) {
			insights[current_index].did = true;
			sendGood();
		}
		
		Ti.App.Properties.setList('insights', insights);
		
	});
	
	var count = Ti.UI.createLabel({
    	color:'#777',
		opacity: 1,
		font: {fontSize: 16},
		textAlign: 'center',
		height:'auto',
		width: 'auto', //Math.round(Ti.Platform.displayCaps.platformWidth*0.8)
		top: '3%',
		right: '35px',
		text: "#" + current_index.toString()
    });
	
	var edition = Ti.UI.createLabel({
		color:'#777',
		opacity: 1,
		font: {fontSize: 16},
		textAlign: 'center',
		height:'auto',
		width: 'auto', //Math.round(Ti.Platform.displayCaps.platformWidth*0.8)
		top: '3%',
		left: '35px',
		text: "2013 Edition"
	});
	
	self.add(edition);
	self.add(count);
	self.add(todaysGood);
	self.add(iDidItButton);
	
	return self;
}

module.exports = FirstView;
