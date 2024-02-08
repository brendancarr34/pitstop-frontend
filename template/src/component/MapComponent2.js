import React, { Component } from 'react';

class MapComponent2 extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        this.initMap();
    }

    initMap = () => {
        const map = new window.google.maps.Map(this.mapRef.current, {
            center: { lat: 0, lng: 0 },
            zoom: 14
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                const marker = new window.google.maps.Marker({
                    position: pos,
                    map: map,
                    title: 'Your Current Location',
                    icon: {
                        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Blue marker icon URL
                    }
                });

                map.setCenter(pos);

                // Search for nearby bathrooms
                this.searchNearbyPlaces(map, pos);
            }, () => {
                this.handleLocationError(true, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, map.getCenter());
        }
    };

    // searchNearbyGasStations = (map, location) => {
    //     const service = new window.google.maps.places.PlacesService(map);
    //     service.nearbySearch(
    //         {
    //             location: location,
    //             radius: 5000, // in meters (you can adjust this value)
    //             type: 'gas_station'
    //         },
    //         (results, status) => {
    //             if (status === window.google.maps.places.PlacesServiceStatus.OK) {
    //                 for (let i = 0; i < Math.min(results.length, 8); i++) {
    //                     this.createMarker(results[i], map);
    //                 }
    //             }
    //         }
    //     );
    // };

    searchNearbyPlaces = (map, location) => {
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(
            {
                location: location,
                radius: 5000, // in meters (you can adjust this value)
                type: ['gas_station', 'restroom'] // include both gas stations and restrooms
            },
            (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < Math.min(results.length, 20); i++) {
                        this.createMarker(results[i], map);
                    }
                }
            }
        );
    };

    createMarker = (place, map) => {
        const marker = new window.google.maps.Marker({
            map,
            position: place.geometry.location,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' // Blue marker icon URL
            }
        });

        window.google.maps.event.addListener(marker, 'click', () => {
            const infowindow = new window.google.maps.InfoWindow({
                content: place.name
            });
            infowindow.open(map, marker);
        });
    };

    handleLocationError = (browserHasGeolocation, pos) => {
        const infoWindow = new window.google.maps.InfoWindow({ map: this.mapRef.current });
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? 'Error: The Geolocation service failed.'
                : "Error: Your browser doesn't support geolocation."
        );
    };

    render() {
        return <div style={{ height: '400px', width: '100%' }} ref={this.mapRef}></div>;
    }
}

export default MapComponent2;
