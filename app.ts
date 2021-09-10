import express from "express";
import cors from "cors";

import { getPlayerByName } from "./services/sportsDb.service";
import { loadCountryCodes } from "./services/flags.service";

const app = express();
const port = 8080;

app.use(cors());

app.get("/api/v1/players", async (req, res) => {
  const searchString = req.query.name as string;

  const data = await getPlayerByName(searchString);
  
  console.log(data);
  if(data) {
    res.status(200).send(data);
  }
  else{
    res.status(404).send('Player not found');
  }
});

app.listen(port, async() => {
  console.log(`Application listening on port ${port}`);
  await loadCountryCodes();
});
