//SRC and assets
// const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
//
let MORNING = 0;
let DAY = 1;
let EVENING = 2;
let NIGHT = 3
//DOM elements time
const time = document.querySelector('[data-time]');
const greeting = document.querySelector('[data-greeting]');
const name = document.querySelector('[data-name]');
const focus = document.querySelector('[data-focus]');
const date = document.querySelector('[data-date]');
const body = document.querySelector('body');
const buttonBgChange = document.querySelector('[data-bg-change-button]');

//DOM elements quote

const quotationText = document.querySelector('[data-quotation-text]');
const quotationAuthor = document.querySelector('[data-quotation-author]');
const buttonQuotationChange = document.querySelector('[data-quote-change-button]');

//DOM elements weather
const weatherIcon = document.querySelector('[data-weather-icon]');
const temperature = document.querySelector('[data-temperature]');
const weatherDescription = document.querySelector('[data-weather-description]');
const city = document.querySelector('[data-city]');
const windSpeed = document.querySelector('[data-wind-speed]');
const humidity = document.querySelector('[data-humidity]');


//helpers
let twentyFourHours = [];

//show Time
function showTime() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  time.innerHTML = `${insertZero(hours)}<span>:</span>${insertZero(minutes)}<span>:</span>${insertZero(seconds)}`

  setTimeout(showTime, 1000);
}

//show Date
function showDate() {
  let today = new Date();
  let dayName = today.getDay();
  let month = today.getMonth();
  let todayDate = today.getDate();

  date.innerHTML = `${stringifyDay(dayName)}, ${todayDate} ${stringifyMonth(month)}`
}

//stringify day

function stringifyDay(day) {
  if (!day) return 'Sunday';
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  
    default:
      return 'Sunday'
  }
}

//stringify month

function stringifyMonth(month) {
  if (!month) return 'January';
  switch (month) {
    case 0:
      return 'January'
    case 1:
      return 'February'
    case 2:
      return 'March'
    case 3:
      return 'April'
    case 4:
      return 'May'
    case 5:
      return 'June'
    case 6:
      return 'July'
    case 7:
      return 'August'
    case 8:
      return 'September'
    case 9:
      return 'October'
    case 10:
      return 'November'
    case 11:
      return 'December'
  
    default:
      return 'Wrong date'
  }
}

//insert zero
function insertZero(number) {
  return (parseInt(number, 10) < 10 ? '0' : '') + number;
}

//change greeting
let src;
let i = 0;
let img = document.createElement('img')
function changeBackground(dayPart, src) {
  i++;
  if (i > twentyFourHours[dayPart].length - 1) i = 0;
  src = src.replace(/\d+\.jpg/g, twentyFourHours[dayPart][i]);
  img.src = src.slice(4, -1);
  
  img.onload = () => body.style.backgroundImage = src;
  return
}


function setBgGreet (){
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  if (hours < 6) {
    src = `url(assets/images/night/${twentyFourHours[NIGHT][i]})`;
    if (minutes === 59 && seconds === 59) {
      changeBackground(NIGHT, src);
    };

    if (body.style.backgroundImage === '') {
      body.style.backgroundImage = src;
    };

    greeting.textContent = `Good night, `;
  } else if (hours < 12) {
    src = `url(assets/images/morning/${twentyFourHours[MORNING][i]})`;
    if (minutes === 59 && seconds === 59) {
      changeBackground(MORNING, src);
    };

    if (body.style.backgroundImage === '') {
      body.style.backgroundImage = src;
    };

    greeting.textContent = `Good morning, `;
  } else if (hours < 18) {
    src = `url(assets/images/day/${twentyFourHours[DAY][i]})`;
    if (minutes === 59 && seconds === 59) {
      changeBackground(DAY, src);
    };

    if (body.style.backgroundImage === '') {
      body.style.backgroundImage = src;
    };

    greeting.textContent = `Good day, `;
  } else {
    src = `url(assets/images/evening/${twentyFourHours[EVENING][i]})`;
    if (minutes === 59 && seconds === 59) {
      changeBackground(EVENING, src);
    };

    if (body.style.backgroundImage === '') {
      body.style.backgroundImage = src;
    }

    greeting.textContent = `Good evening, `;
  }

  setTimeout(setBgGreet, 1000);
}

