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
        invitationsLoaded : false,
        teamsLoaded: false
    },
    teams: {teams: [], teamMembers: {}, contact: [], selectedTeam: null, locations: []},
    trashBagFinder: {townData: {}},
    trashTracker: {trashDrops: [], location: null},
    teamSearchResults: [],
    selectedTeam: null
};
