/******************************
	 ADD ANIMATION TO THE TEXT 
	******************************/

	var count = 0;
	var number = 10;
	
	var interval = setInterval(function(){
       count++;
	   if (count === number) { 
	   		clearInterval(interval);
			$('h1 ,h2').addClass('animationActive');		
		}
	}, 50);
	
	
	
	/*********************
	 SET ROW'S HEIGHT
	*********************/
	$.each($('.row'), function() { 
	   var h = $(this).attr("data-height");
	   $(this).css("height",h);
	});
	
	
	
	/*************************
	 ON WINDOW SCROLL FUNCTION
	*************************/
	var sectionIds = {};		

	$(".row-nav").each(function(){	
		var $this = $(this);			
		sectionIds[$this.attr("id")] = $this.first().offset().top -120;	
	});			
	
	
	var count2 = 0;
	$(window).scroll(function(event){		

		var scrolled = $(this).scrollTop();		

		//If it reaches the top of the row, add an active class to it
		$(".row-nav").each(function(){
			
			var $this = $(this);
			
			if(scrolled >= $this.first().offset().top -120){
				$(".row-nav").removeClass("active");
				$this.addClass("active");	
				
				$(".animation").removeClass('animationActive');
				$this.find(".animation").addClass('animationActive');
						
			}
		});
		
		//when reaches the row, also add a class to the navigation
		for (ki in sectionIds){
			if (scrolled >= sectionIds[key]){
				$(".nav-btn").removeClass("active");
				var c = $("[data-row-id="+ki+"]");
				c.addClass("active");
				
				var i = c.index();
				$('#nav-indicator').css('left', i*100 + 'px');							
			}
		}	
		
		
		//Check if we've reached the top
	    if (scrolled > count2){  count2++;  } 
		else { count2--; }
	    
		count2 = scrolled;		
		
		if(count2 == 0){
			$('h1 ,h2').addClass('animationActive');
		}else{
			$('h1 ,h2').removeClass('animationActive');
		}
	
	});
	
	
	
	/**************
	 IN-NAVIGATION
	**************/
	$(".nav-btn").click(function(){		
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		
		var i = $(this).index();
		$('#nav-indicator').css('left', i*100 + 'px');			
		
		var name = $(this).attr("data-row-id");
		var id = "#" + name;
		var top = $(id).first().offset().top -60;			
		$('html, body').animate({scrollTop: top+'px'}, 300);
		
	});
	
	
	
	/*****
	 TOP
	******/
	$('#top').click(function(){
		$('html, body').animate({scrollTop: '0px'}, 300);
    });

/***joke
****/

const jokeEl = document.getElementById('joke');
const get_joke = document.getElementById('get_joke');

get_joke.addEventListener('click', generateJoke);

generateJoke();

async function generateJoke() {
	const jokeRes = await fetch('https://icanhazdadjoke.com/', {
		headers: {
			'Accept': 'application/json'
		}
	});
	const joke = await jokeRes.json();
	jokeEl.innerHTML = joke.joke;
}

/**
Quote
**/
const apiW = "https://api.quotable.io/random";

/*const quote = document.getElementById("quote");
const author = document.getElementById("author");
const btn = document.getElementById("btn");
*/
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const btn = document.querySelector("#btn2");

btn.addEventListener("click", getQuote);

function getQuote() {
  fetch(apiW)
    .then((res) => res.json())
    .then((data) => {
      quote.innerHTML = `"${data.content}"`;
      author.innerHTML = `- ${data.author}`;
    });
}

/*
Weather 
*/

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "178e102abf8fac6c200132d4a08befc1";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