//get name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter your name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

//set name to local storage

function setName(event) {
  switch (event.type) {
    case 'keypress':
      if (event.keyCode == 13 || event.which == 13) {
        if (name.textContent === '') {
          name.blur();
          return;
        }
        localStorage.setItem('name', event.target.innerText);
        name.blur();
      }
      break;
    case 'click':
      if (localStorage == null || name.textContent) {
        localStorage.setItem('name', event.target.innerText);
        name.textContent = '';
      }
      break;
    default:
      if (name.textContent === '') {
        name.textContent = localStorage.getItem('name');
      }
      localStorage.setItem('name', event.target.innerText);
      break;
  }
}

//get focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter your focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

//set focus to local storage
function setFocus(event) {
  switch (event.type) {
    case 'keypress':
      if (event.keyCode == 13 || event.which == 13) {
        if (focus.textContent === '') {
          focus.blur();
          return;
        }
        localStorage.setItem('focus', event.target.innerText);
        focus.blur();
      }
      break;
    case 'click':
      if (localStorage == null || focus.textContent) {
        localStorage.setItem('focus', event.target.innerText);
        focus.textContent = '';
      }
      break;
    default:
      if (focus.textContent === '') {
        focus.textContent = localStorage.getItem('focus');
      }
      localStorage.setItem('focus', event.target.innerText);
      break;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function createRandomImages()  {
  let randomImage = `${getRandomInt(1, 21)}`;
  randomImage = randomImage.padStart(2, '0');
  return randomImage += '.jpg';
}

function isUnique(arr) {
  const seenValues = {}

  for (let i = 0; i < arr.length; i++) {
    // we already saw this element in the array
    if (seenValues[arr[i]]) {
      return false;
    } else {
      seenValues[arr[i]] = true
    }
  }

  return true;
}

function createImagesArray() {
  let morning = [];
  let day = [];
  let evening = [];
  let night = [];

  for (let i = 0; i < 6; i++) {
    morning.push(createRandomImages());
    day.push(createRandomImages());
    evening.push(createRandomImages());
    night.push(createRandomImages());
  };

  twentyFourHours = [morning, day, evening, night];
  if (!(isUnique(twentyFourHours[0]) && isUnique(twentyFourHours[1]) && isUnique(twentyFourHours[2]) && isUnique(twentyFourHours[3]))) createImagesArray();
}



name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', setFocus);

let clickCounter = 0;
buttonBgChange.addEventListener('click', () => {
  clickCounter++;
  //if it is evening 
  if (greeting.textContent == `Good evening, `) {
    if (clickCounter === 25) clickCounter = 0;
    if (clickCounter >= 0 && clickCounter < 6) {
      src = `url(assets/images/evening/${twentyFourHours[EVENING][i]})`;
      changeBackground(EVENING, src);
    }
    if (clickCounter >= 6 && clickCounter < 12) {
      src = `url(assets/images/night/${twentyFourHours[NIGHT][i]})`;
      changeBackground(NIGHT, src);
    }

    if (clickCounter >= 12 && clickCounter < 18) {
      src = `url(assets/images/morning/${twentyFourHours[MORNING][i]})`;
      changeBackground(MORNING, src);
    }

    if (clickCounter >= 18 && clickCounter < 25) {
      src = `url(assets/images/day/${twentyFourHours[DAY][i]})`;
      changeBackground(DAY, src);
    }
  }

  //if it is morning 
  if (greeting.textContent == `Good morning, `) {
    if (clickCounter === 25) clickCounter = 0;
    if (clickCounter >= 0 && clickCounter < 6) {
      src = `url(assets/images/morning/${twentyFourHours[MORNING][i]})`;
      changeBackground(MORNING, src);
    }
    if (clickCounter >= 6 && clickCounter < 12) {
      src = `url(assets/images/day/${twentyFourHours[DAY][i]})`;
      changeBackground(DAY, src);
    }

    if (clickCounter >= 12 && clickCounter < 18) {
      src = `url(assets/images/evening/${twentyFourHours[EVENING][i]})`;
      changeBackground(EVENING, src);
    }

    if (clickCounter >= 18 && clickCounter < 25) {
      src = `url(assets/images/night/${twentyFourHours[NIGHT][i]})`;
      changeBackground(NIGHT, src);
    }
  }

  //if it is day 
  if (greeting.textContent == `Good day, `) {
    if (clickCounter === 25) clickCounter = 0;
    if (clickCounter >= 0 && clickCounter < 6) {
      src = `url(assets/images/day/${twentyFourHours[DAY][i]})`;
      changeBackground(DAY, src);
    }
    if (clickCounter >= 6 && clickCounter < 12) {
      src = `url(assets/images/evening/${twentyFourHours[EVENING][i]})`;
      changeBackground(EVENING, src);
    }

    if (clickCounter >= 12 && clickCounter < 18) {
      src = `url(assets/images/night/${twentyFourHours[NIGHT][i]})`;
      changeBackground(NIGHT, src);
    }

    if (clickCounter >= 18 && clickCounter < 25) {
      src = `url(assets/images/morning/${twentyFourHours[MORNING][i]})`;
      changeBackground(MORNING, src);
    }
  }

  //if it is night 
  if (greeting.textContent == `Good night, `) {
    if (clickCounter === 25) clickCounter = 0;
    if (clickCounter >= 0 && clickCounter < 6) {
      src = `url(assets/images/night/${twentyFourHours[NIGHT][i]})`;
      changeBackground(NIGHT, src);
    }
    if (clickCounter >= 6 && clickCounter < 12) {
      src = `url(assets/images/morning/${twentyFourHours[MORNING][i]})`;
      changeBackground(MORNING, src);
    }

    if (clickCounter >= 12 && clickCounter < 18) {
      src = `url(assets/images/day/${twentyFourHours[DAY][i]})`;
      changeBackground(DAY, src);
    }

    if (clickCounter >= 18 && clickCounter < 25) {
      src = `url(assets/images/evening/${twentyFourHours[EVENING][i]})`;
      changeBackground(EVENING, src);
    }
  }
})


//quotation

async function getQuote() {
  let url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);

  const data = await res.json();
  quotationText.textContent = data.quote.quoteText;
  quotationAuthor.textContent = data.quote.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
buttonQuotationChange.addEventListener('click', getQuote);







//weather
async function getWeather() {
    city.textContent = localStorage.getItem('city');
  

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=ac6de828894bca65db7c58eabff0bff8&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windSpeed.textContent = `${data.wind.speed} m/s`;
  humidity.textContent = `${data.main.humidity}%`;
  } catch (error) {
    temperature.textContent = '';
    weatherDescription.textContent = 'Enter a real city';
    windSpeed.textContent = '';
    humidity.textContent = '';
  }

}

function setCity(event) {
  switch (event.type) {
    case 'keypress':
      if (event.code === 'Enter') {
        if (city.textContent === '') {
          city.blur();
          return;
        }
    
        localStorage.setItem('city', event.target.innerText);
        city.blur();
        getWeather();
      }
    break;
    case 'click':
      if (localStorage == null || city.textContent) {
        localStorage.setItem('city', event.target.innerText);
        city.textContent = '';
      }
    break;
    default:
      if (city.textContent === '') {
        city.textContent = localStorage.getItem('city');
      }
      localStorage.setItem('city', event.target.innerText);
      getWeather();
    break;
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

city.addEventListener('click', getWeather)
city.addEventListener('click', setCity);




createImagesArray();


//run
showTime();
showDate();
setBgGreet();
getName();
getFocus();

//bg

// changeBackground();

