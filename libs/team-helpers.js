// @flow

import * as R from "ramda";
import Team from "../models/team";

type TeamHashType = { [key: string]: TeamType };

// Filters the teams by the user's membership status
// $FlowFixMe
export const getUsersTeams = (user: UserType, teams: TeamHashType): Array<TeamType> => R.compose(
    R.map((key: string): TeamType => Team.create({ ...user.teams[key], ...teams[key] })),
    R.filter((key: string): boolean => Boolean(teams[key])),
    Object.keys
)(user.teams);


