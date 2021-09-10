import axios from "axios";
import cache from "memory-cache";

// https://flagcdn.com/en/codes.json

export const flagService = {
  loadCountryCodes: async () => {
    const countryCodes = cache.get("country-codes");
    if (!countryCodes) {
      const { data } = await axios.get("https://flagcdn.com/en/codes.json");
      cache.put("country-codes", data);
    }
    console.log("Country Codes Loaded");
  },

  getFlagByCountryName: (name: string) => {
    const countryCodes = cache.get("country-codes");
    const countryCode = Object.keys(countryCodes).find(
      (key) => countryCodes[key] === name
    );
    return `https://flagcdn.com/w20/${countryCode}.jpg`;
  },
};
