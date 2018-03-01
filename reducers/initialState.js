export default {
    about: {},
    loading: {
        isLoadingComplete: false,
        initialAuthChecked: false,
        loadingError: null,
        skipLoadingScreen: false
    },
    login: {
        userIsLoggedIn: false,
        initialAuthChecked: false,
        creatingUser: false,
        user: null
    },
    profile: {},
    messages: {
        messages: {},
        loaded: false,
        teamsLoaded: false
    },
    teams: {teams: [], teamMembers: {}, contact: [], selectedTeam: null, locations: []},
    trashBagFinder: {supplyLocations: {}},
    trashTracker: [],
    teamSearchResults: [],
    selectedTeam: null
};
