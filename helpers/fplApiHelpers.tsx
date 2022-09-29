import { FplOverview, Team } from "../Models/FplOverview";

export const GetTeamDataFromOverviewWithFixtureTeamID = (
  teamNumber: number,
  overview: FplOverview
): Team => {
  return overview.teams.filter((team) => team.id == teamNumber)[0];
};
