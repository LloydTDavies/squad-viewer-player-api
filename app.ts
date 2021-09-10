import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { flagService } from "./services/flags.service";
import { routes } from "./api/routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

dotenv.config();
app.use(cors());
routes(app);

app.listen(port, async () => {
  console.log(`Application listening on port ${port}`);
  await flagService.loadCountryCodes();
});
