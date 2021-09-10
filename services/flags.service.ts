import axios from "axios";

// https://flagcdn.com/en/codes.json
let countryCodes;

export const loadCountryCodes = async () => {
    if(!countryCodes) {
        const {data} = await axios.get('https://flagcdn.com/en/codes.json');
        countryCodes = data;
    }
    console.log('Country Codes Loaded');
}

export const getFlagByCountryName = (name: string) => {
    const countryCode = Object.keys(countryCodes).find(key => countryCodes[key] === name);
    return `https://flagcdn.com/w20/${countryCode}.jpg`
}