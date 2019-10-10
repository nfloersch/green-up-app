// @flow

import * as R from "ramda";

// Filters the teams by the user's membership status
export const getUsersTeams = R.curry(
    (user, teams) => R.compose(
        R.map(key => teams[key]),
        R.filter(key => Boolean(teams[key])),
        Object.keys
    )
);

