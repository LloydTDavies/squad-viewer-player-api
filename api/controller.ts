import properties from "../package.json";
import { Response, Request } from "express";
import { playerService } from "../services/player.service";

export const controller = {
  about: async ({}, res: Response) => {
    var aboutInfo = {
      name: properties.name,
      version: properties.version,
    };
    res.json(aboutInfo);
  },

  players: async (req: Request, res: Response) => {
    const searchString = req.query.name as string;

    const data = await playerService.getPlayerByName(searchString);

    console.log(data);
    if (data) {
      res.status(200).send(data);
    } else {
      res.status(404).send("Player not found");
    }
  },
};
