// @flow

import * as R from "ramda";

const stringify = (thing: any) => {
    switch (typeof thing) {
        case "string":
            return thing;
        case "object" :
            return JSON.stringify(thing);
        default:
            return thing.toString();
    }
};

/**
 * scores a string or array of strings according to how many search terms it contains
 * @param {string} termsToSearchFor - what to search for
 * @param {string[]} stringsToSearchIn - things we search
 * @returns {number} the number of matches
 */
export function searchScore(termsToSearchFor: string, stringsToSearchIn: Array<string>): number {
    // break condition
    if (!Array.isArray(stringsToSearchIn) || stringsToSearchIn.length === 0 || typeof termsToSearchFor !== "string" || termsToSearchFor.length === 0) {
        return 0;
    }
    const searchedString = (stringify(stringsToSearchIn[0]) || "").toLowerCase(); // normalize string to search
    const terms = termsToSearchFor.trim().split(" ");
    const testTerm = (terms[0] || "").toLowerCase().trim(); // normalize what to search for
    // score 1 point for contains the search term and an extra point if it starts with the search term
    const score = (searchedString.indexOf(testTerm) > -1 ? 1 : 0) + (searchedString.startsWith(testTerm) ? 1 : 0);
    // Add scores from for the rest of terms on current string and scores from all terms on remaining strings
    return score + searchScore(terms.join(" "), stringsToSearchIn.slice(1)) + searchScore(terms.slice(1).join(" "), [searchedString]); // tail call
}


export function searchArray<T>(keys: Array<string>, searchableItems: Array<T>, searchTerms: string): Array<T> {

    const stringsToSearchIn = (_keys, item) => _keys
        .map(key => item[key])
        .filter((term: ?string): boolean => Boolean(term));

    const results = R.compose(
        R.map((scored: Object): Object => scored.item), // we only want items
        R.sort((scored1: Object, scored2: Object): number => (scored2.score - scored1.score)), // sort by score
        R.filter((scored: Object): boolean => (searchTerms.trim() === "" || scored.score > 0)), // filter out zero scores
        R.map((item: Object): Object => ({ // get the search score for each item
            item,
            score: searchScore(
                searchTerms,
                stringsToSearchIn(keys, item)
            )
        }))
    )(searchableItems);

    return results;
}


