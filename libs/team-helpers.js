// @flow

import * as R from "ramda";

type TeamHashType = { [key: string]: TeamType };

// Filters the teams by the user's membership status
export const getUsersTeams = R.curry(
    (user: UserType, teams: TeamHashType): TeamHashType => R.compose(
        R.map((key: string): TeamType => teams[key]),
        R.filter((key: string): boolean => Boolean(teams[key])),
        Object.keys
    )
);

