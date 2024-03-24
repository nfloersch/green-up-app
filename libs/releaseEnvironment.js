export const getReleaseEnvironment = (projectId) => {
    switch(projectId){
        case 'greenupvermont-qa': return 'QA';
        case 'greenupvermont-dev': return 'Dev';
        case 'greenupvermont-de02b': return 'Prod';
        default: return 'unknown';
    }
}