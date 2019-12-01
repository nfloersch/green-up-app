import "react-native";
import React from "react";
import DisplayText from "./index";
import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer.create(<DisplayText>Snapshot test!</DisplayText>).toJSON();
    expect(tree).toMatchSnapshot();
});
