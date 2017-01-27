var style = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    }, {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    }, {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }, {
                "visibility": "off"
            }
        ]
    }, {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }, {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }, {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    }, {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }, {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    }, {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    }, {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    }, {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    }, {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    }, {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    }, {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    }, {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }, {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
]

// google.maps.event.addListener(document.getElementById('map'), 'click', function(event) {
//     placeMarker(event.latLng);
// });
function initMap() {
    var loc = navigator.geolocation.getCurrentPosition(success, error, options);
}
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    var uluru = {
        lat: crd.latitude,
        lng: crd.longitude
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru
    });
    var marker = new google.maps.Marker({position: uluru, map: map});
};

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};
$(document).ready(function() {
    function convertAddress(data) {
        let THE_ADDRESS_YOU_WANT_TO_GEOCODE = data
        return $.ajax({
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + THE_ADDRESS_YOU_WANT_TO_GEOCODE + '&key=AIzaSyC2zdWo_P4VpKSL5UALlCw4qEl_IOnZAn0',
            "dataType": "json"
        })
    }

    function placeMarker(location) {
        var marker = new google.maps.Marker({position: location});
    }

    $('#searchAddress').submit(function() {
        var conversion = convertAddress(encodeURI($('#searchAddress input').val()))
        console.log(conversion)
        console.log(JSON.stringify(conversion))
        console.log(typeof conversion)
        return false;
    })

    $('#map').click(function(event) {
        console.log($(this))
        placeMarker(event.latLng);
    })
})
