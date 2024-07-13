import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyA1-nySBHdnhIbH99nUQAtedkj2A16FJYY",
    libraries: ['places'] // Load the Places library
  });

  const [map, setMap] = useState(null);
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleInputChange = async (event) => {
    const input = event.target.value;
    setAddress(input);

    if (input.length > 2) {
      if (window.google && window.google.maps && window.google.maps.places) {
        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input }, (predictions) => {
          if (predictions) {
            setSuggestions(predictions.map(prediction => prediction.description));
          } else {
            setSuggestions([]);
          }
        });
      }
    } else {
      setSuggestions([]);
    }
  };

  return isLoaded ? (
    <div>
      <Autocomplete
        freeSolo
        options={suggestions}
        inputValue={address}
        onInputChange={(event, newInputValue) => {
          setAddress(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search address"
            variant="outlined"
            onChange={handleInputChange}
          />
        )}
      />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : <></>;
}

export default React.memo(Map);
