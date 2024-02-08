import React, { Component } from 'react';

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }

    componentDidMount() {
        this.initMap();
    }

    initMap = () => {
        const map = new window.google.maps.Map(this.mapRef.current, {
            center: {lat: 0, lng: 0},
            zoom: 15
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                const marker = new window.google.maps.Marker({
                    position: pos,
                    map: map,
                    title: 'Your Current Location'
                });

                map.setCenter(pos);
            }, () => {
                this.handleLocationError(true, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            this.handleLocationError(false, map.getCenter());
        }
    }

    handleLocationError = (browserHasGeolocation, pos) => {
        const infoWindow = new window.google.maps.InfoWindow({map: this.mapRef.current});
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }

    render() {
        return (
            <div style={{ height: '400px', width: '100%' }} ref={this.mapRef}></div>
        );
    }
}

export default MapComponent;
