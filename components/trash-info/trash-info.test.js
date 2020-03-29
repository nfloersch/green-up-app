import "react-native";
import React from "react";
import TrashInfo from "./index";
import renderer from "react-test-renderer";
import { greenUpEndDate, greenUpStartDate } from "../../libs/green-up-day-calucators";

it("renders correctly", () => {
    const tree = renderer.create(<TrashInfo greenUpStartDate={greenUpStartDate} greenUpEndDate={greenUpEndDate} />).toJSON();
    expect(tree).toMatchSnapshot();
});
