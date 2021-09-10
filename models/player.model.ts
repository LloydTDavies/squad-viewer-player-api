import { Nationality } from "./nationality.model";

export interface Player {
    name: string;
    team: string;
    nationality: Nationality;
}
