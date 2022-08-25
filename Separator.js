export default class Separator {
    /**
     * 
     * @param {Rectangle[]} rectangles 
     */
    constructor(rectangles) {
        this.rectangles = rectangles;
    }

    /**
     * 
     * @param {number} maxRight 
     */
    setMaxRight(maxRight) {
        this.maxRight = maxRight;
    }

    /**
     * 
     * @param {number} idx 
     * @returns {{x: number, y: number}}
     */
    translate_vector(idx) {
        const rect = this.rectangles[idx];

        return this.rectangles
            .filter((rectangle, index) => {
                return index !== idx && rect.overlap(rectangle);
            })
            .map(rectangle => rect.center_vector(rectangle))
            .reduce((previousRect, currentRect) => {
                const result = {
                    x: previousRect.x + currentRect.x,
                    y: previousRect.y + currentRect.y
                };

                if (result.x < 0) {
                    result.x = 0;
                }

                if (result.y < 0) {
                    result.y = 0;
                }

                return result;
            }, { x: 0, y: 0 });
    }

    /**
     * 
     * @param {{x: number, y: number}} pair 
     * @returns {{x: number, y: number}}
     */
    normalize(pair) {
        const mag = Math.sqrt(Math.pow(pair.x, 2) + Math.pow(pair.y, 2));

        if (mag == 0) {
            return pair;
        }

        return { x: pair.x / mag, y: pair.y / mag };
    }

    /**
     * 
     */
    step() {
        const vectors = this.rectangles
            .map((_rectangle, i) => this.normalize(this.translate_vector(i)));

        this.rectangles = this.rectangles
            .map((rectangle, i) => {
                rectangle.left += vectors[i].x;
                rectangle.top += vectors[i].y;
                return rectangle;
            });
    }
}