const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const WEATHER_API_KEY = "a87254bb804e47dcbdc205605240507";
app.get("/", (req, res) => res.send("Express on Vercel"));

app.get("/api/hello", async (req, res) => {
  try {
    const visitor_name = req.query.visitor_name.replaceAll('"', "");
    console.log(visitor_name);
    const newIp = (req.headers["x-forwarded-for"] || "").split(",")[0];
  
    // const userIp = ip.address(); // my ip address
    // var geo = geoip.lookup(userIp);
    // console.log(geo);
  
    const testip = "197.157.217.183";
    const zig = await fetch(`https://ipapi.co/${newIp}/json/`);
    const data = await zig.json();
    // console.log(data);
    const { ip, city, latitude, longitude } = data;
  
    const weatherResponse = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}`
    );
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    const temp = weatherData.current.temp_c;
    res.status(200).json({
      client_ip: ip, // The IP address of the requester
      location: city, // The city of the requester
      greeting: `Hello, ${visitor_name}!, the ${temp} is 11 degrees Celsius in ${city}`,
    });
  
  } catch (error) {
    console.error(error)
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
