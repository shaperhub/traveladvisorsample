import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
      const { data } = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${lng}`, {
        // params: {lat: lat, lng: lng },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_WEATHER_API_KEY,
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      });
      const weathericon = ("https:" + JSON.stringify(data['current']['condition']['icon'])).replace(/"/g,'');
      // console.log("Weather Data: " + weathericon);
      return weathericon;
    
  } catch (error) {
    console.log("Weather Error: " + error);
  }
};
