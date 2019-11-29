/* global it jest describe expect */
import "react-native";
import Celebration from "./celebration";

it("creates a model", () => {
    const data = Object.assign({}, { name: "foo" }, { updated: Date(), created: Date() });
    const foo = Celebration.create(data);
    expect(foo.name).toEqual("foo");
});
