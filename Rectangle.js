export default class Rectangle {
    constructor(left, top, width, height) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;

        this.original_left = this.left;
        this.original_top
    }

    get right() {
        return this.left + this.width;
    }

    get bottom() {
        return this.top + this.height;
    }

    get midx() {
        return (this.left + this.right) / 2;
    }

    get midy() {
        return (this.top + this.bottom) / 2;
    }

    /**
     * @param {string} color
     */
    setColor(color) {
        this.color = color;
    }

    /**
     * Another data label is overlaping the current?
     * @param {Rectangle} other Another label
     * @returns boolean
     */
    overlap(other) {
        if (this.left > other.right || other.left > this.right) {
            return false;
        }

        if (this.top > other.bottom || other.top > this.bottom) {
            return false;
        }

        return true;
    }

    /**
     * Get the center of the vector
     * @param {Rectangle} other 
     * @returns {{x: number, y: number}}
     */
    center_vector(other) {
        return {
            x: this.midx - other.midx,
            y: this.midy - other.midy
        };
    }

    /**
     * 
     * @param {Rectangle[]} labels 
     * @returns {boolean}
     */
    static has_overlap(labels) {
        for (let index = 0; index < labels.length; index++) {
            const label = labels[index],
                nextLabel = labels[index + 1];

            if (typeof nextLabel === "undefined") {
                continue;
            }

            if (label.overlap(nextLabel)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.left, this.top, this.width, this.height);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {string} title 
     * @param {object} config
     */
    drawTitle(ctx, title, config = {}) {
        config = {
            font: "20px sans-serif",
            textAlign: "center",
            fillStyle: "black",
            ...config
        };

        ctx.textAlign = config.textAlign;
        ctx.font = config.font;
        ctx.fillStyle = config.fillStyle;
        ctx.fillText(title, this.left, this.top);
    }

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {string} subtitle 
     * @param {object} config 
     */
    drawSubtitle(ctx, subtitle, config = {}) {
        config = {
            font: "10px sans-serif",
            textAlign: "center",
            fillStyle: "black",
            paddingTop: 10,
            ...config
        };

        ctx.textAlign = config.textAlign;
        ctx.font = config.font;
        ctx.fillStyle = config.fillStyle;
        ctx.fillText(subtitle, this.left, this.top + config.paddingTop);
    }
}