const moods = document.querySelector(".dark-mood");
const body = document.querySelector("body");
const select = document.querySelector(".select");
const input = document.querySelector(".input");
const nav = document.querySelector("nav");

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((countries) => {
      displayCountries(countries);
      addFilterListeners(countries);
    })
    .catch((error) => {
      console.error("Error fetching countries:", error);
      document.getElementById("countries").innerHTML =
        "<p>Failed to load country data.</p>";
    });

  const displayCountries = (countries) => {
    const countriesHTML = countries
      .map((country) => getCountryHTML(country))
      .join("");
    document.getElementById("countries").innerHTML = countriesHTML;
  };

  const getCountryHTML = (country) => {
    return `
    <a class="about-page" href="about.html">
      <div class="country-div">
        <img class="country-img" src="${country.flags.svg}" alt="${
      country.name.common
    } flag" width="100%">
        <h2 class="country-name">${country.name.common}</h2>
        <p class="others"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p class="others"><strong>Region:</strong> ${country.region}</p>
        <p class="others"><strong>Capital:</strong> ${
          country.capital ? country.capital[0] : "N/A"
        }</p>
       </div>
      </a>
    `;
  }
  
  
  
  const addFilterListeners = (countries) => {
    input.addEventListener("input", () => {
      filterAndDisplayCountries(countries);
    });

    select.addEventListener("change", () => {
      filterAndDisplayCountries(countries);
    });
  };

  const filterAndDisplayCountries = (countries) => {
    const searchTerm = input.value.toLowerCase();
    const region = select.value;

    const filteredCountries = countries.filter((country) => {
      const matchesSearchTerm = country.name.common
        .toLowerCase()
        .includes(searchTerm);
      const matchesRegion = region ? country.region === region : true;
      return matchesSearchTerm && matchesRegion;
    });

    displayCountries(filteredCountries);
  };
});

moods.addEventListener("click", () => {
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    updateDarkModeStyles(true);
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    updateDarkModeStyles(false);
  }
});

const updateDarkModeStyles = (isDarkMode) => {
  if (isDarkMode) {
    select.style.backgroundColor = "#2b3844";
    select.style.color = "#fff";
    input.style.backgroundColor = "#2b3844";
    input.style.color = "#fff";
    nav.style.backgroundColor = "#2b3844";
    nav.classList.remove("border-b-2");
  } else {
    select.style.backgroundColor = "white";
    select.style.color = "black";
    input.style.backgroundColor = "white";
    input.style.color = "black";
    nav.style.backgroundColor = "white";
    nav.classList.add("border-b-2");
  }
};
