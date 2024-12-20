"use client";

import React, { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";

interface LocationPickerProps {
  onSelect: (location: { placeName: string; city: string }) => void;
  onClose: () => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: -6.2, // Koordinat default (Jakarta)
  lng: 106.816666,
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  onSelect,
  onClose,
}) => {
  const [selectedLocation, setSelectedLocation] = useState(defaultCenter);
  const [placeName, setPlaceName] = useState("");
  const [city, setCity] = useState("");

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setSelectedLocation(newLocation);
    }
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      console.log(place); // Tambahkan ini untuk melihat struktur lengkap objek place

      if (place && place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(location);
        setPlaceName(place.name || "");

        // Debug komponen alamat
        console.log(place.address_components);

        // Ambil nama kota dari komponen alamat
        const cityComponent = place.address_components?.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_2")
        );
        setCity(cityComponent?.long_name || "City not found");
      }
    }
  };

  const handleConfirm = () => {
    onSelect({ placeName, city });
    onClose();
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">Select Location</h2>

        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Search place..."
            className="border p-2 w-full mb-4"
          />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={selectedLocation}
          zoom={12}
          onClick={handleMapClick}
        >
          <Marker position={selectedLocation} />
        </GoogleMap>

        <div className="mt-4">
          <p className="text-sm">
            <strong className="font-light">Place Name:</strong> {placeName}
          </p>
          <p className="text-sm">
            <strong className="font-light">City:</strong> {city}
          </p>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
