import React from "react";
// import GoogleMapReact from "google-map-react";

const Pointer = ({ text }) => <div>{text}</div>;

export default function MapWindow({ location }) {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627,
        },
        zoom: 11,
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: "22em", width: "22em", border: '2px solid black' }}>
            {/* <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyDk_PFeDts5f7OGOcBt0JkeU0pfnuYs8TA",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <Pointer lat={59.955413} lng={30.337844} text="My Marker" />
            </GoogleMapReact> */}
        </div>
    );
}
