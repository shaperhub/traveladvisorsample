import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {

  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
        setCoords({ lat: latitude, lng: longitude });
    })
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
        setIsLoading(true);
        getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setRating('');
            setIsLoading(false);
        })

        getWeatherData(coords.lat, coords.lng)
        .then((data) => {
            setWeatherData(data);
            console.log("Weather check - " + weatherData);
        });
    }
    
  }, [type, bounds]);

//   const onLoad = (autoC) => setAutocomplete(autoC);

//   const onPlaceChanged = () => {
//     const lat = autocomplete.getPlace().geometry.location.lat();
//     const lng = autocomplete.getPlace().geometry.location.lng();

//     setCoords({ lat, lng });
//   };


  return (
    <>
        <CssBaseline />
        <Header setCoords={setCoords}/>
        <Grid container spacing={3} style={{width: '100%'}}>
            <Grid item xs={12} md={4}>
                <List 
                    isLoading={isLoading}
                    childClicked={childClicked}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                />
            </Grid>
            <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Map
                    setCoords={setCoords}
                    setBounds={setBounds}
                    coords={coords}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    weatherData={weatherData}
                    setChildClicked={setChildClicked}
                />
            </Grid>
        </Grid>
    </>
  );
}

export default App;