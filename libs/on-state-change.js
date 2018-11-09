export default function onChangeState(stateKey) {
    return (value) => {
        const newState = {};
        newState[stateKey] = value;
        this.setState(newState);
    };
}