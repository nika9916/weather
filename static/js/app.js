// variables

const apiKey = "d7a5c7f93559292fd175fe93387080c4";
const form = document.querySelector(".input-container form");
const input = document.querySelector(".input-container input");
const inputErr = document.querySelector(".input-err");
const list = document.querySelector(".cities");



// fetch api

form.addEventListener("submit", e => {
  e.preventDefault();

  const inputVal = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // console.log(data.cod);
      if (data.cod === 200) {
        const {weather, main, name, sys} = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      
        const li = document.createElement("li");
        li.classList.add("city");
        const cityLiHtml = `
          <div class="city-name">
            <span>${name}</span>
            <span class="span-2">${sys.country}</span>
          </div>
          <div class="city-temp">${Math.round(main.temp)}°C</div>
          <img  class="city-img" src="${icon}">
          <div>${weather[0]["description"]}</div>
        `;  
        li.innerHTML = cityLiHtml;
        list.appendChild(li);
      } else {
        // throw 'Status Code' + data.cod
        inputErr.textContent = "Does not match the city !";
      }
    })
    .catch(err => {
      const p = document.createElement('p');
      p.textContent = err;
      p.style.color = 'red';
      p.style.fontSize = "30px"
      document.body.appendChild(p);
  })

  inputErr.textContent = "";
  input.focus();
  form.reset();
});

// Hide content
const citySectionHide = document.querySelector('.city-section')
const hideButtton = document.querySelector('.exit-button')

function hideContent() {
  citySectionHide.classList.toggle('display-none')
    if (hideButtton.innerHTML == "Hide Content") {
      hideButtton.innerHTML = "Display Content";
    } else {
      hideButtton.innerHTML = "Hide Content"
    }
}



