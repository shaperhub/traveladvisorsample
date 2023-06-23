import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles';
import mapStyles from '../../mapStyles';

const Map = ({ setCoords, setBounds, coords, places, setChildClicked, weatherData }) => {

  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
        <GoogleMapReact
            bootstrapURLKeys={{ key:'AIzaSyBlslYrOQWBzET_PBEfGHECxdjMGJ5YTGM' }}
            defaultCenter={coords}
            center={coords}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
            options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
            onChange={(e) => {
                setCoords({ lat: e.center.lat, lng: e.center.lng });
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
            }}
            onChildClick={(child) => setChildClicked(child)}
        >
          {places?.map((place, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {
                !matches ? (
                  <LocationOnOutlinedIcon color='primary' fontSize='large' />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                      {place.name}
                    </Typography>
                    <img 
                      className={classes.pointer}
                      src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                      alt={place.name}
                    />
                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                  </Paper>
                )
              }
            </div>
          ))}
          {/* {weatherData?.list?.length && weatherData.list.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt=''/>
            </div>
          ))} */}
          {/* {weatherData.length && weatherData.map((data, index) => (
            <div key={index} lat={data[0]} lng={data[1]}>
              <img height={75} src={data[2]} alt=''/>
            </div>
          ))} */}
        </GoogleMapReact>
    </div>
  );
}

export default Map;