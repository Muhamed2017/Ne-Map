//defining some initial places 
var somePlaces = [
    {
        title: 'Kushari',
        latlng: {
            lat: 30.070268,
            lng: 31.233471
        }
    },
    {
        title: 'Al-Azhar University',
        latlng: {
            lat: 30.054421,
            lng: 31.314138
        }
    },
    {
        title: 'Al-Azhar Park',
        latlng: {
            lat: 30.040969,
            lng: 31.265254
        }
    },
    {
        title: 'Egyptian Museum',
        latlng: {
            lat:30.048466,
            lng:31.249724
        }
        
        
    },
    {
        title: 'Al-Sayeda Zainab Mosque',
        latlng: {
            lat: 30.031724,
            lng: 31.242076
        }
    },
    {
        title: 'Giza Zoo' ,
        latlng: {
            lat: 30.022657,
            lng: 31.213661
        }
    },
    {
        title: 'Cairo International Stadium',
        latlng: {
            lat :30.069108,
            lng: 31.311802
        }
    }
];
 
var map;
var infoWindow;
var markers = [];
var cenralize = {
            lat: 30.034491,
            lng: 31.239289
        }
var scale= 12;
//  Model decleration
var Place = function (info) {
    var self = this;
    self.title = info.title;
    self.latlng = info.latlng;
    self.information;
    self.marker = new google.maps.Marker({
        position: info.latlng,
        map: map,
        title: info.title,
        animation: google.maps.Animation.DROP
    });
    markers.push(self.marker);

    // starting the wikibidia Api
     var WikiOutTime = setTimeout(function () {
            self.information = "No information for this location";},9000);
   

    $.ajax({
        cache: false,
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + info.title + "&format=json&callback=wikiCallback",
        success: function (output) {
            var place_title =  output[0];
            var place_link  =  output[3][0];
            self.information = '<a href="' + place_link + '">' + place_title + '</a>'
            clearTimeout(WikiOutTime);
        },
        dataType: 'jsonp'


    });
    
       //Wiki Ended
    
    //Tracking user clicking on the predfined places
    self.marker.addListener('click', function () {
         //placing the info in the window    
        infoWindow.setContent('<li><b>Title: </b>' + info.title +'</li><br><br>'+'<li><b>Wikibidia: </b>' + self.information+'</li>');
        infoWindow.open(map, self.marker);
        //animate when clicking
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            self.marker.setAnimation("");}, 700);
    });
         //closing the window
        infoWindow.addListener('closeclick', function() {
        infoWindow.marker = "";
    });
        
    self.isAvailable = ko.observable(true);
    self.viewMaker = ko.computed(function () {
        if (true) {
            self.marker.setMap(map);
        } else {
            self.marker.setMap("");
        }
        return self.isAvailable;
    }, self);
    
    
        self.isClick = function () {
        google.maps.event.trigger(self.marker, 'click');
    };

};

// ViewModel and initialize some values 
var ViewModel = function () {
    var self = this;

    map = new google.maps.Map(document.getElementById("map"), {
        center: cenralize,
        zoom: scale
    });
    
    searchFilter();

}
