import React from "react";
import { WhereToVoteRounded } from "@mui/icons-material";
import GoogleMapReact from "google-map-react";
import { Sheet } from "@mui/joy";

export default function MapWindow({ key, center, zoom = 10 }) {
    const Pointer = () => (
        <WhereToVoteRounded
            sx={{ width: "2em", height: "2.5em", color: "#e33636" }}
        />
    );

    return (
        // Important! Always set the container height explicitly
        <Sheet
            sx={{ height: "22em", width: "24em", border: "2px solid black", mb: 3 }}
        >
            <GoogleMapReact
                bootstrapURLKeys={{ key }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <Pointer />
            </GoogleMapReact>
        </Sheet>
    );
}
