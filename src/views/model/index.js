class Range {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }
}

class Screen {
  constructor(el, {
    x, y, width, height, top, left, bottom, right,
  }, scale) {
    this.el = el;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
    this.area = {
      xRange: new Range(x, x + width),
      yRange: new Range(y, y + height),
    };
    this.scale = scale;
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  Screen,
};
