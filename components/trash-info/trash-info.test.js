import "react-native";
import React from "react";
import TrashInfo from "./index";
import renderer from "react-test-renderer";

it("renders correctly", () => {
    const tree = renderer.create(<TrashInfo/>).toJSON();
    expect(tree).toMatchSnapshot();
});
