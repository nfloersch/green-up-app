import "react-native";
import React from "react";
import MemberIcon from "./index";
import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer.create(<MemberIcon>Snapshot test!</MemberIcon>).toJSON();
    expect(tree).toMatchSnapshot();
});
