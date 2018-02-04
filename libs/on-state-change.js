export default function onChangeState(stateKey) {
    return (value) => {
        let newState = {};
        newState[stateKey] = value;
        this.setState(newState);
    };
}