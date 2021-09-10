import axios from "axios";
import { Player } from "../../models/player.model";
import { playerService } from "../player.service";
import { flagService } from "../flags.service";

// TODO - Clean up order of tests and move mock data out of File

let MOCK_PLAYER_DATA = {
  data: {
    player: [
      {
        strPlayer: "Lloyd Davies",
        strTeam: "Cardiff City",
        strNationality: "Wales",
        strSport: "Soccer", // vomit!
      },
    ],
  },
};

const MOCK_RESPONSE: Promise<any> = new Promise((resolve, {}) => {
  resolve(MOCK_PLAYER_DATA);
});

describe("[Serivce] Player Service", () => {
  it("[Method] getPlayerByName", async () => {
    const mock = jest.spyOn(axios, "get").mockReturnValue(MOCK_RESPONSE);
    jest
      .spyOn(flagService, "getFlagByCountryName")
      .mockReturnValue("https://flagcdn.com/w20/gb-wls.jpg");
    const expectedResult: Player = {
      name: "Lloyd Davies",
      team: "Cardiff City",
      nationality: {
        name: "Wales",
        icon: "https://flagcdn.com/w20/gb-wls.jpg",
      },
    };

    const result = await playerService.getPlayerByName("Davies");

    expect(result[0]).toEqual(expectedResult);
    expect(mock).toHaveBeenCalled();
  });

  it("[Method getPlayerByName null data", async () => {
    const mockResponse = new Promise((resolve, {}) => {
      resolve({
        data: {
          player: null,
        },
      });
    });
    jest.spyOn(axios, "get").mockReturnValue(mockResponse);

    const result = await playerService.getPlayerByName("askdjal");

    expect(result).toBeNull();
  });

  it("[Method] getTeam", async () => {
    MOCK_PLAYER_DATA.data.player[0].strTeam = "_Free Agent Soccer";
    const mock = jest.spyOn(axios, "get").mockReturnValue(MOCK_RESPONSE);
    jest
      .spyOn(flagService, "getFlagByCountryName")
      .mockReturnValue("https://flagcdn.com/w20/gb-wls.jpg");
    const expectedResult: Player = {
      name: "Lloyd Davies",
      team: "Free Agent",
      nationality: {
        name: "Wales",
        icon: "https://flagcdn.com/w20/gb-wls.jpg",
      },
    };

    const result = await playerService.getPlayerByName("Davies");

    expect(result[0]).toEqual(expectedResult);
    expect(mock).toHaveBeenCalled();
  });

  it("[Method] sgetNationForFlagApi", async () => {
    const mockResponse = new Promise((resolve, {}) => {
      resolve({
        data: {
          player: [
            {
              strPlayer: "Lloyd Davies",
              strTeam: "Cardiff City",
              strNationality: "USA",
              strSport: "Soccer", // vomit!
            },
          ],
        },
      });
    });
    jest.spyOn(axios, "get").mockReturnValue(mockResponse);

    const result = await playerService.getPlayerByName("Davies");

    expect(result[0].nationality.name).toEqual("United States");
  });
});
