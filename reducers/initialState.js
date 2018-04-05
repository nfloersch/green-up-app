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
        createUserError: null,
        user: null,
        isLoggingInViaSSO: false
    },
    profile: {},
    messages: {
        messages: {},
        loaded: false,
        invitationsLoaded: false,
        teamsLoaded: false
    },
    teamMembersLoaded: false,
    teams: {teams: {}, teamMembers: {}, contact: [], selectedTeam: null, locations: []},
    trashBagFinder: {townData: {}},
    trashTracker: {
        trashDrops: [],
        location: null,
        collectedTrashToggle: false,
        supplyPickupToggle: false,
        uncollectedTrashToggle: true,
        trashDropOffToggle: true,
        myTrashToggle: true
    },
    teamSearchResults: [],
    selectedTeam: null
};
