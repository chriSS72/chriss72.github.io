
var map;
var markers = [];

var getBusLocations = function(){
	var url = 'http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=mbta&r=1&t=0';

	// make xhr request
	var xhReq = new XMLHttpRequest();
	xhReq.open('GET', url, false);
	xhReq.send(null);
	var serverResponse = xhReq.responseText;

	// create object from response
	var locations = JSON.parse(serverResponse);
	return locations;
};

var init = function(){
	var latlng = new google.maps.LatLng(42.353350, -71.091525);
	var myOptions = {
		zoom : 14,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
  	map = new google.maps.Map(document.getElementById('map'), myOptions);
};

// Adds markers to the map and into array
var addMarkers = function(bus){

	var marker = getMarker(bus.id);		
	if (marker){
		moveMarker(marker,bus);
	}
	else{
		addMarker(bus);			
	}

};

var addMarker = function(bus){
	var marker = new google.maps.Marker({
	  	position: new google.maps.LatLng(bus.lat,bus.lon),
	    icon: { 
	        path:google.maps.SymbolPath.CIRCLE,
	        fillColor: 'rgba(' +  Math.floor(Math.random()*255) + ', ' +
							Math.floor(Math.random()*255) + ', ' +
							Math.floor(Math.random()*255) + ',  1)',
	        fillOpacity: 1,
	        scale:7,
	        strokeWeight:1
	    },
		map: map,
		title: bus.id
	});
	markers.push(marker);
};


var moveMarker = function(marker,bus) {
    var newLatlng = new google.maps.LatLng(bus.lat,bus.lon);
    marker.setPosition( newLatlng );
};

var getMarker = function (id){
	var marker = markers.find(function(item){
		return item.title === id;
	});
	return marker;
};


// create map instance
init();	


