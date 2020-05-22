import { firebaseConfig } from "../firebase-config.js";

export const getReleaseEnvironment = (str) => {
    switch(firebaseConfig.projectId){
        case 'greenupvermont-qa': return 'QA';
        case 'greenupvermont-dev': return 'Dev';
        case 'greenupvermont-de02b': return 'Prod';
        default: return 'unknown';
    }
}