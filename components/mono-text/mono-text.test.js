/* global it jest describe expect */
import "react-native";
import React from "react";
import MonoText from "./index";
import renderer from "react-test-renderer";
<<<<<<< HEAD

it("renders correctly", () => {
    const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

=======

it("renders correctly", () => {
    const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
>>>>>>> b3a5b2dbdda71d07e93f36f82bde97aebcd9b114
    expect(tree).toMatchSnapshot();
});
