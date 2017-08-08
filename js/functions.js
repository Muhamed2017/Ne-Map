// Clickable menue to appear and collapse
function hideShow() {
         var  status = document.getElementById('allplaces').style.display;
         switch (status){
                case 'none': 
                        status = 'block';
                        document.getElementById('allplaces').style.display=status;           
                 break;
                 
                default:
                       document.getElementById('allplaces').style.display = 'none';   
 }

}
//when loading is impossiple
function ErrorLoading() {
    alert("Can't Reload Google Map In the mean time");
}

function initMap() {
    infoWindow = new google.maps.InfoWindow();
    ko.applyBindings(new ViewModel());
}

// Filtering search input
function searchFilter(){
        //creating observable array to hold the places shown 
        self.arrayOfPlaces= ko.observableArray([]);
    
        somePlaces.forEach(function (Loc) {
        self.arrayOfPlaces.push(new Place(Loc));
    });
        self.inputSearch = ko.observable('');
        self.filterd = ko.computed(function () {
        var textFiltering = self.inputSearch().toLowerCase().split();
          
 
            
       /*   
       testing what user typing and show the result 
       */
            
        switch (textFiltering){
           case " " :  //user types nothing
               self.arrayOfPlaces().forEach(function (loca) {
               loca.isAvailable(true);
            });
            return self.arrayOfPlaces();
            break;
    
         default :
                return ko.utils.arrayFilter(self.arrayOfPlaces(), function (loca) {
                var reTitle = loca.title.toLowerCase();
                var finalOut = (reTitle.search(textFiltering) >= 0);
                loca.isAvailable(finalOut);
                return finalOut;
            });
          break ;    
 }
    }, self);


};

