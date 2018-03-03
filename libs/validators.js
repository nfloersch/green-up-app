export function email(address) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(address);
}

export function isInTeam(teamMembers: Object, address: string) {
    const _email = address.toLowerCase().trim();
    return Object.values(teamMembers).map(teamMember => teamMember.email.toLowerCase().trim()).indexOf(_email) > -1;
}