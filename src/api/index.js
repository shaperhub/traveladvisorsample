import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (sw, ne) => {
  try {
    const { data: { data } } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': '235f5c3932msh6b871250f145c28p158405jsnae02c489bedc',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (lat, lng) => {
  lat = parseFloat(lat);
  lng = parseFloat(lng);
  try {
    
      const { data: { data } } = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
        params: {q: lat,lng },
        headers: {
          'X-RapidAPI-Key': '235f5c3932msh6b871250f145c28p158405jsnae02c489bedc',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      });
      // console.log("Weather Data: " + data);
      return data;
    
  } catch (error) {
    console.log("Weather Error: " + error);
  }
};
