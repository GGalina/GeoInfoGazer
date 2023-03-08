import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { displayCountriesList, displayCountryCard } from './displayResults';

const DEBOUNCE_DELAY = 300;
export const { inputEl, countryListEl, countryInfoEl } = {
    inputEl: document.querySelector(`#search-box`),
    countryListEl: document.querySelector(`.country-list`),
    countryInfoEl: document.querySelector(`.country-info`)
};

inputEl.addEventListener(`input`, debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(event) {
    const countryName = event.target.value.toLowerCase().trim();

    if (countryName === ``) {
        countryListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        return;
    };

    fetchCountries(countryName)
        .then(countries => {
            if (countries.length > 10) {
                countryListEl.innerHTML = '';
                countryInfoEl.innerHTML = '';
                Notify.info(`Too many matches found. Please enter a more specific name.`);
            } else if (countries.length >= 2 && countries.length <= 10) {
                countryInfoEl.innerHTML = '';
                displayCountriesList(countries);
            } else if (countries.length === 1) {
                countryListEl.innerHTML = ``;
                displayCountryCard(countries[0]);
            }
        })
        .catch(error => {
            countryListEl.innerHTML = '';
            countryInfoEl.innerHTML = '';
            Notify.failure('Oops, there is no country with that name.')
        });
};