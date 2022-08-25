# Rectangle overlap algorithm implementation

This code was translated from the separation strategy of this [repo](https://github.com/mwkling/rectangle-overlap) and this [blog blog post](https://mikekling.com/comparing-algorithms-for-dispersing-overlapping-rectangles/).

```javascript
// Rectangle instances
const rectangles = [
    new Rectangle(10, 20, 10, 20),
    new Rectangle(20, 20, 10, 20),
    new Rectangle(30, 20, 10, 20),
    new Rectangle(40, 20, 10, 20)
];

// Separator instance
const separator = new Separator(rectangles);

while (!Rectangle.has_overlap(separator.rectangles)) {
    // Each loop separates the rectangles until they're fully separated
    separator.step();
}

```