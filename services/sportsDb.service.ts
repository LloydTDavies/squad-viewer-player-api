import axios from "axios";
import { Nationality } from "../models/nationality.model";
import { Player } from "../models/player.model";
import { getFlagByCountryName } from "./flags.service";

export const getPlayerByName = async (name: string) => {
  const searchString = name.trim().replace(" ", "%20");
  const { data } = await axios.get(
    `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${searchString}`
  );

  if (!data.player) {
    return null;
  }
  return filterPlayerSearchResponse(data).map((player) =>
    mapPlayerResponse(player)
  );
};

const filterPlayerSearchResponse = (data) => {
  return data.player
    .filter((data) => data.strSport === "Soccer")
    .filter(
      (data) =>
        data.strTeam !== "_Retired Soccer" &&
        data.strTeam !== "_Deceased Soccer"
    );
};

const mapPlayerResponse = (player: any): Player => {
  return {
    name: player.strPlayer,
    team: getTeam(player.strTeam),
    nationality: mapNationality(player.strNationality),
  };
};

const getTeam = (team: string) => {
  switch (team) {
    case "_Free Agent Soccer":
      return "Free Agent";
    default:
      return team;
  }
};

const mapNationality = (nationality: string): Nationality => {
  const nation = getNationForFlagApi(nationality);
  return {
    name: nation,
    icon: getFlagByCountryName(nation),
  };
};

const getNationForFlagApi = (name: string) => {
  switch (name) {
    case "USA":
      return "United States";
    default:
      return name;
  }
};
