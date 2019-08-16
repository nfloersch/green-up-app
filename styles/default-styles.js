import { text } from "./text";
import { buttons } from "./buttons";
import { images } from "./images";
import { boxes } from "./boxes";
import { controls } from "./controls";

export const defaultStyles = {
    ...boxes,
    ...buttons,
    ...controls,
    ...images,
    ...text
};
