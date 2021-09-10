import { Express } from "express";
import { controller } from "./controller";

export const routes = (app: Express) => {
  app.route("/api/v1/about").get(controller.about);
  app.route("/api/v1/players").get(controller.players);
};
