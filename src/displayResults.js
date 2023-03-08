import {countryListEl, countryInfoEl } from './index';
export { displayCountriesList, displayCountryCard };

function displayCountriesList(countries) {
    const countriesList = countries.map(country => 
        `<li class="country-item">
        <img src="${country.flags.svg}" alt="National flag" width="40px" height="auto"/>
        <p class="country-name-list">${country.name}</p>
        </li>`
    );
    return countryListEl.innerHTML = countriesList.join(' ');
}

function displayCountryCard(country) {
    const languages = country.languages.map(language => language.name).join(`, `);
    const countryCard = 
        `<div class="card-header">
        <img src=${country.flags.svg} alt="National flag" width="auto" height="30"/>
        <h2 class="country-name">${country.name}</h2>
        </div>
        <div class="card-info">
        <h3 class="info-title">Capital: <span class="info-descr">${country.capital}</span></h3>
        <h3 class="info-title">Population: <span class="info-descr">${country.population}</span></h3>
        <h3 class="info-title">Languages: <span class="info-descr">${languages}</span></h3>
        </div>`;
    countryInfoEl.innerHTML = countryCard;
};