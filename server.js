const express = require('express');
const bodyParser = require('body-parser'); 
const fetch = require('node-fetch');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html' )
});




app.post("/", async (req, res) => {
  const city = req.body.city__name;
  const apiKey = 'd64def90ddb092896e14307a46216101'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try{
    const response = await fetch(apiUrl);
    if( response.ok){
      const data = await response.json();

      /*const temperature = data.main.temp;
      console.log(temperature - 273);
      const N = (temperature - 273)
      console.log(Math.floor(N * 10) / 10);
      console.log(data.name);
      console.log(data.sys.country);
      console.log(data.weather[0].description, data.weather[0].icon);
      console.log(data.wind.speed);
      console.log(data.main.humidity);
      console.log(data.clouds.all);
*/
      const temperature = Math.floor((data.main.temp - 273) * 10)/10;
    
      const location = data.name;
 
      const country = data.sys.country;
  
      const cloud = data.weather[0].description;
      
      const cloud_icon = data.weather[0].icon;
      
      const wind_speed = data.wind.speed;

      const humidity_per = data.main.humidity;

      const cloud_per= data.clouds.all;

    
      const weather = {
        location,
        country,
        cloud, 
        cloud_icon,
        temperature,
        wind_speed,
        humidity_per,
        cloud_per
      };
      console.log(weather);
    res.send(weather);
    }
    else {
      console.error("error logging the data", response.statusText);
      res.status(500).send('Internal Server Error'); // Change this line
    }
  } catch (error) {
    console.error('error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});



app.post('/getWeather', (req,res) => {
  const lat = req.body.latitude;
  const long = req.body.longitude;
  console.log(lat + " " + long);
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
