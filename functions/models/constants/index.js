/** Team members statuses **/
const REQUEST_TO_JOIN = 'REQUEST_TO_JOIN';
const ACCEPTED = 'ACCEPTED';
const NOT_INVITED = 'NOT_INVITED';
const INVITED = 'INVITED';
const OWNER = 'OWNER';


/** Message types **/
const INVITATION = 'INVITATION';
const TEAM_MESSAGE = 'TEAM_MESSAGE';
const GLOBAL_MESSAGE = 'GLOBAL_MESSAGE';
const TEAM_LEADER_MESSAGE = 'TEAM_LEADER_MESSAGE';
// const REQUEST_TO_JOIN = 'REQUEST_TO_JOIN'; // Already  defined above but need for both constant groups. TODO: rename this

module.exports.teamMemberStatuses = Object.freeze({ REQUEST_TO_JOIN, ACCEPTED, NOT_INVITED, INVITED, OWNER });
module.exports.messageTypes = Object.freeze({ INVITATION, TEAM_MESSAGE, GLOBAL_MESSAGE, TEAM_LEADER_MESSAGE, REQUEST_TO_JOIN });