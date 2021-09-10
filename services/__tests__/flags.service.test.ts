import { flagService } from "../flags.service";
import axios from "axios";
import cache from "memory-cache";

describe("[Service] Flag Service tests", () => {
  let mock;
  let mockCountryCodes: Promise<any> = new Promise((resolve, reject) => {
    resolve({ ad: "Andorra" });
  });

  beforeEach(async () => {
    mock = jest.spyOn(axios, "get").mockReturnValue(mockCountryCodes);
    await flagService.loadCountryCodes();
  });

  afterEach(() => {
    mock.mockRestore();
  });

  it("[Method] Should load country codes", async () => {
    jest.spyOn(cache, "get").mockReturnValue(null);
    expect(mock).toHaveBeenCalled();
  });

  it("[Method] Should get flag url from country name", () => {
    jest.spyOn(cache, "get").mockReturnValue({
      ad: "Andorra",
    });
    const countryCode = "ad";

    const result = flagService.getFlagByCountryName("Andorra");
    
    expect(result).toEqual(`https://flagcdn.com/w20/${countryCode}.jpg`);
  });
});
