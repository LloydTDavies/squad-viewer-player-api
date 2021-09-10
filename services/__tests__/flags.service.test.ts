import { loadCountryCodes, getFlagByCountryName } from "../flags.service";
import axios from "axios";

describe("[Service] Flag Service tests", () => {
  let mock;
  let mockCountryCodes: Promise<any> = new Promise((resolve, reject) => {
    resolve({ ad: "Andorra" });
  });
  beforeEach(async () => {
    mock = jest.spyOn(axios, "get").mockReturnValue(mockCountryCodes);
    await loadCountryCodes();
  });

  afterEach(() => {
    mock.mockRestore();
  });

  it("[Method] Should load country codes", async () => {
    expect(mock).toHaveBeenCalled();
  });

  fit("[Method] Should get flag url from country name", () => {
    const countryCode ='ad';
    const result = getFlagByCountryName("Andorra");
    expect(result).toEqual(`https://flagcdn.com/w20/${countryCode}.jpg`)
  });
});
