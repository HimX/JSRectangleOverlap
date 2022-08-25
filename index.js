import Rectangle from "./Rectangle";
import Separator from "./Separator";

const rectangles = [
    new Rectangle(10, 20, 10, 20),
    new Rectangle(20, 20, 10, 20),
    new Rectangle(30, 20, 10, 20),
    new Rectangle(40, 20, 10, 20)
];

const separator = new Separator(rectangles);

for (i = 0; i < 150; ++i) {
    separator.step();
}
