// app.js

const moods = document.querySelector('.dark-mood');
const body = document.querySelector('body');
const select = document.querySelector(".select")
const input = document.querySelector(".input")
const nav = document.querySelector('nav')

document.addEventListener('DOMContentLoaded', () => {
  fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((countries) => {
          displayCountries(countries);
      });

  const displayCountries = (countries) => {
      const countriesHTML = countries.map(country => getCountryHTML(country)).join("");
      const container = document.getElementById('countries');
      container.innerHTML = countriesHTML;
  };

  const getCountryHTML = (country) => {
      return `
          <div class="country-div">
              <img class="country-img" src="${country.flags.svg}" alt="${country.name.common} flag" width="100%">
              <h2 class="country-name">${country.name.common}</h2>
              <p class="others"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p class="others"><strong>Region:</strong> ${country.region}</p>
              <p class="others"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
          </div>
      `;
  };
});

moods.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    select.setAttribute("style" , 'color:black')
    select.style.backgroundColor = '#2b3844' 
    select.style.color = '#fff'
    input.style.backgroundColor = '#2b3844' 
    input.style.color = '#fff'  
    nav.classList.remove('border-b-2')
    nav.style.backgroundColor = '#2b3844'

  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  }
});
