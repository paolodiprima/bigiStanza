function initMap() {
               
    var mapsContainerIds = getAttrByClass("map-container","id");
    var address = getAttrByClass("map-container","data-address");
    
    // look for address and create maps 

    async function asFindLatLng(){
        for (mapIndex in mapsContainerIds){
        
            var geocoder = new google.maps.Geocoder();               
            var  coords =  await findLatLng(address[mapIndex], geocoder);  
            var map = createMap(mapsContainerIds[mapIndex],coords.lat,coords.lng,15);
            var marker = createMarker(map,coords.lat,coords.lng,address[mapIndex]);
            addInfo(address[mapIndex],map,marker);
          
            }
        }
    asFindLatLng();
        
} // initMap

// add info on a marker of a given map
function addInfo(info,map,marker){
    var infoAddress = new google.maps.InfoWindow({
         content: info,
         icon: '../public/img/icon/homeicon.png'
        });    
    infoAddress.open(map,marker);
}

// create a map
function createMap(elem,lat,lng,zoom){
    var options = {
            zoom  : zoom,
            center: {lat: lat, lng: lng},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            fullscreenControl: false,

            mapTypeControl: false
        } 
    return new google.maps.Map(document.getElementById(elem),options);
}

// create a Marker on the map
function createMarker(map,lat,lng,address){
    var options = {
        position : {lat:lat,lng:lng},
        map : map,
         title: address,
        // label: 
        //  {
        //     text: address,
        //     fontSize: "16px",
        //     color: "#19325b"
        // }
    }
    return new google.maps.Marker(options);
}

// get coordinates from address
function findLatLng(address, geocoder) {
    return new Promise(function(resolve, reject) {
        // asyn work
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                resolve({lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()});
            } else {
                reject(new Error('Couldnt\'t find the location ' + address));
            }
        })
    })
} 

// get array of value from give class
function getAttrByClass(cls,attr){
    var i = 0;
    var arr = [];  
    $("."+cls).each(function(){
        arr[i++] =  $(this).attr(attr); //this.attr
    });
    return arr;  
}