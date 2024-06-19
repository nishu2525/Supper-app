import React, { useEffect, useState } from "react";
import "./Home.css";
import { useLocation } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import profile from "../Assests/images/profile.png";

import presuure_ig from "../Assests/images/presuure.png";
import humidity_ig from "../Assests/images/humidity.png";
import wind_ig from "../Assests/images/wind.png";

import up from '../Assests/images/up.png';
import down from '../Assests/images/down.png';
import Tone from '../Assests/timertone.mp3';
import { useNavigate } from "react-router-dom";
function Home() {

  const navigate = useNavigate();

    const handleBrowserBtn = () => {
        navigate("/Movies");
    };
    

  // About Section 
  const storedName = localStorage.getItem("Name");
  const storedUserName = localStorage.getItem("UserName");
  const storedEmail = localStorage.getItem("Email");

  

  //  Weather Section    
  const location = useLocation();
  const { selectedCategories } = location.state || {};
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();  
  const [weather, setWeather] = useState(false);
  useEffect(() => {
    const apiKey = "987de39fe8924052ada80850232502 ";
    const location = "Pune";

    const fetchWeather = async () => {
      await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`
      )
        .then(async (data) => await data.json())
        .then((data) => setWeather(data));
    };
    fetchWeather();
  }, []);

  // News Section 

  const [news, setNews] = useState('')
  const n_apiKey = 'fb89ab3f83fd460cb89f5259af927163'
  console.log(news)
  useEffect(()=>{
      const fetchNews = async()=>{
         await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${n_apiKey}`)
              .then(async(data)=>await data.json()).then((res)=>setNews(res.articles[0]))
      }
      fetchNews();
  },[])


   // Notes Section
  const [text, setText] = useState(JSON.parse(window.localStorage.getItem("text")))
  const handleChange=(e)=>{
    setText(e.target.value)
    window.localStorage.setItem("text",JSON.stringify(text))    
}

//  Timer section

const [seconds, setSeconds] = useState(0);
const [minutes, setMinutes] = useState(0);
const [hours, setHours] = useState(0);
const [playing, setPlaying] = useState(false);
 const timerTone = new Audio(Tone);

const increaseSecond = () => {
  if (seconds === 59) {
    return;
  }
  setSeconds((sec) => sec + 1);
};
const increaseMinute = () => {
  if (minutes === 59) {
    return;
  }
  setMinutes((min) => min + 1);
};
const increaseHour = () => {
  setHours((hours) => hours + 1);
};
const decreaseSecond = () => {
  if (seconds === 0) {
    return;
  }
  setSeconds((sec) => sec - 1);
};
const decreaseMinute = () => {
  if (minutes === 0) {
    return;
  }
  setMinutes((min) => min - 1);
};
const decreaseHour = () => {
  if (hours === 0) {
    return;
  }
  setHours((hours) => hours - 1);
};

function toHoursAndMinutes(totalSeconds) {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes}:${seconds}`;
}

const handleButtonClick = () => {
  setPlaying((prev) => !prev);

  if (!playing) {
    timerTone.play();
  } else {
    timerTone.pause();
    timerTone.currentTime = 0;
  }
};

  return (
  <div className="container">

          {/*   About Section  */}                 {/*   About Section  */}
      <div className="about_section">
          <div className="profile">
            <img src={profile} alt="profile_photo" className="profile_photo" />
          </div>
          <div className="details">
            <p className="details_name"> {storedName} </p>
            <p className="details_email"> {storedEmail} </p>
            <h1 className="details_uName"> {storedUserName} </h1>
          </div>
          <div className="Catergories_b">
              {selectedCategories && (selectedCategories.length > 0 ) && selectedCategories.map((category, index) => (
               <h3 className="S_Catergories" key={index}>{category}</h3> ))}
          </div>
      </div>

      {/*   Weather Section  */}                 {/*   Weather Section  */}  

              <div className="weather_section">
                    <div className="timezone">
                      <p>{currentDate}</p>
                      <p>{currentTime}</p>
                    </div>

             {weather ? (
              <div className="weatherzone">
                {" "}
                <div>
                  <img src={weather.current.condition.icon} alt="logoo" />
                  <p id="p1">{weather.current.condition.text}</p>
                </div>
                <div class="vl"></div>
                <div>
                    <p> <span>{weather.current.temp_c}</span> <sup>&#176;C</sup></p>
                    <p>{" "}<img src={presuure_ig} alt="" />{" "} {weather.current.pressure_mb} mbar pressure</p>
                </div>
                <div class="vl"></div>
                <div>
                  <p><img src={wind_ig} alt="" /> {weather.current.wind_kph}kp/h wind </p>
                  <p> <img src={humidity_ig} alt="" /> {weather.current.humidity}{" "} humidity </p>
                </div>
              </div>
            ) : (<></> )}
          </div>

                 <img src={news.urlToImage} className="news_section img" alt="news-ig"/>
             <div className="news_section" >
                <div className="news_details">
                    <p>{news.title}</p>
                    <span >{currentDate}</span>
                    <span >{currentTime}</span>
                </div>
                <div className="n_description">{news.description}</div>
           </div>
    {/*Notes Section                                  Notes Section */}
           <div className="notesdiv">
                 <p className="notesheading">All notes</p>
                 <textarea className="notestext" value={text} onChange={(e)=>handleChange(e)}/>
           </div>

    {/* Timer Section */}
           <div className='timerC'>
      <div>
        <CountdownCircleTimer
          isPlaying={playing}
          duration={seconds + minutes * 60 + hours * 60 * 60}
          colors={['#FF6A6A']}
        >
          {({ remainingTime }) => (
            <span style={{ color: 'white', fontSize: '1.5rem' }}>
              {toHoursAndMinutes(remainingTime)}
            </span>
          )}
        </CountdownCircleTimer>
      </div>
      <div style={{ width: '35vw', textAlign: 'center' }}>
        <div className='timer_section'>
          <div className='times'>
            <p>Hours</p>
            < img className="imgUD" onClick={increaseHour} src={up}  alt="up"/>
            <p>{hours}</p>
            < img className="imgUD" onClick={decreaseHour} src={down}  alt="down"/>
          </div>
          <div className='times'>
            <p>Minutes</p>
            < img className="imgUD" onClick={increaseMinute} src={up}  alt="up"/>
            <p>{minutes}</p>
            < img className="imgUD" onClick={decreaseMinute} src={down}  alt="down"/>
          </div>
          <div className='times'>
            <p>Seconds</p>
            < img className="imgUD" onClick={increaseSecond} src={up} alt="up" />
            <p>{seconds}</p>
            < img className="imgUD" onClick={decreaseSecond} src={down} alt="down"/>
          </div>
        </div>
        <div className='playing_button' onClick={handleButtonClick}>
          {playing ? <p>Stop</p> : <p>Start</p>}
        </div>
      </div>
    </div>

              <div className="browse_btn" onClick={handleBrowserBtn} >Browse</div>
        </div> 
  );
}

export default Home;
